export default function customJsPlumbConnectionDirective ($timeout) {
  'ngInject'
  return {
    restrict: 'E',
    require: '^customJsPlumbEndpoint',
    scope: {
      ngClick: '&ngClick',
      ngModel: '=ngModel',
      stateObjects: '='
    },
    link: function (scope, element, attrs, customJsPlumbEndpoint) {
      $timeout(() => {
        const instance = customJsPlumbEndpoint.scope.jsPlumbInstance
        let sourceUuid = customJsPlumbEndpoint.scope.uuid
        let targetUuid = scope.ngModel.uuid
        if (typeof customJsPlumbEndpoint.connectionObjects[targetUuid] === 'undefined') {
          customJsPlumbEndpoint.connectionObjects[targetUuid] = instance.connect({
            uuids: [
              sourceUuid,
              targetUuid
            ],
            paintStyle: {
              strokeWidth: 6,
              stroke: '#61B7CF'
            },
            connector: ['Flowchart', { stub: [30, 30], gap: 20, cornerRadius: 10, alwaysRespectStubs: true }],
          })
        }

        let connection = customJsPlumbEndpoint.connectionObjects[targetUuid]

//                connection.bind("mouseover", (conn, originalEvent) => {
//                    let title = 'Uuid Target: ' + targetUuid;
//                    conn.addOverlay(["Label", {
//                        label: "<md-card style='padding: 4px'>" + title + "</md-card>",
//                        location: 0.5,
//                        id: "connLabel"
//                    }]);
//                    scope.ngModel.mouseover = true;
//                    scope.$apply();
//                });

        connection.bind('mouseout', (conn, originalEvent) => {
          conn.removeOverlay('connLabel')
          scope.ngModel.mouseover = false
          scope.$apply()
        })

        scope.$on('$destroy', () => {
          try {
            instance.deleteConnection(customJsPlumbEndpoint.connectionObjects[targetUuid])
          } catch (err) {
            console.log('error', err, customJsPlumbEndpoint.connectionObjects[targetUuid])

          }
          customJsPlumbEndpoint.connectionObjects[targetUuid] = undefined
        })
      }, 50)
    }
  }
}
