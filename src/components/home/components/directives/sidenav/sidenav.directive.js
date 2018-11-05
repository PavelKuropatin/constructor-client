import template from "./sidenav.html";

export default function sidenavDirective(uuidService) {
  return {
    restrict: 'EA',
    scope: {
      stateObjects: '=',
      activeState: '='
    },
    template: template,
    link: function (scope, element, attr) {
      scope.newState = function () {
        scope.stateObjects.push({
          'name': 'New State',
          'template': 'default',
          'sources': [
            {uuid: uuidService.getNextUUID()},
            {uuid: uuidService.getNextUUID()},
          ],
          'targets': [
            {uuid: uuidService.getNextUUID()},
            {uuid: uuidService.getNextUUID()}
          ],
          'x': 10,
          'y': 10
        });
      };

      scope.removeState = function (state) {
        const index = scope.stateObjects.indexOf(state);
        if (index !== -1) {
          scope.stateObjects.splice(index, 1);
        }
      };

      scope.removeIndex = function (index, object) {
        object.splice(index, 1);
      };

      scope.setActiveState = function (state) {
        scope.activeState = state;
      };
    }
  };
}
