export default function homeController($scope, stateObjectHttpService, env) {
  'ngInject';
  const vm = this;
  vm.zoomlevel = 64;
  vm.pos_x = 214;
  vm.pos_y = 148;
  vm.activeState = null;
  vm.stateObjects = [];

  vm.targetEndpointStyle = {
    endpoint: "Dot",
    paintStyle: {fill: "#7AB02C", radius: 11},
    maxConnections: -1,
    isTarget: true
  };

  vm.sourceEndpointStyle = {
    endpoint: "Dot",
    paintStyle: {
      stroke: "#7AB02C",
      fill: "transparent",
      strokeWidth: 3
    },
    isSource: true,
    maxConnections: -1,
    connector: ["Flowchart", {stub: [30, 30], gap: 20, cornerRadius: 10, alwaysRespectStubs: true}],
    connectorStyle: {
      strokeWidth: 4,
      stroke: "#61B7CF"
    },
    connectorHoverStyle: {
      stroke: "#216477"
    }
  };

  vm.setActiveState = function (state) {
    vm.activeState = state;
  };

  vm.onConnection = function (instance, connection, targetUUID, sourceUUID) {
    angular.forEach(vm.stateObjects, function (state) {
      angular.forEach(state.sources, function (source) {
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