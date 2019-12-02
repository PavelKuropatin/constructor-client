import template from './sidenav.html';
import containerTemplate from '../../dialogs/add-container/add-container.html';
import delContainerTemplate from '../../dialogs/del-container/del-container.html';
import editEndpointsLayoutTemplate from '../../dialogs/edit-endpoints-layout/edit-endpoints-layout.html';

export default function sidenavDirective ($timeout, $mdDialog, stateObjectService, CONSTANTS) {
  'ngInject';
  return {
    restrict: 'EA',
    scope: {
      diagram: '=',
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
          clickOutsideToClose: true
        }).then(function (model) {
          stateObjectService.addContainer(state, type, model.param, model.value);
        });
      };

      scope.setActiveState = (state) => {
        if (scope.activeState === state) {
          scope.activeState = null;
        } else {
          scope.activeState = state;
          scope.countFunction(scope.diagram.states, scope.activeState);
        }
      };

      scope.isActionState = (state) => {
        return state.template === CONSTANTS.PARTIALS.ACTION;
      };

      scope.isCircleState = (state) => {
        return state.template === CONSTANTS.PARTIALS.CIRCLE;
      };

      function refreshStates () {
        let bufStateObjects = scope.diagram.states.slice();
        scope.diagram.states = [];
        $timeout(() => {
          scope.diagram.states = bufStateObjects;
        });
      }

      scope.editEndpoints = (state) => {
        $mdDialog.show({
          locals: { endpointStyle: state.style },
          controller: 'editEndpointsLayoutController as vm',
          template: editEndpointsLayoutTemplate,
          clickOutsideToClose: true
        }).then(function (endpointStyle) {
          state.style = endpointStyle;
          refreshStates();
        });
      };

      scope.deleteInput = (state, type) => {
        $mdDialog.show({
          locals: { container: state.inputContainer },
          controller: 'delContainerController as vm',
          template: delContainerTemplate,
          clickOutsideToClose: true
        }).then(function (param) {
          stateObjectService.deleteContainer(state, type, param);
        });
      };

      scope.deleteOutput = (state, type) => {
        $mdDialog.show({
          locals: { container: state.outputContainer },
          controller: 'delContainerController as vm',
          template: delContainerTemplate,
          clickOutsideToClose: true
        }).then(function (param) {
          stateObjectService.deleteContainer(state, type, param);
        });
      };

      scope.showStateSettings = (state) => {
        scope.isActiveSetting = !scope.isActiveSetting;
        stateObjectService.setConfigState(state);
      };
    }
  };
}
