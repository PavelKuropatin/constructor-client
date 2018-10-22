export default function jsPlumbEndpointDirective() {
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
      const instance = jsPlumbCanvas.scope.jsPlumbInstance;
      scope.jsPlumbInstance = jsPlumbCanvas.scope.jsPlumbInstance;
      scope.uuid = attrs.uuid;
      let options = {
        anchor: attrs.anchor,
        uuid: attrs.uuid
      };

      // console.log('rigging up endpoint');
      $(element).addClass('_jsPlumb_endpoint');
      $(element).addClass('endpoint_' + attrs.anchor);

      let ep = instance.addEndpoint(element, scope.settings, options);

      scope.$on('$destroy', function () {
        instance.deleteEndpoint(ep);
      });
    }
  };
}
