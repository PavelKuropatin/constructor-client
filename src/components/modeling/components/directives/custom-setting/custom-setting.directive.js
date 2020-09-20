import template from './custom-setting.html';
import chooseImageTemplate from '../../dialogs/choose-image/choose-image.html';

const math = require('mathjs');

export default function customSettingDirective ($mdDialog, blockObjectService, blockObjectHttpService, CONSTANTS) {
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

      scope.apply = () => {
        _.merge(scope.block.endpointStyle, {
          inputAnchor: CONSTANTS.ENDPOINT_LAYOUTS[scope.inputLayout].a,
          inputEndpoint: CONSTANTS.ENDPOINT_LAYOUTS[scope.inputLayout].e,
          outputAnchor: CONSTANTS.ENDPOINT_LAYOUTS[scope.outputLayout].a,
          outputEndpoint: CONSTANTS.ENDPOINT_LAYOUTS[scope.outputLayout].e
        });

        blockObjectHttpService.saveSettings(scope.block.uuid, scope.block.settings).then(response => {
          console.log(response.data);
        });
      };

      scope.refreshNumbers = () => {
        _.forEach(scope.block.settings.actions, (action, i) => action.number = i + 1);
      };

      scope.deleteSettingsAction = (action_uuid) => {
         blockObjectHttpService.saveSettings(scope.block.uuid, scope.block.settings).then(response => {
                         scope.block.settings = response.data;
                });
         blockObjectHttpService.deleteSettingsAction(scope.block.uuid, action_uuid).then(response1 => {
          blockObjectHttpService.getBlockSettings(scope.block.uuid).then(response2 => {
            console.log(response2.data);
            scope.block.settings = response2.data;
          });
        });
      };

      scope.addSettingsAction = (block_uuid) => {
        blockObjectHttpService.saveSettings(scope.block.uuid, scope.block.settings).then(response => {
                 scope.block.settings = response.data;
        });
        blockObjectHttpService.addSettingsAction(block_uuid).then(response => {
          console.log(response.data);
          scope.block.settings = response.data;
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
            if (url){
            action.value = url;
                               console.log(action);

            }
          });
      };
    }
  };
}
