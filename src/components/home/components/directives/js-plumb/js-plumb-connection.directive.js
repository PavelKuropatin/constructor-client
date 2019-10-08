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
            $timeout(() => {
                const instance = jsPlumbEndpoint.scope.jsPlumbInstance;
                let sourceUUID = jsPlumbEndpoint.scope.uuid;
                let targetUUID = scope.ngModel.uuid;
                if (typeof jsPlumbEndpoint.connectionObjects[targetUUID] === 'undefined') {
                    jsPlumbEndpoint.connectionObjects[targetUUID] = instance.connect({
                        uuids: [
                            sourceUUID,
                            targetUUID
                        ],
                        paintStyle: {
                            strokeWidth: 6,
                            stroke: "#61B7CF"
                        },
                        connector: ["Flowchart", {stub: [30, 30], gap: 20, cornerRadius: 10, alwaysRespectStubs: true}],
                    });
                }

                let connection = jsPlumbEndpoint.connectionObjects[targetUUID];

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

                scope.$on('$destroy', () => {
                    try {
                        console.log(targetUUID);
                        instance.deleteConnection(jsPlumbEndpoint.connectionObjects[targetUUID]);
                    } catch (err) {
                        console.log('error', err, jsPlumbEndpoint.connectionObjects[targetUUID]);

                    }
                    jsPlumbEndpoint.connectionObjects[targetUUID] = undefined;
                });
            }, 50);
        }
    };
}
