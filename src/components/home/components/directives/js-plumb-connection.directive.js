export default function jsPlumbConnectionDirective($timeout) {
  'ngInject';
  return {
    restrict: 'E',
    require: '^jsPlumbEndpoint',
    scope: {
      ngClick: '&ngClick',
      ngModel: '=ngModel'
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
            ],
            overlays: [
              ["Label", {label: "", id: "label"}]
            ],
            editable: true
          });
        }

        let connection = jsPlumbEndpoint.connectionObjects[targetUUID];

        connection.bind("click", function (conn, originalEvent) {
          scope.ngClick();
          scope.$apply();
        });

        connection.bind("mouseover", function (conn, originalEvent) {
          scope.ngModel.mouseover = true;
          scope.$apply();
        });
        connection.bind("mouseout", function (conn, originalEvent) {
          scope.ngModel.mouseover = false;
          scope.$apply();
        });

        let overlay = connection.getOverlay("label");
        if (overlay) {
          $(element).appendTo(overlay.canvas);
        }
      }, 300);


      scope.$on('$destroy', function () {
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
