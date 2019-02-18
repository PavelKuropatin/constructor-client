import template from './setting.html';
const math = require('mathjs');

export default function settingDirective(stateObjectService) {
  'ngInject';
  return {
    restrict: 'E',
    template: template,
    link: function (scope, element, attr) {
      scope.state = stateObjectService.getConfigState();
      scope.countFunction = (outputContainer) => {
        let bufFunction = _.clone(outputContainer.stringFunction);
        _.forEach(scope.state.inputContainer, item => {
          bufFunction = _.replace(bufFunction, new RegExp(item.label,'g'), item.value);
        });
        try {
          outputContainer.resultFunction = math.eval(bufFunction);
        } catch (err) {}
      };
    }
  };
}
