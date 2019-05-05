import template from './setting.html';
const math = require('mathjs');

export default function settingDirective(stateObjectService) {
  'ngInject';
  return {
    restrict: 'E',
    template: template,
    link: function (scope, element, attr) {
      scope.state = stateObjectService.getConfigState();
      scope.countFunction = stateObjectService.countFunction;
    }
  };
}
