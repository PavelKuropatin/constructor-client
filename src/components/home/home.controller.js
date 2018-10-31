export default function homeController($scope, stateObjectHttpService) {
  'ngInject';
  const vm = this;
  vm.zoomlevel = 64;
  vm.pos_x = 214;
  vm.pos_y = 148;
  vm.activeState = null;

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

  jsPlumb.ready(() => {
    console.log(stateObjectHttpService.getAllStateObject());
    vm.stateObjects = [
      {
        "name": "New State",
        "template": "default",
        "sources": [
          {
            "uuid": 2001
          },
          {
            "uuid": 2002,
            "connections": [
              {
                "uuid": "2007"
              }
            ]
          }
        ],
        "targets": [
          {
            "uuid": 2003
          },
          {
            "uuid": 2004
          }
        ],
        "x": 415,
        "y": 752.625
      },
      {
        "name": "New State",
        "template": "default",
        "sources": [
          {
            "uuid": 2005
          },
          {
            "uuid": 2006
          }
        ],
        "targets": [
          {
            "uuid": 2007
          },
          {
            "uuid": 2008
          }
        ],
        "x": 447.5,
        "y": 350.625
      }
    ];
  });
}
