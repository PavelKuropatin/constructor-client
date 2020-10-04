import template from './modeling-setting.html';
import chooseImageTemplate from '../../dialogs/choose-image/choose-image.html';

const math = require('mathjs');

export default function modelingSettingDirective ($mdDialog, blockObjectService, blockObjectHttpService, CONSTANTS) {
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
      scope.block = blockObjectService.getConfigBlock();
      scope.countFunction = blockObjectService.countFunction;
      scope.inputLayout = getByAnchor(scope.block.endpointStyle.inputAnchor);
      scope.outputLayout = getByAnchor(scope.block.endpointStyle.outputAnchor);

      scope.saveSettings = () => {
        _.merge(scope.block.endpointStyle, {
          inputAnchor: CONSTANTS.ENDPOINT_LAYOUTS[scope.inputLayout].a,
          inputEndpoint: CONSTANTS.ENDPOINT_LAYOUTS[scope.inputLayout].e,
          outputAnchor: CONSTANTS.ENDPOINT_LAYOUTS[scope.outputLayout].a,
          outputEndpoint: CONSTANTS.ENDPOINT_LAYOUTS[scope.outputLayout].e
        });
        scope.refreshNumbers();
        console.log(scope.block.settings.actions);
        blockObjectHttpService.saveSettings(scope.block.settings.uuid, scope.block.settings).then(response => {
          console.log(response.data);
          scope.block.settings = response.data;
        });
      };

      scope.refreshNumbers = () => {
        _.forEach(scope.block.settings.actions, (action, i) => action.number = i + 1);
      };

      scope.deleteSettingsAction = (settings_uuid, action_uuid) => {
        blockObjectHttpService.deleteSettingsAction(settings_uuid, action_uuid).then(response => {
          scope.block.settings = response.data;
          scope.saveSettings();
        });
      };

      scope.addSettingsAction = (settings_uuid) => {
        blockObjectHttpService.addSettingsAction(settings_uuid, {
          condition: 'true',
          type: 'none',
          number: scope.block.settings.actions.length + 1
        }).then(response => {
          scope.block.settings = response.data;
          scope.saveSettings();
        });
      };

      scope.chooseImage = (action) => {
        console.log(scope);
        $mdDialog.show({
          controller: function ($scope, $mdDialog, blockObjectService, imageHttpService) {

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
            $scope.hideDialog = () => {
              $mdDialog.cancel();
            };
            $scope.getFile = (file) => {
              if (!file) {
                return;
              }
              $scope.uploadedImage = null;
              imageHttpService.uploadImage(file).then((response) => {
                $scope.uploadedImage = response.data.url;
                $mdDialog.hide(response.data.url);
              });
            };
          },
          template: chooseImageTemplate,
          clickOutsideToClose: true
        }).then(function (url) {
          if (url) {
            action.value = url;
            console.log(action);

          }
        });
      };
    }
  };
}
