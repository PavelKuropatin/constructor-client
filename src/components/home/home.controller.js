export default function homeController($scope, stateObjectHttpService, jsPlumbStyleService) {
  'ngInject';
  const vm = this;
  vm.zoomlevel = 64;
  vm.pos_x = 214;
  vm.pos_y = 148;
  vm.activeState = null;
  vm.stateObjects = [];
  vm.targetEndpointStyle = jsPlumbStyleService.getTargetEndpointStyle();
  vm.sourceEndpointStyle = jsPlumbStyleService.getSourceEndpointStyle();

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
}
