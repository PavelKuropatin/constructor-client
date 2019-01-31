import openDiagramTemplate from './components/dialogs/open_diagram/open-diagram.html';

export default function homeController($scope, $mdDialog, stateObjectHttpService, jsPlumbStyleService) {
  'ngInject';
  const vm = this;
  vm.zoomlevel = 64;
  vm.activeState = null;
  vm.targetEndpointStyle = jsPlumbStyleService.getTargetEndpointStyle();
  vm.sourceEndpointStyle = jsPlumbStyleService.getSourceEndpointStyle();
  vm.isActiveSetting = false;
  vm.diagramInfo = {
    name: 'undefined',
    description: 'undefined',
    modules: []
  };

  vm.setActiveState = (state) => {
    vm.activeState = state;
  };

  vm.onConnection = (instance, connection, targetUUID, sourceUUID) => {
    angular.forEach(vm.diagramInfo.modules, (state) => {
      angular.forEach(state.sources, (source) => {
        if (source.uuid == sourceUUID) {
          if (typeof source.connections === 'undefined') source.connections = [];
          source.connections.push({'uuid': targetUUID});
          $scope.$apply();
        }
      });
    });
  };

  vm.saveStateObjects = () => {
    stateObjectHttpService.saveDiagram(vm.diagramInfo);
  };

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
