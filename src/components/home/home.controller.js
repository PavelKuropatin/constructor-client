import openSchemaTemplate from './components/dialogs/open-schema/open-schema.html';

export default function homeController ($scope, $state, $mdDialog, $translate, blockObjectHttpService, jsPlumbStyleService,
  blockObjectService, CONSTANTS, ROUTES) {
  'ngInject';
  $scope.CONSTANTS = CONSTANTS;
  const vm = this;
  vm.zoomlevel = 64;
  vm.activeBlock = null;

  vm.outputEndpointStyle1 = jsPlumbStyleService.getOutputEndpointStyle1();
  vm.outputEndpointStyle2 = jsPlumbStyleService.getOutputEndpointStyle2();

  vm.inputEndpointStyle1 = jsPlumbStyleService.getInputEndpointStyle1();
  vm.inputEndpointStyle2 = jsPlumbStyleService.getInputEndpointStyle2();

  vm.countFunction = blockObjectService.countFunction;
  vm.isActiveSetting = false;
  vm.settingsBlock = null;

  $scope.$on(CONSTANTS.EVENT_CONSTANTS.SUCCESS_SCHEMA_DELETE, () => {
    vm.schema = undefined;
  });

  vm.goToModel = () => {
    $state.go(ROUTES.MODEL);
  };

  vm.setActiveBlock = (block) => {
    vm.activeBlock = block;
  };

  vm.onConnection = (instance, connection, outputUuid, inputUuid) => {
    let outputBlock = blockObjectService.findOutputBlock(vm.schema.blocks, outputUuid);
    let output = _.filter(outputBlock.outputs, (o) => o.uuid = outputUuid)[0];

    // _.forEach(vm.schema.blocks, block => {
    let inputBlock = blockObjectService.findInputBlock(vm.schema.blocks, inputUuid);
    let input = _.filter(inputBlock.inputs, (i) => i.uuid = inputUuid)[0];
    // console.log(inputBlock);
    // if (inputBlock) {
      input.connections.push({ uuid: outputUuid, isVisible: true });
      blockObjectService.updateContainer(vm.schema.blocks, inputBlock, outputBlock);
      vm.updateSchema();
      $scope.$apply();
    // }
    // });
  };

  vm.updateSchema = () => {
    blockObjectHttpService.updateSchema(vm.schema).then(response => {
      vm.schema = response.data;
    });
  };

  vm.createNewSchema = () => {
    blockObjectHttpService.createNewSchema().then(response => {
      vm.schema = response.data;
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
          vm.schema = response.data;
          console.log(vm.schema);
        });
      });
    });
  };

  vm.setLanguage = (lang) => {
    $translate.use(lang);
  };
}
