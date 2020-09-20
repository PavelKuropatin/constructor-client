export default function startCountController ($scope, $mdDialog, modelSettings, CONSTANTS) {
  'ngInject';
  let vm = this;

  vm.storeHistory = false;
  vm.inputTypes = ['Generated', 'Socket'];
  vm.selectedInputType = null;
  $scope.CONSTANTS = CONSTANTS;
  if (modelSettings) {
    vm.modelSettings = modelSettings;
    vm.selectedInputType = modelSettings.type || CONSTANTS.MODEL.GENERATOR;
  }

  vm.apply = () => {
    vm.modelSettings.type = vm.selectedInputType;
    $mdDialog.hide(vm.modelSettings);
  };

  vm.hideDialog = () => {
    $mdDialog.cancel();
  };

  vm.addVariable = () => {
    if (!vm.modelSettings.vars) {
      vm.modelSettings.vars = [];
    }

    vm.modelSettings.vars.push({
      startValue: 0,
      stepValue: 2,
      valueName: '#'
    });
  };

  vm.deleteVariable = (index) => {
    vm.modelSettings.vars.splice(index, 1);
  };
}
