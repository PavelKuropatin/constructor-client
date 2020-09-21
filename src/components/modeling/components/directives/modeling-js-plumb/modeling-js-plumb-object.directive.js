export default function modelingJsPlumbObjectDirective () {
  'ngInject';
  return {
    restrict: 'E',
    require: '^customJsPlumbCanvas',
    scope: {
      blockObject: '=blockObject'
    },
    transclude: true,
    template: '<div ng-transclude></div>',
    link: function (scope, element, attrs, customJsPlumbCanvas) {
      const instance = customJsPlumbCanvas.scope.jsPlumbInstance;

      instance.draggable(element, {
        drag: function (event) {
          scope.blockObject.x = event.pos[0];
          scope.blockObject.y = event.pos[1];
          scope.$apply();
        }
      });
    }
  };
}
