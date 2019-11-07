import template from './custom-sidenav.html'
import editEndpointsLayoutTemplate
  from '../../../../home/components/dialogs/edit-endpoints-layout/edit-endpoints-layout.html'

export default function customSidenavDirective ($timeout, $mdDialog) {
  'ngInject'
  return {
    restrict: 'EA',
    scope: {
      diagram: '=',
      activeState: '=',
      setActiveState: '=',
      changeVisibility: '=',
      isActiveState: '=',
      refresh: '=',
      editable: '='
    },
    template: template,
    link: (scope, element, attr) => {
      scope.sortableOptions = {
        connectWith: '.connectedItems'
      }

      function refreshStates () {
        let bufStateObjects = scope.diagram.states.slice()
        scope.diagram.states = []
        $timeout(() => {
          scope.diagram.states = bufStateObjects
        })
      }

      scope.editEndpoints = (state) => {
        $mdDialog.show({
          locals: { endpointStyle: state.endpointStyle },
          controller: 'editEndpointsLayoutController as vm',
          template: editEndpointsLayoutTemplate,
          clickOutsideToClose: true,
        }).then(function (endpointStyle) {
          state.endpointStyle = endpointStyle
          refreshStates()
        })
      }
    }
  }
}
