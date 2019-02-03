import openDiagramTemplate from './components/dialogs/open_diagram/open-diagram.html';

export default function homeController($scope, $mdDialog, stateObjectHttpService, jsPlumbStyleService) {
  'ngInject';
  const vm = this;
  vm.zoomlevel = 64;
  vm.activeState = null;
  vm.targetEndpointStyle = jsPlumbStyleService.getTargetEndpointStyle();
  vm.sourceEndpointStyle = jsPlumbStyleService.getSourceEndpointStyle();
  vm.isActiveSetting = false;

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
