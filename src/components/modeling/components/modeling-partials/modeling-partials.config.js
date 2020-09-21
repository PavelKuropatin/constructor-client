import actionTemplate from './action/action.html';
import circleTemplate from './circle/circle.html';

export default function modelingPartialsConfig ($templateCache, CONSTANTS) {
  'ngInject';
  $templateCache.put(CONSTANTS.CUSTOM_PARTIALS.ACTION, actionTemplate);
  $templateCache.put(CONSTANTS.CUSTOM_PARTIALS.CIRCLE, circleTemplate);
}
