export default function homeController($scope, $http) {
  'ngInject';
  const vm = this;
  // vm.zoomlevel = 64;
  vm.pos_x = 214;
  vm.pos_y = 148;

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
    connectorStyle: {
      lineWidth: 4,
      strokeStyle: "#61B7CF",
      joinstyle: "round",
      outlineColor: "white",
      outlineWidth: 2
    },
    connectorHoverStyle: {
      fillStyle: "#216477",
      strokeStyle: "#216477"
    }
  };
  //
  // vm.removeIndex = function (index, object) {
  //   object.splice(index, 1);
  // };
  //
  // vm.removeState = function (state) {
  //   var index = $scope.stateObjects.indexOf(state);
  //   if (index !== -1) {
  //     $scope.stateObjects.splice(index, 1);
  //   }
  // };
  //
  // // vm.stateObjects = [];
  //
  // // if (typeof $localStorage.stateObjects !== 'undefined') {
  // //   $scope.stateObjects = $localStorage.stateObjects;
  // // } else {
  // //   $http({method: 'GET', url: 'data.json'}).then(function (data, status, headers, config) {
  // vm.stateObjects = [
  //       {
  //         "name": "Agent Accepts Invite",
  //         "template": "default",
  //         "sources": [
  //           {
  //             "uuid": 1,
  //             "connections": [
  //               {
  //                 "uuid": "103",
  //                 "mouseover": false,
  //                 "type": "Transition"
  //               }
  //             ]
  //           }
  //         ],
  //         "targets": [
  //           {
  //             "uuid": 2
  //           }
  //         ],
  //         "x": 435.9999656677246,
  //         "y": 530.0156116485596
  //       },
  //       {
  //         "name": "Lender Invites Agent",
  //         "template": "default",
  //         "sources": [
  //           {
  //             "uuid": 3,
  //             "connections": [
  //               {
  //                 "uuid": "6",
  //                 "mouseover": false,
  //                 "type": "Transition"
  //               },
  //               {
  //                 "uuid": "2",
  //                 "mouseover": false,
  //                 "type": "Transition"
  //               }
  //             ]
  //           }
  //         ],
  //         "targets": [
  //           {
  //             "uuid": 4
  //           }
  //         ],
  //         "x": -134.05558268229169,
  //         "y": 71.20312584771051
  //       },
  //       {
  //         "name": "Day 0",
  //         "template": "default",
  //         "sources": [
  //           {
  //             "uuid": 5,
  //             "connections": [
  //               {
  //                 "uuid": "8",
  //                 "mouseover": false,
  //                 "type": "Transition"
  //               },
  //               {
  //                 "uuid": "2",
  //                 "mouseover": false,
  //                 "type": "Transition"
  //               }
  //             ]
  //           }
  //         ],
  //         "targets": [
  //           {
  //             "uuid": 6
  //           }
  //         ],
  //         "x": 311.5217125934103,
  //         "y": -84.98437300972316
  //       },
  //       {
  //         "name": "Day2",
  //         "template": "default",
  //         "sources": [
  //           {
  //             "uuid": 7,
  //             "connections": [
  //               {
  //                 "uuid": "10",
  //                 "mouseover": false,
  //                 "type": "Transition"
  //               },
  //               {
  //                 "uuid": "2",
  //                 "mouseover": false,
  //                 "type": "Transition"
  //               }
  //             ]
  //           }
  //         ],
  //         "targets": [
  //           {
  //             "uuid": 8
  //           }
  //         ],
  //         "x": 703.8906097412109,
  //         "y": -22.5156307220459
  //       },
  //       {
  //         "name": "Day 4",
  //         "template": "default",
  //         "sources": [
  //           {
  //             "uuid": 9,
  //             "connections": [
  //               {
  //                 "uuid": "12",
  //                 "mouseover": false,
  //                 "type": "Transition"
  //               },
  //               {
  //                 "uuid": "2",
  //                 "mouseover": false,
  //                 "type": "Transition"
  //               }
  //             ]
  //           }
  //         ],
  //         "targets": [
  //           {
  //             "uuid": 10
  //           }
  //         ],
  //         "x": 1128.7595002547555,
  //         "y": 39.96873938519022
  //       },
  //       {
  //         "name": "Day 6",
  //         "template": "default",
  //         "sources": [
  //           {
  //             "uuid": 11,
  //             "connections": [
  //               {
  //                 "uuid": "14",
  //                 "mouseover": false,
  //                 "type": "Transition"
  //               },
  //               {
  //                 "uuid": "2",
  //                 "mouseover": false,
  //                 "type": "Transition"
  //               }
  //             ]
  //           }
  //         ],
  //         "targets": [
  //           {
  //             "uuid": 12
  //           }
  //         ],
  //         "x": 1553.6188540251358,
  //         "y": 102.43749203889266
  //       },
  //       {
  //         "name": "Day 7",
  //         "template": "default",
  //         "sources": [
  //           {
  //             "uuid": 13,
  //             "connections": [
  //               {
  //                 "uuid": "16",
  //                 "mouseover": false,
  //                 "type": "Transition"
  //               },
  //               {
  //                 "uuid": "2",
  //                 "mouseover": false,
  //                 "type": "Transition"
  //               }
  //             ]
  //           }
  //         ],
  //         "targets": [
  //           {
  //             "uuid": 14
  //           }
  //         ],
  //         "x": 1984.2906122622283,
  //         "y": 164.93749203889266
  //       },
  //       {
  //         "name": "Non Responsive",
  //         "template": "default",
  //         "sources": [
  //           {
  //             "uuid": 15,
  //             "connections": []
  //           }
  //         ],
  //         "targets": [
  //           {
  //             "uuid": 16
  //           }
  //         ],
  //         "x": 2387.653649371603,
  //         "y": 431.2472799549932
  //       },
  //       {
  //         "name": "New State",
  //         "template": "default",
  //         "sources": [
  //           {
  //             "uuid": 102,
  //             "connections": []
  //           }
  //         ],
  //         "targets": [
  //           {
  //             "uuid": 103
  //           }
  //         ],
  //         "x": 133.32815170288086,
  //         "y": 834.0937614440918
  //       },
  //       {
  //         "name": "New State",
  //         "template": "default",
  //         "sources": [
  //           {
  //             "uuid": 104
  //           }
  //         ],
  //         "targets": [
  //           {
  //             "uuid": 105
  //           }
  //         ],
  //         "x": 1204.1388617621528,
  //         "y": 547.9913330078125
  //       },
  //       {
  //         "name": "New State",
  //         "template": "default",
  //         "sources": [
  //           {
  //             "uuid": 106,
  //             "connections": [
  //               {
  //                 "uuid": "2015",
  //                 "mouseover": false
  //               }
  //             ]
  //           }
  //         ],
  //         "targets": [
  //           {
  //             "uuid": 107
  //           }
  //         ],
  //         "x": 447.4843978881836,
  //         "y": 822.5000381469727
  //       },
  //       {
  //         "name": "New State",
  //         "template": "default",
  //         "sources": [
  //           {
  //             "uuid": 108
  //           }
  //         ],
  //         "targets": [
  //           {
  //             "uuid": 109
  //           }
  //         ],
  //         "x": 822.5000381469727,
  //         "y": 541.2500381469727
  //       },
  //       {
  //         "name": "New State",
  //         "template": "default",
  //         "sources": [
  //           {
  //             "uuid": 2001
  //           },
  //           {
  //             "uuid": 2002
  //           }
  //         ],
  //         "targets": [
  //           {
  //             "uuid": 2003
  //           },
  //           {
  //             "uuid": 2004
  //           }
  //         ],
  //         "x": 728.7499904632568,
  //         "y": 822.5000023841858
  //       },
  //       {
  //         "name": "New State",
  //         "template": "default",
  //         "sources": [
  //           {
  //             "uuid": 2005
  //           },
  //           {
  //             "uuid": 2006
  //           }
  //         ],
  //         "targets": [
  //           {
  //             "uuid": 2007
  //           },
  //           {
  //             "uuid": 2008
  //           }
  //         ],
  //         "x": 978.7499904632568,
  //         "y": 822.5000023841858
  //       },
  //       {
  //         "name": "New State",
  //         "template": "default",
  //         "sources": [
  //           {
  //             "uuid": 2009
  //           },
  //           {
  //             "uuid": 2010
  //           }
  //         ],
  //         "targets": [
  //           {
  //             "uuid": 2011
  //           },
  //           {
  //             "uuid": 2012
  //           }
  //         ],
  //         "x": 353.7656307220459,
  //         "y": 947.4999904632568
  //       },
  //       {
  //         "name": "New State",
  //         "template": "default",
  //         "sources": [
  //           {
  //             "uuid": 2013
  //           },
  //           {
  //             "uuid": 2014
  //           }
  //         ],
  //         "targets": [
  //           {
  //             "uuid": 2015
  //           },
  //           {
  //             "uuid": 2016
  //           }
  //         ],
  //         "x": 728.7500381469727,
  //         "y": 1041.2500381469727
  //       }
  //     ];
  //     // when the response is available
  //   // });
  // // }
  //
  // // $scope.$watch('stateObjects', function (newVal, oldVal) {
  // //   $localStorage.stateObjects = $scope.stateObjects;
  // // }, true);
  //
  //
  // // if (typeof $localStorage.lastUUID === 'undefined') {
  // vm.lastUUID = 2000;
  // // }
  // var getNextUUID = function () {
  //   vm.lastUUID++;
  //   return vm.lastUUID;
  // };
  // vm.newState = function () {
  //   vm.stateObjects.push({
  //     'name': 'New State',
  //     'template': 'default',
  //     'sources': [
  //       {uuid: getNextUUID()},
  //       {uuid: getNextUUID()},
  //     ],
  //     'targets': [
  //       {uuid: getNextUUID()},
  //       {uuid: getNextUUID()}
  //     ],
  //     'x': 10,
  //     'y': 10
  //   });
  // };
  //
  // vm.stateConnections = [
  //   {targetUUID: 8, sourceUUID: 2},
  //   {targetUUID: 7, sourceUUID: 9},
  //   {targetUUID: 4, sourceUUID: 12}
  // ];
  //
  //
  // vm.activeState = null;
  //
  // vm.setActiveState = function (state) {
  //   vm.activeState = state;
  // };
  //
  // vm.onConnection = function (instance, connection, targetUUID, sourceUUID) {
  //   angular.forEach(vm.stateObjects, function (state) {
  //     angular.forEach(state.sources, function (source) {
  //       if (source.uuid === sourceUUID) {
  //         if (typeof source.connections === 'undefined') source.connections = [];
  //         source.connections.push({'uuid': targetUUID});
  //         // $scope.$apply();
  //       }
  //     });
  //   });
  //
  // };

  vm.zoomlevel = 30;
  vm.states = [

    {   'name': 'Secondary Test',
      'sources': [
        { position: 'TopCenter',    uuid:10000},
        { position: 'BottomCenter', uuid:20000},
      ],
      'targets': [
        { position: 'LeftMiddle',   uuid:30000},
        { position: 'RightMiddle',  uuid:40000}
      ],
      'x': 550,
      'y': 130
    },
    {   'name': 'True Enough',
      'sources': [
        { position: 'TopCenter',    uuid:50000},
        { position: 'BottomCenter', uuid:60000},
      ],
      'targets': [
        { position: 'LeftMiddle',   uuid:70000},
        { position: 'RightMiddle',  uuid:80000}
      ],
      'x': 100,
      'y': 260
    }

  ];
  vm.connections = [
    { targetUUID:10000, sourceUUID:70000  },
    { targetUUID:30000, sourceUUID:50000  }
  ];

  vm.onConnection = function(instance, connection, targetUUID, sourceUUID){
    alert('Thanks for making that connection... between '+targetUUID+' and '+sourceUUID);
  };
}
