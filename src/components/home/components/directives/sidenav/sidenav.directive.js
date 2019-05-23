import template from './sidenav.html';
import containerTemplate from '../../dialogs/add-container/add-container.html';
import delContainerTemplate from '../../dialogs/del-container/del-container.html';

export default function sidenavDirective($timeout, $mdDialog, stateObjectService, CONSTANTS) {
  'ngInject';
  return {
    restrict: 'EA',
    scope: {
      diagramInfo: '=',
      activeState: '=',
      isActiveSetting: '=',
      isActiveModel: '=?'
    },
    template: template,
    link: function (scope, element, attr) {
      scope.CONSTANTS = CONSTANTS;
      scope.newState = stateObjectService.createState;
      scope.deleteState = stateObjectService.deleteState;
      scope.removeIndex = stateObjectService.removeIndex;
      scope.deleteDiagram = stateObjectService.deleteDiagram;
      scope.partials = _.values(CONSTANTS.PARTIALS);
      scope.colors = _.values(CONSTANTS.TYPE_ACTION);
      scope.countFunction = stateObjectService.countFunction;

      scope.openContainerDiagram = (state, type) => {
        $mdDialog.show({
          controller: 'addContainerController as vm',
          template: containerTemplate,
          clickOutsideToClose: true,
        }).then(function (model) {
          stateObjectService.addContainer(state, type, model.param, model.value);
        });
      };

      scope.setActiveState = (state) => {
        if (scope.activeState === state) {
          scope.activeState = null;
        } else {
          scope.activeState = state;
          scope.countFunction(scope.activeState);
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

        let bufStateObjects = scope.diagramInfo.modules.slice();
        scope.diagramInfo.modules = [];
        $timeout(() => {
          scope.diagramInfo.modules = bufStateObjects;
        });
      };

      scope.deleteInput = (state, type) => {
        $mdDialog.show({
           locals: {container: state.inputContainer},
                controller: 'delContainerController as vm',
                template: delContainerTemplate,
                clickOutsideToClose: true,
              }).then(function (param) {
                stateObjectService.deleteContainer(state, type, param);
              });
        };

      scope.deleteOutput = (state, type) => {
        $mdDialog.show({
           locals: {container: state.outputContainer},
           controller: 'delContainerController as vm',
              template: delContainerTemplate,
              clickOutsideToClose: true,
          }).then(function (param) {
             stateObjectService.deleteContainer(state, type, param);
         });
      };

      scope.configState = (state) => {
        scope.isActiveSetting = !scope.isActiveSetting;
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
