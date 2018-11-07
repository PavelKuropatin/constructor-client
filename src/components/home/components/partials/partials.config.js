import actionTemplate from './action.html';
import circleTemplate from './circle.html';

export default function partialsConfig($templateCache, partialsConstants) {
  "ngInject";
  $templateCache.put(partialsConstants.PARTIALS.ACTION, actionTemplate);
  $templateCache.put(partialsConstants.PARTIALS.CIRCLE, circleTemplate);
}
