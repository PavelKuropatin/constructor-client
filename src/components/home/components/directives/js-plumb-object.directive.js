export default function jsPlumbObjectDirective() {
  'ngInject';
  return {
    restrict: 'E',
    require: '^jsPlumbCanvas',
    scope: {
      stateObject: '=stateObject'
    },
    transclude: true,
    template: '<div ng-transclude></div>',
    link: function (scope, element, attrs, jsPlumbCanvas) {
      const instance = jsPlumbCanvas.scope.jsPlumbInstance;

      console.log('constructing object');

      instance.draggable(element, {

        drag: function (event, ui) {
          scope.stateObject.x = event.pos[0];
          scope.stateObject.y = event.pos[1];

          scope.$apply();
        }
      });

      scope.$on('$destroy', function () {

      });
    }
  };
}
