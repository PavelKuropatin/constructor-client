import openSchemaTemplate from '../home/components/dialogs/open-schema/open-schema.html';
import startCountTemplate from './components/dialogs/start-count/start-count.html';

export default function modelingController ($scope, $interval, $state, $mdDialog, $translate, $timeout, blockObjectHttpService, customJsPlumbStyleService,
  blockObjectService, CONSTANTS, ROUTES, fileReader, socketService, socketHttpService, imageHttpService) {
  'ngInject';
  const vm = this;
  $scope.CONSTANTS = CONSTANTS;

  vm.zoomlevel = 64;
  vm.activeBlock = null;
  vm.outputEndpointStyle1 = customJsPlumbStyleService.getOutputEndpointStyle1();
  vm.outputEndpointStyle2 = customJsPlumbStyleService.getOutputEndpointStyle2();

  vm.inputEndpointStyle1 = customJsPlumbStyleService.getInputEndpointStyle1();
  vm.inputEndpointStyle2 = customJsPlumbStyleService.getInputEndpointStyle2();

  vm.countFunction = blockObjectService.countFunction;
  vm.originBlocks = null;
  vm.modelSettings = {};
  vm.isActiveSetting = false;
  vm.sortableOptions = {
    connectWith: '.connectedItems'
  };
  vm.movedBlocks = { blocks: [] };
  $scope.backgroundImg = { 'name': '' };
  vm.imageToUpload = null;

  $scope.$on(CONSTANTS.EVENT_CONSTANTS.SUCCESS_SCHEMA_DELETE, () => {
    vm.schema = undefined;
  });

  vm.goToSchema = () => $state.go(ROUTES.SCHEMA);

  vm.refresh = () => {
    vm.movedBlocks.blocks = vm.movedBlocks.blocks.splice(0, vm.movedBlocks.blocks.length);
    $scope.$apply();
  };

  vm.setActiveBlock = (block) => vm.activeBlock = block;

  vm.inverseConnectionVisibility = (connection) => connection.isVisible = !connection.isVisible;

  vm.isActiveBlock = (block) => vm.activeBlock === block;

  function resetBlocks (schema) {
    _.forEach(schema.blocks, block => {
      block.template = 'custom_' + block.template;
      // block.x = 10;
      // block.y = 10;
    });
  }

  vm.refreshBlocks = () => {

    let bufBlockObjects = vm.movedBlocks.blocks.slice();
    vm.movedBlocks.blocks = [];
    $timeout(() => {
      vm.movedBlocks.blocks = bufBlockObjects;
    });
  };

  vm.loadCanvasBackground = () => $('input[type="file"]').click();

  $scope.getFile = (file) => {
    vm.imageToUpload = file;
    fileReader.readAsDataUrl(file, $scope)
      .then(function (result) {
        var img = new Image();
        img.src = result;
        img.onload = function () {
          $('modeling-js-plumb-canvas')
            .css({
              minWidth: img.width + 'px',
              minHeight: img.height + 'px',
              'background-image': 'url(' + result + ')'
            });
        };
      });
  };

  vm.openSchema = () => {
    $mdDialog.show({
      controller: 'openSchemaController as vm',
      template: openSchemaTemplate,
      clickOutsideToClose: true
    }).then((uuid) => {
      jsPlumb.ready(() => {
        blockObjectHttpService.getSchema(uuid).then((response) => {
          vm.movedBlocks = { blocks: [] };
          vm.schema = response.data;
          resetBlocks(vm.schema);
          vm.originBlocks = JSON.parse(JSON.stringify(vm.schema));
        });
      });
    });
  };

  vm.setLanguage = (lang) => {
    $translate.use(lang);
  };

  vm.stopCount = () => {
    switch (vm.modelSettings.type) {
      case CONSTANTS.MODEL.GENERATOR:
        $timeout.cancel(vm.timer);
        vm.timer = null;
        if (vm.history) {
          $interval.cancel(vm.history);
          vm.history = null;
        }
        break;
      case CONSTANTS.MODEL.SOCKET:
        socketHttpService.stopMonitor(vm.cmdUUID);
        break;
    }
  };

  vm.openModelSettings = () => {
    if (!vm.schema) {
      return;
    }
    $mdDialog.show({
      locals: { modelSettings: vm.modelSettings },
      controller: 'startCountController as vm',
      template: startCountTemplate,
      clickOutsideToClose: true
    }).then((modelSettings) => {
      vm.modelSettings = modelSettings;

      resetModelingBlocks();

      switch (vm.modelSettings.type) {
        case CONSTANTS.MODEL.GENERATOR:
          startCounter();
          break;
        case CONSTANTS.MODEL.SOCKET:
          socketService.initSocket(console.log);
          socketHttpService.startGetBlock(vm.modelSettings).then((response) => {
            vm.cmdUUID = response.data.uuid;
          });
          break;
      }
    });
  };

  const resetModelingBlocks = () => {
    _.forEach(vm.movedBlocks.blocks, block => {
      const oBlock = _.find(vm.originBlocks.blocks, o => o.uuid === block.uuid);
      block.inputVars = oBlock.inputVars;
      block.outputVars = oBlock.outputVars;
      block.backgroundImg = null;
    });
    _.forEach(vm.modelSettings.vars, _var => {
      _var.tmpValue = _var.startValue;
    });
  };

  const startCounter = () => {
    console.log(vm.modelSettings);
    if (typeof vm.modelSettings.history_interval !== 'undefined') {
      const history_interval = +vm.modelSettings.history_interval;
      vm.history = $interval(saveHistory, history_interval);
    }
    if (!vm.timer) {
      updateCounter();
    }
  };

  const saveHistory = () => {
    let schema = {};
    angular.copy(vm.schema, schema);
    schema.blocks.push(vm.movedBlocks.blocks);
    blockObjectHttpService.saveHistory(schema).then(response => {
      console.log(response.data);
    });
  };

  const updateCounter = () => {
    _.forEach(vm.modelSettings.vars, _var => {
      _var.tmpValue = +_var.tmpValue + +_var.stepValue;
    });
    const run = changeParam();
    if (run) {
      vm.timer = $timeout(updateCounter, vm.modelSettings.interval);
    }
  };

  const changeParam = () => {
    const blocks = vm.movedBlocks.blocks;
    for (let i = 0; i < blocks.length; i++) {
      _.forEach(blocks[i].inputVars, item => {
        let values = vm.modelSettings.vars.find(_var => _var.valueName === item.label);
        if (values) {
          item.value = values.tmpValue;
        }
      });
      blockObjectService.countFunction(vm.movedBlocks.blocks, blocks[i]);
      let action = defineAction(blocks[i]);
      if (action) {
        console.log(action.number);
        switch (action.type) {
          case 'stop_exec':
            console.log('stop exec');
            vm.stopCount();
            return false;
          case  'set_image' :
            const img = new Image();
            img.src = action.value;
            img.onload = function () {
              $('[uuid=\'' + blocks[i].uuid + '\']')
                .css({
                  maxWidth: img.width + 'px',
                  maxHeight: img.height + 'px',
                  minWidth: img.width + 'px',
                  minHeight: img.height + 'px',
                  'background-image': 'url(' + action.value + ')'
                });
            };
            break;
          case 'none':
            console.log('none');
            break;
        }
      }
    }
    return true;
  };

  const defineAction = (block) => {
    const container = block.inputVars.concat(block.outputVars);

    return _.find(block.settings.actions, action => {
      let expr = action.condition;
      _.forEach(container, item => {
        expr = _.replace(expr, new RegExp(item.label, 'g'), item.value);
      });
      let value;
      try {
        value = eval(expr);
      } catch (ex) {
        value = false;
      }
      return value;
    });
  };

  socketService.receive().then(null, null, (message) => {
    let out = JSON.parse(message);
    _.forEach(vm.movedBlocks.blocks, block => {
      if (block.name in out) {
        block.outputVars = [{ 'label': 'x', 'value': out[block.name] }];
      }
    });
  });

  vm.uploadImage = () => {
    console.log(vm.imageToUpload);
    imageHttpService.getImages().then((response) => {
      console.log(response.data);
    });
  };
}
