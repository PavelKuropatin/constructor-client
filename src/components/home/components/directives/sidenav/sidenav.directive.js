import template from "./sidenav.html";

export default function sidenavDirective($timeout, stateObjectService, CONSTANTS) {
  'ngInject';
  return {
    restrict: 'EA',
    scope: {
      stateObjects: '=',
      activeState: '=',
      isActiveSetting: '='
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
        state.endpointStyle.targetEndpoint = swapEndpointStyles(state.endpointStyle.targetEndpoint);
        state.endpointStyle.sourceEndpoint = swapEndpointStyles(state.endpointStyle.sourceEndpoint);

        state.endpointStyle.targetAnchor = swapAnchorStyles(state.endpointStyle.targetAnchor);
        state.endpointStyle.sourceAnchor = swapAnchorStyles(state.endpointStyle.sourceAnchor);

        let bufStateObjects = scope.stateObjects.slice();
        scope.stateObjects = [];
        $timeout(() => {
          scope.stateObjects = bufStateObjects;
        });
      };

      scope.addInput = (state) => {
        state.inputContainer.push({label: 'vt', value: undefined});
      };

      scope.deleteInput = (state) => {
        state.inputContainer.pop();
      };

      scope.addOutput = (state) => {
        state.outputContainer.push({label: 'vt', value: undefined});
      };

      scope.deleteOutput = (state) => {
        state.outputContainer.pop();
      };

      scope.configState = (state) => {
        if (scope.isActiveSetting) {
          scope.isActiveSetting = false;
        } else {
          scope.isActiveSetting = true;
        }
        stateObjectService.setConfigState(state);
      };

      function swapEndpointStyles(endpoint) {
        if (endpoint === CONSTANTS.ENDPOINT_STYLE.ACTION.RIGHT) {
          return CONSTANTS.ENDPOINT_STYLE.ACTION.LEFT;
        } else {
          return CONSTANTS.ENDPOINT_STYLE.ACTION.RIGHT;
        }
      }

      function swapAnchorStyles(anchor) {
        if (anchor === CONSTANTS.ANCHOR.RIGHT_MIDDLE) {
          return CONSTANTS.ANCHOR.LEFT_MIDDLE;
        } else {
          return CONSTANTS.ANCHOR.RIGHT_MIDDLE;
        }
      }
    }
  };
}
