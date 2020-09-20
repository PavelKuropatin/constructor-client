import template from './setting.html';

const math = require('mathjs');

export default function settingDirective (blockObjectService, CONSTANTS) {
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
      };

    }
  };
}
