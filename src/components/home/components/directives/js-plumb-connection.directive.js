export default function jsPlumbConnectionDirective($timeout) {
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
      const instance = jsPlumbEndpoint.scope.jsPlumbInstance;
      let sourceUUID = jsPlumbEndpoint.scope.uuid;
      let targetUUID = scope.ngModel.uuid;

      $timeout(() => {
        if (typeof jsPlumbEndpoint.connectionObjects[targetUUID] === 'undefined') {
          jsPlumbEndpoint.connectionObjects[targetUUID] = instance.connect({
            uuids: [
              targetUUID,
              sourceUUID
            ]
          });
        }

        let connection = jsPlumbEndpoint.connectionObjects[targetUUID];

        connection.bind("click", (conn, originalEvent) => {
          scope.ngClick();
          scope.$apply();
        });

        connection.bind("mouseover", (conn, originalEvent) => {
          let title = 'UUID Target: ' + targetUUID;
          conn.addOverlay(["Label", {
            label: "<md-card style='padding: 4px'>" + title + "</md-card>",
            location: 0.5,
            id: "connLabel"
          }]);
          scope.ngModel.mouseover = true;
          scope.$apply();
        });
        connection.bind("mouseout", (conn, originalEvent) => {
          conn.removeOverlay("connLabel");
          scope.ngModel.mouseover = false;
          scope.$apply();
        });

      }, 300);

      // scope.$watchCollection('stateObjects', () => {
      //   if (typeof jsPlumbEndpoint.connectionObjects[targetUUID] === 'undefined') {
      //     jsPlumbEndpoint.connectionObjects[targetUUID] = instance.connect({
      //       uuids: [
      //         targetUUID,
      //         sourceUUID
      //       ]
      //     });
      //   }
      // }, 300);

      scope.$on('$destroy', () => {
        try {
          instance.deleteConnection(jsPlumbEndpoint.connectionObjects[targetUUID]);
        } catch (err) {
          console.log('error', err, jsPlumbEndpoint.connectionObjects[targetUUID]);

        }
        jsPlumbEndpoint.connectionObjects[targetUUID] = undefined;
      });

    }
  };
}
