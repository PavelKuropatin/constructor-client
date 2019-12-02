import template from './custom-setting.html';

const math = require('mathjs');

export default function customSettingDirective (stateObjectService, stateObjectHttpService, CONSTANTS) {
  'ngInject';
  return {
    restrict: 'E',
    template: template,
    link: function (scope, element, attr) {
      function getByAnchor (endpointAnchor) {
        switch (endpointAnchor) {
          case CONSTANTS.ANCHOR.TOP_CENTER:
            return 'border_top';
          case CONSTANTS.ANCHOR.BOTTOM_CENTER:
            return 'border_bottom';
          case CONSTANTS.ANCHOR.LEFT_MIDDLE:
            return 'border_left';
          case CONSTANTS.ANCHOR.RIGHT_MIDDLE:
            return 'border_right';
        }
      }

      scope.actions = ['set_image', 'stop_exec', 'none'];
      scope.icons = Object.keys(CONSTANTS.ENDPOINT_LAYOUTS);
      scope.state = stateObjectService.getConfigState();
      scope.countFunction = stateObjectService.countFunction;
      scope.sourceLayout = getByAnchor(scope.state.style.sourceAnchor);
      scope.targetLayout = getByAnchor(scope.state.style.targetAnchor);

      scope.apply = () => {
        _.merge(scope.state.style, {
          sourceAnchor: CONSTANTS.ENDPOINT_LAYOUTS[scope.sourceLayout].a,
          sourceEndpoint: CONSTANTS.ENDPOINT_LAYOUTS[scope.sourceLayout].e,
          targetAnchor: CONSTANTS.ENDPOINT_LAYOUTS[scope.targetLayout].a,
          targetEndpoint: CONSTANTS.ENDPOINT_LAYOUTS[scope.targetLayout].e
        });

        stateObjectHttpService.saveSettings(scope.state.uuid, scope.state.settings).then(response => {
          console.log(response.data);
        });
      };

      scope.refreshNumbers = () => {
        _.forEach(scope.state.settings.actions, (action, i) => action.number = i + 1);
      };

      scope.deleteSettingsAction = (action_uuid) => {
        stateObjectHttpService.deleteSettingsAction(scope.state.uuid, action_uuid).then(response1 => {
          stateObjectHttpService.getStateSettings(scope.state.uuid).then(response2 => {
            console.log(response2.data);
            scope.state.settings = response2.data;
          });
        });
      };

      scope.addSettingsAction = (state_uuid) => {
        stateObjectHttpService.addSettingsAction(state_uuid).then(response => {
          console.log(response.data);
          scope.state.settings = response.data;
        });
      };

    }
  };
}
