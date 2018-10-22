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
            // source: targetUUID,
            // target: sourceUUID,
            uuids: [
              targetUUID,
              sourceUUID
            ],
            overlays: [
              ["Label", {label: "", id: "label"}]
            ], editable: true
          });
        }

        let connection = jsPlumbEndpoint.connectionObjects[targetUUID];

        console.log(jsPlumbEndpoint.connectionObjects);

        connection.bind("click", function (conn, originalEvent) {
          scope.ngClick();
          scope.$apply();
        });

        connection.bind("mouseenter", function (conn, originalEvent) {
          scope.ngModel.mouseover = true;
          scope.$apply();
        });
        connection.bind("mouseleave", function (conn, originalEvent) {
          scope.ngModel.mouseover = false;
          scope.$apply();
        });


        // not really using this... but we should fix it :)

        let overlay = connection.getOverlay("label");
        if (overlay) {
          // console.log('[getOverlay][label]', connection.getOverlay("label"));
          $(element).appendTo(overlay.canvas);
        }
      }, 300);


      scope.$on('$destroy', function () {
        // console.log('jsPlumbConnection for $destroy');
        try {
          instance.detach(jsPlumbEndpoint.connectionObjects[targetUUID]);
        } catch (err) {
          console.log('error', err, jsPlumbEndpoint.connectionObjects[targetUUID]);

        }
        // if the connection is destroyed, I am assuming the parent endPoint is also destroyed, and we need to remove
        // the reference that a link exists, so it will be rendered again
        jsPlumbEndpoint.connectionObjects[targetUUID] = undefined;
      });

    }
  };
}
