import actionTemplate from './action/action.html';
// import circleTemplate from './circle/circle.html';

export default function partialsConfig ($templateCache, CONSTANTS) {
  'ngInject';
  $templateCache.put(CONSTANTS.PARTIALS.ACTION, actionTemplate);
  // $templateCache.put(CONSTANTS.PARTIALS.CIRCLE, circleTemplate);
}
