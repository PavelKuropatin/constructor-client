import template from './model-sidenav.html';

export default function modelSidenavDirective() {
  'ngInject';
  return {
    restrict: 'EA',
    scope: {
      states: '='
    },
    template: template,
    link: function (scope, element, attr) {
      scope.sortableOptions = {
        connectWith: '.connectedItems'
      };
    }
  };
}
