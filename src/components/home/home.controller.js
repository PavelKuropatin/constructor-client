import openDiagramTemplate from "./components/dialogs/open-diagram/open-diagram.html";

export default function homeController($scope, $state, $mdDialog, stateObjectHttpService, jsPlumbStyleService,
                                       stateObjectService, CONSTANTS, ROUTES) {
  'ngInject';
  const vm = this;
  vm.zoomlevel = 64;
  vm.activeState = null;
  vm.targetEndpointStyle = jsPlumbStyleService.getTargetEndpointStyle();
  vm.sourceEndpointStyle = jsPlumbStyleService.getSourceEndpointStyle();
  vm.countFunction = stateObjectService.countFunction;
  vm.isActiveSetting = false;

  $scope.$on(CONSTANTS.EVENT_CONSTANTS.SUCCESS_DIAGRAM_DELETE, () => {
    vm.diagramInfo = undefined;
  });

  vm.goToModel = ()  => {
    $state.go(ROUTES.MODEL);
  };

  vm.setActiveState = (state) => {
    console.log(state);
    vm.activeState = state;
  };

  vm.onConnection = (instance, connection, targetUUID, sourceUUID) => {
    _.forEach(vm.diagramInfo.modules, state => {
      _.forEach(state.sources, source => {
        if (source.uuid == sourceUUID) {
          source.connections.push({'uuid': targetUUID});
          $scope.$apply();
        }
      });
    });
    stateObjectService.updateContainer(vm.diagramInfo.modules, sourceUUID, targetUUID);
  };

  vm.updateDiagram = () => {
    stateObjectHttpService.updateDiagram(vm.diagramInfo).then(response => {
      vm.diagramInfo = response.data;
    });
  };

  vm.createNewDiagram = () => {
    stateObjectHttpService.createNewDiagram().then(response => {
      vm.diagramInfo = response.data;
    });
  };

  jsPlumb.ready(() => {
    stateObjectHttpService.getAllStateObject({uuid: '712941e9-7525-4d8a-a7b7-49a35df7a790'}).then((response) => {
      vm.diagramInfo = response.data;
    });
  });

  vm.openDiagram = function () {
    $mdDialog.show({
      controller: 'openDiagramController as vm',
      template: openDiagramTemplate,
      clickOutsideToClose: true,
    }).then(function (diagram) {
      jsPlumb.ready(() => {
        stateObjectHttpService.getAllStateObject(diagram).then((response) => {
          vm.diagramInfo = response.data;
        });
      });
    });
  };
}
