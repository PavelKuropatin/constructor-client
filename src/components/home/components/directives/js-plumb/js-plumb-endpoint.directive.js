export default function jsPlumbEndpointDirective ($timeout) {
  'ngInject';
  return {
    restrict: 'E',
    require: '^jsPlumbCanvas',
    scope: {
      settings: '=settings'
    },
    controller: function ($scope) {
      this.scope = $scope;
      this.connectionObjects = {};
    },
    transclude: true,
    template: '<div ng-transclude></div>',
    link: function (scope, element, attrs, jsPlumbCanvas) {
      $timeout(() => {
        const instance = jsPlumbCanvas.scope.jsPlumbInstance;
        scope.jsPlumbInstance = jsPlumbCanvas.scope.jsPlumbInstance;
        scope.uuid = attrs.uuid;
        let options = {
          anchor: attrs.anchor,
          uuid: attrs.uuid
        };

        let ep = instance.addEndpoint(element, scope.settings, options);
        scope.$on('$destroy', () => {
          instance.deleteEndpoint(ep);
        });
      });
    }
  };
}
