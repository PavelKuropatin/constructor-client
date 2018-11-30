import template from "./setting.html";

export default function settingDirective(stateObjectService) {
  'ngInject';
  return {
    restrict: 'E',
    template: template,
    link: function (scope, element, attr) {
      scope.state = stateObjectService.getConfigState();

    }
  };
}
