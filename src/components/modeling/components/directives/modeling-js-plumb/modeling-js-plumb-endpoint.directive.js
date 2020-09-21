export default function modelingJsPlumbEndpointDirective ($timeout) {
  'ngInject';
  return {
    restrict: 'E',
    require: '^customJsPlumbCanvas',
    scope: {
      settings: '=settings'
    },
    controller: function ($scope) {
      this.scope = $scope;
      this.connectionObjects = {};
    },
    transclude: true,
    template: '<div ng-transclude></div>',
    link: function (scope, element, attrs, customJsPlumbCanvas) {
      $timeout(() => {
        const instance = customJsPlumbCanvas.scope.jsPlumbInstance;
        scope.jsPlumbInstance = customJsPlumbCanvas.scope.jsPlumbInstance;
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
