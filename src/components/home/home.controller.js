export default function homeController($scope, $http) {
  'ngInject';
  const vm = this;
  vm.zoomlevel = 64;
  vm.pos_x = 214;
  vm.pos_y = 148;
  vm.stateObjects = [];

  vm.targetEndpointStyle = {
    endpoint: "Dot",
    paintStyle: {fillStyle: "#7AB02C", radius: 11},
    maxConnections: -1,
    isTarget: true
  };

  vm.sourceEndpointStyle = {
    endpoint: "Dot",
    paintStyle: {
      strokeStyle: "#7AB02C",
      fillStyle: "transparent",
      radius: 7,
      lineWidth: 3
    },
    isSource: true,
    maxConnections: -1,
    connector: ["Flowchart", {stub: [30, 30], gap: 20, cornerRadius: 10, alwaysRespectStubs: true}],
    connectorPaintStyle: {
      lineWidth: 4,
      strokeStyle: "#61B7CF",
      joinStyle: "round",
      outlineColor: "white",
      outlineWidth: 2
    },
    connectorHoverPaintStyle: {
      fillStyle: "#216477",
      strokeStyle: "#216477"
    }
  };

  vm.removeIndex = function (index, object) {
    object.splice(index, 1);
  };

  vm.removeState = function (state) {
    var index = vm.stateObjects.indexOf(state);
    if (index !== -1) {
      vm.stateObjects.splice(index, 1);
    }
  };


  vm.stateObjects = [
    {
      "name": "New State",
      "template": "default",
      "sources": [
        {
          "uuid": 2001
        },
        {
          "uuid": 2002
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
      "x": 526.625,
      "y": 462.5625
    },
    {
      "name": "New State",
      "template": "default",
      "sources": [
        {
          "uuid": 2005
        },
        {
          "uuid": 2006,
          "connections": [
            {
              "uuid": "2003"
            }
          ]
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
      "x": 544.9354838709678,
      "y": 761
    }
  ];

  // if (typeof $localStorage.stateObjects !== 'undefined') {
  //   $scope.stateObjects = $localStorage.stateObjects;
  // } else {
  //   $http({method: 'GET', url: 'data.json'}).then(function (data, status, headers, config) {
      // when the response is available
    // });
  // }

  // $scope.$watch('stateObjects', function (newVal, oldVal) {
  //   $localStorage.stateObjects = $scope.stateObjects;
  // }, true);


  // if (typeof $localStorage.lastUUID === 'undefined') {
  vm.lastUUID = 2000;
  // }
  var getNextUUID = function () {
    vm.lastUUID++;
    return vm.lastUUID;
  };
  vm.newState = function () {
    console.log(vm.stateObjects);
    vm.stateObjects.push({
      'name': 'New State',
      'template': 'default',
      'sources': [
        {uuid: getNextUUID()},
        {uuid: getNextUUID()},
      ],
      'targets': [
        {uuid: getNextUUID()},
        {uuid: getNextUUID()}
      ],
      'x': 10,
      'y': 10
    });
  };

  vm.activeState = null;

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

}
