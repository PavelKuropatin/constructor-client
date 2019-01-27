export default function homeController($scope, $mdDialog, stateObjectHttpService, jsPlumbStyleService) {
  'ngInject';
  const vm = this;
  vm.zoomlevel = 64;
  vm.activeState = null;
  vm.stateObjects = [];
  vm.targetEndpointStyle = jsPlumbStyleService.getTargetEndpointStyle();
  vm.sourceEndpointStyle = jsPlumbStyleService.getSourceEndpointStyle();
  vm.isActiveSetting = false;

  vm.setActiveState = (state) => {
    vm.activeState = state;
  };

  vm.onConnection = (instance, connection, targetUUID, sourceUUID) => {
    angular.forEach(vm.stateObjects, (state) => {
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
    stateObjectHttpService.saveAllStateObject(vm.stateObjects);
  };

  vm.loadStateObjects = () => {
    jsPlumb.ready(() => {
      vm.stateObjects = stateObjectHttpService.getAllStateObject();
    });
  };

  vm.openDiagram = function (ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'tabDialog.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
    }).then(function (answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function () {
        $scope.status = 'You cancelled the dialog.';
      });
  };
}
