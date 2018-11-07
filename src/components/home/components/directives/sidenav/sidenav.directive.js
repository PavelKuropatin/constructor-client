import template from "./sidenav.html";

export default function sidenavDirective(stateObjectService) {
  return {
    restrict: 'EA',
    scope: {
      stateObjects: '=',
      activeState: '='
    },
    template: template,
    link: function (scope, element, attr) {
      scope.newState = stateObjectService.getNewState;
      scope.removeState = stateObjectService.removeState;
      scope.removeIndex = stateObjectService.removeIndex;

      scope.setActiveState = function (state) {
        if (scope.activeState === state) {
          scope.activeState = null;
        } else {
          scope.activeState = state;
        }
      };
    }
  };
}
