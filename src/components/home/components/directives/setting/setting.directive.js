import template from "./setting.html";

export default function settingDirective() {
  'ngInject';
  return {
    restrict: 'E',
    template: template,
    link: function (scope, element, attr) {

    }
  };
}
