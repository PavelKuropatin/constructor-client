import template from "./sidenav.html";

export default function sidenavDirective($timeout, stateObjectService, CONSTANTS) {
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
      scope.partials = _.values(CONSTANTS.PARTIALS);
      scope.colors = _.values(CONSTANTS.TYPE_ACTION);

      scope.setActiveState = (state) => {
        if (scope.activeState === state) {
          scope.activeState = null;
        } else {
          scope.activeState = state;
        }
      };

      scope.isActionState = (state) => {
        return state.template === CONSTANTS.PARTIALS.ACTION;
      };

      scope.isCircleState = (state) => {
        return state.template === CONSTANTS.PARTIALS.CIRCLE;
      };

      scope.swapEndpointState = (state) => {
        state.endpointStyle.targetEndpoint = swapStyles(state.endpointStyle.targetEndpoint);
        state.endpointStyle.sourceEndpoint = swapStyles(state.endpointStyle.sourceEndpoint);
        let bufState = _.cloneDeep(state);
        scope.stateObjects.splice(scope.stateObjects.indexOf(state), 1);
        $timeout(() => {
          scope.stateObjects.push(bufState);
          scope.activeState = bufState;
        });
      };

      function swapStyles(endpoint) {
        if (endpoint === CONSTANTS.ENDPOINT_STYLE.RIGHT) {
          return CONSTANTS.ENDPOINT_STYLE.LEFT;
        } else {
          return CONSTANTS.ENDPOINT_STYLE.RIGHT;
        }
      }
    }
  };
}
