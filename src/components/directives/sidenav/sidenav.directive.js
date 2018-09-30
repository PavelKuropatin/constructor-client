import template from './sidenav.html';

export default function sidenavDirective() {
  return {
    restrict: 'EA',
    scope: {
      library: '='
    },
    template: template,
    link: function (scope) {
      scope.isSindenavVisible = true;


    }
  };
}
