export default function customJsPlumbConnectionDirective ($timeout) {
  'ngInject';
  return {
    restrict: 'E',
    require: '^customJsPlumbEndpoint',
    scope: {
      ngClick: '&ngClick',
      ngModel: '=ngModel',
      blockObjects: '='
    },
    link: function (scope, element, attrs, customJsPlumbEndpoint) {
      $timeout(() => {
        const instance = customJsPlumbEndpoint.scope.jsPlumbInstance;
        let inputUuid = customJsPlumbEndpoint.scope.uuid;
        let outputUuid = scope.ngModel.uuid;
        if (typeof customJsPlumbEndpoint.connectionObjects[outputUuid] === 'undefined') {
          customJsPlumbEndpoint.connectionObjects[outputUuid] = instance.connect({
            uuids: [
              inputUuid,
              outputUuid
            ],
            paintStyle: {
              strokeWidth: 6,
              stroke: '#61B7CF'
            },
            connector: ['Flowchart', { stub: [30, 30], gap: 20, cornerRadius: 10, alwaysRespectStubs: true }]
          });
        }

        let connection = customJsPlumbEndpoint.connectionObjects[outputUuid];

//                connection.bind("mouseover", (conn, originalEvent) => {
//                    let title = 'Uuid Output: ' + outputUuid;
//                    conn.addOverlay(["Label", {
//                        label: "<md-card style='padding: 4px'>" + title + "</md-card>",
//                        location: 0.5,
//                        id: "connLabel"
//                    }]);
//                    scope.ngModel.mouseover = true;
//                    scope.$apply();
//                });

        connection.bind('mouseout', (conn, originalEvent) => {
          conn.removeOverlay('connLabel');
          scope.ngModel.mouseover = false;
          scope.$apply();
        });

        scope.$on('$destroy', () => {
          try {
            instance.deleteConnection(customJsPlumbEndpoint.connectionObjects[outputUuid]);
          } catch (err) {
            console.log('error', err, customJsPlumbEndpoint.connectionObjects[outputUuid]);

          }
          customJsPlumbEndpoint.connectionObjects[outputUuid] = undefined;
        });
      }, 50);
    }
  };
}
