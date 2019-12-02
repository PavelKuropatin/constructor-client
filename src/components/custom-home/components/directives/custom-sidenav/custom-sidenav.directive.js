import template from './custom-sidenav.html';

export default function customSidenavDirective ($timeout, $mdDialog, stateObjectService) {
  'ngInject';
  return {
    restrict: 'EA',
    scope: {
      diagram: '=',
      activeState: '=',
      setActiveState: '=',
      changeVisibility: '=',
      isActiveState: '=',
      isActiveSetting: '=',
      refresh: '=',
      editable: '='
    },
    template: template,
    link: (scope, element, attr) => {
      scope.sortableOptions = {
        connectWith: '.connectedItems'
      };

      function refreshStates () {
        let bufStateObjects = scope.diagram.states.slice();
        scope.diagram.states = [];
        $timeout(() => {
          scope.diagram.states = bufStateObjects;
        });
      }

      scope.showStateSettings = (state) => {
        scope.isActiveSetting = !scope.isActiveSetting;
        stateObjectService.setConfigState(state);
      };

      scope.configState = (state) => {
        scope.isActiveSetting = !scope.isActiveSetting;
        stateObjectService.setConfigState(state);
      };
    }
  };
}
