export default function customJsPlumbObjectDirective () {
  'ngInject';
  return {
    restrict: 'E',
    require: '^customJsPlumbCanvas',
    scope: {
      stateObject: '=stateObject'
    },
    transclude: true,
    template: '<div ng-transclude></div>',
    link: function (scope, element, attrs, customJsPlumbCanvas) {
      const instance = customJsPlumbCanvas.scope.jsPlumbInstance;

      instance.draggable(element, {
        drag: function (event) {
          scope.stateObject.x = event.pos[0];
          scope.stateObject.y = event.pos[1];
          scope.$apply();
        }
      });
    }
  };
}
