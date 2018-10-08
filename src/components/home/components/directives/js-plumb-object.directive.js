export default function jsPlumbObjectDirective() {
  'ngInject';
  var def = {
    restrict: 'E',
    require: '^jsPlumbCanvas',
    scope: {
      stateObject: '=stateObject'
    },
    transclude: true,
    template: '<div ng-transclude></div>',
    link: function (scope, element, attrs, jsPlumbCanvas) {
      var instance = jsPlumbCanvas.scope.jsPlumbInstance;

      console.log('constructing object');

      instance.draggable(element, {

        drag: function (event, ui) {
          scope.stateObject.x = ui.position.left;
          scope.stateObject.y = ui.position.top;

          scope.$apply();
        }
      });

      scope.$on('$destroy', function () {

      });
    }
  };
  return def;
}
