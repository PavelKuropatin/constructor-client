const math = require('mathjs');
import template from './setting.html';

export default function settingDirective(stateObjectService) {
  'ngInject';
  return {
    restrict: 'E',
    template: template,
    link: function (scope, element, attr) {
      scope.state = stateObjectService.getConfigState();

      scope.countFunction = (output) => {
        let bufFunction = _.clone(output.stringFunction);
        _.forEach(scope.state.inputContainer, item => {
          bufFunction = _.replace(bufFunction, item.label, item.value);
        });
        output.resultFunction = math.eval(bufFunction);
        output.value = output.resultFunction;
      };
    }
  };
}
