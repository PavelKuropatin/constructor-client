import template from './custom-setting.html';

const math = require('mathjs');

export default function customSettingDirective (stateObjectService, CONSTANTS) {
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
            scope.state = stateObjectService.getConfigState();
            scope.countFunction = stateObjectService.countFunction;
            scope.sourceLayout = getByAnchor( scope.state.endpointStyle.sourceAnchor);
            scope.targetLayout = getByAnchor( scope.state.endpointStyle.targetAnchor);


             scope.apply =  () => {
                  _.merge(scope.state.endpointStyle, {
                    sourceAnchor: CONSTANTS.ENDPOINT_LAYOUTS[scope.sourceLayout].a,
                    sourceEndpoint: CONSTANTS.ENDPOINT_LAYOUTS[scope.sourceLayout].e,
                    targetAnchor: CONSTANTS.ENDPOINT_LAYOUTS[scope.targetLayout].a,
                    targetEndpoint: CONSTANTS.ENDPOINT_LAYOUTS[scope.targetLayout].e
                  });
             };
    }
  };
}
