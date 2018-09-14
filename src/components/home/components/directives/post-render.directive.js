export default function postRender($timeout) {
  return {
    restrict: 'A',
    terminal : true,
    transclude : true,
    link : function(scope, element, attrs) {
      $timeout(scope.home.redraw, 0);
    }
  };
}
