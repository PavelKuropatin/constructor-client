import openDiagramTemplate from '../home/components/dialogs/open-diagram/open-diagram.html';
import startCountTemplate from './components/dialogs/start-count/start-count.html';

export default function customHomeController ($scope, $state, $mdDialog, $translate, $timeout, stateObjectHttpService, customJsPlumbStyleService,
  stateObjectService, CONSTANTS, ROUTES, fileReader, socketService, socketHttpService, imageHttpService) {
  'ngInject';
  const vm = this;
  $scope.CONSTANTS = CONSTANTS;

  vm.zoomlevel = 64;
  vm.activeState = null;
  vm.targetEndpointStyle1 = customJsPlumbStyleService.getTargetEndpointStyle1();
  vm.targetEndpointStyle2 = customJsPlumbStyleService.getTargetEndpointStyle2();

  vm.sourceEndpointStyle1 = customJsPlumbStyleService.getSourceEndpointStyle1();
  vm.sourceEndpointStyle2 = customJsPlumbStyleService.getSourceEndpointStyle2();

  vm.countFunction = stateObjectService.countFunction;
  vm.originStates = null;
  vm.modelSettings = {};
  vm.isActiveSetting = false;
  vm.sortableOptions = {
    connectWith: '.connectedItems'
  };
  vm.movedStates = { states: [] };
  $scope.backgroundImg = { 'name': '' };
  vm.imageToUpload = null;

  $scope.$on(CONSTANTS.EVENT_CONSTANTS.SUCCESS_DIAGRAM_DELETE, () => {
    vm.diagram = undefined;
  });

  vm.goToSchema = () => $state.go(ROUTES.SCHEMA);

  vm.refresh = () => {
    vm.movedStates.states = vm.movedStates.states.splice(0, vm.movedStates.states.length);
    $scope.$apply();
  };

  vm.setActiveState = (state) => vm.activeState = state;

  vm.inverseConnectionVisibility = (connection) => connection.isVisible = !connection.isVisible;

  vm.isActiveState = (state) => vm.activeState === state;

  function resetStates (diagram) {
    _.forEach(diagram.states, state => {
      state.template = 'custom_' + state.template;
      state.x = 10;
      state.y = 10;
    });
  }

  vm.refreshStates = () => {

    let bufStateObjects = vm.movedStates.states.slice();
    vm.movedStates.states = [];
    $timeout(() => {
      vm.movedStates.states = bufStateObjects;
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
          $('custom-js-plumb-canvas')
            .css({
              minWidth: img.width + 'px',
              minHeight: img.height + 'px',
              'background-image': 'url(' + result + ')'
            });
        };
      });
  };

  vm.openDiagram = () => {
    $mdDialog.show({
      controller: 'openDiagramController as vm',
      template: openDiagramTemplate,
      clickOutsideToClose: true
    }).then((uuid) => {
      jsPlumb.ready(() => {
        stateObjectHttpService.getDiagram(uuid).then((response) => {
          vm.movedStates = { states: [] };
          vm.diagram = response.data;
          resetStates(vm.diagram);
          vm.originStates = JSON.parse(JSON.stringify(vm.diagram));
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
        break;
      case CONSTANTS.MODEL.SOCKET:
        socketHttpService.stopMonitor(vm.cmdUUID);
        break;
    }
  };

  vm.openModelSettings = () => {
    if (!vm.diagram) {
      return;
    }
    $mdDialog.show({
      locals: { modelSettings: vm.modelSettings },
      controller: 'startCountController as vm',
      template: startCountTemplate,
      clickOutsideToClose: true
    }).then((modelSettings) => {
      vm.modelSettings = modelSettings;

      resetModelingStates();

      switch (vm.modelSettings.type) {
        case CONSTANTS.MODEL.GENERATOR:
          startCounter();
          break;
        case CONSTANTS.MODEL.SOCKET:
          socketService.initSocket(console.log);
          socketHttpService.startGetState(vm.modelSettings).then((response) => {
            vm.cmdUUID = response.data.uuid;
          });
          break;
      }
    });
  };

  const resetModelingStates = () => {
    _.forEach(vm.movedStates.states, state => {
      const oState = _.find(vm.originStates.states, o => o.uuid === state.uuid);
      state.inputContainer = oState.inputContainer;
      state.outputContainer = oState.outputContainer;
      state.backgroundImg = null;
    });
    _.forEach(vm.modelSettings.vars, _var => {
      _var.tmpValue = _var.startValue;
    });
  };

  const startCounter = () => {
    if (!vm.timer) {
      updateCounter();
    }
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
    const states = vm.movedStates.states;
    for (let i = 0; i < states.length; i++) {
      _.forEach(states[i].inputContainer, item => {
        let values = vm.modelSettings.vars.find(_var => _var.valueName === item.label);
        if (values) {
          item.value = values.tmpValue;
        }
      });
      stateObjectService.countFunction(vm.movedStates.states, states[i]);
      let action = defineAction(states[i]);
      if (action) {
        switch (action.type) {
          case 'stop_exec':
            console.log('stop exec');
            vm.stopCount();
            return false;
          case  'set_image' :
            console.log(action.value);
            break;
          case 'none':
            console.log('none');
            break;
        }
      }
    }
    return true;
  };

  const defineAction = (state) => {
    const container = state.inputContainer.concat(state.outputContainer);

    return _.find(state.settings.actions, action => {
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
    _.forEach(vm.movedStates.states, state => {
      if (state.name in out) {
        state.outputContainer = [{ 'label': 'x', 'value': out[state.name] }];
      }
    });
  });

  vm.uploadImage = () => {
    console.log(vm.imageToUpload);
//    imageHttpService.uploadImage(vm.imageToUpload).then((response) => {
//        console.log(response.data);
//    });
    imageHttpService.getImages().then((response) => {
      console.log(response.data);
    });
  };
}
