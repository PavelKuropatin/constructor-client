import template from './custom-setting.html';
import chooseImageTemplate from '../../dialogs/choose-image/choose-image.html';

const math = require('mathjs');

export default function customSettingDirective ($mdDialog, stateObjectService, stateObjectHttpService, CONSTANTS) {
  'ngInject';
  return {
    restrict: 'E',
    template: template,
    controllerAs: 'ctrl',
    link: function (scope, element, attr, ctrl) {
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

      scope.chooseImage = (action) => {
        console.log(scope);
        $mdDialog.show({
          controller: function ($scope, $mdDialog, stateObjectService, imageHttpService) {

            const loadImages = () => {
              imageHttpService.getImages(15).then(response => {
                $scope.images = response.data;
              });
            };

            loadImages();

            $scope.uploadImage = () => {
              $('#action_file').click();
            };

            $scope.apply = (url) => {
              $mdDialog.hide(url);
            };

            $scope.getFile = (file) => {
              if (!file) {
                return;
              }
              $scope.uploadedImage = null;
              imageHttpService.uploadImage(file).then((response) => {
                $mdDialog.hide(response.data.url);
              });
            };
          },
          template: chooseImageTemplate,
          clickOutsideToClose: true
        }).then(function (url) {
          action.value = url;
          console.log(action);
        });
      };
    }
  };
}
