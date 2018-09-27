import template from './sidenav.html';

export default function sidenavDirective() {
  return {
    restrict: 'EA',
    scope: {
    },
    template: template,
    controller: 'sidenavController as vm'
  };
}
