export default function jsPlumbConnectionDirective ($timeout) {
  'ngInject';
  return {
    restrict: 'E',
    require: '^jsPlumbEndpoint',
    scope: {
      ngClick: '&ngClick',
      ngModel: '=ngModel',
      stateObjects: '='
    },
    link: function (scope, element, attrs, jsPlumbEndpoint) {
      console.log("connection");
      console.log(scope);
      $timeout(() => {
        const instance = jsPlumbEndpoint.scope.jsPlumbInstance;
        let inputUuid = jsPlumbEndpoint.scope.uuid;
        let outputUuid = scope.ngModel.uuid;
        if (typeof jsPlumbEndpoint.connectionObjects[outputUuid] === 'undefined') {
          jsPlumbEndpoint.connectionObjects[outputUuid] = instance.connect({
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

        let connection = jsPlumbEndpoint.connectionObjects[outputUuid];

        connection.bind('mouseover', (conn, originalEvent) => {
          let title = 'Uuid Output: ' + outputUuid;
          conn.addOverlay(['Label', {
            label: '<md-card style=\'padding: 4px\'>' + title + '</md-card>',
            location: 0.5,
            id: 'connLabel'
          }]);
          scope.ngModel.mouseover = true;
          scope.$apply();
        });

        connection.bind('mouseout', (conn, originalEvent) => {
          conn.removeOverlay('connLabel');
          scope.ngModel.mouseover = false;
          scope.$apply();
        });

        scope.$on('$destroy', () => {
          try {
            instance.deleteConnection(jsPlumbEndpoint.connectionObjects[outputUuid]);
          } catch (err) {
            console.log('error', err, jsPlumbEndpoint.connectionObjects[outputUuid]);

          }
          jsPlumbEndpoint.connectionObjects[outputUuid] = undefined;
        });
      }, 50);
    }
  };
}
