export default function startCountController ($scope, $mdDialog, modelSettings, CONSTANTS) {
  'ngInject'
  let vm = this

  vm.sourceTypes = ['Generated', 'Socket']
  vm.selectedSourceType = null
  $scope.CONSTANTS = CONSTANTS
  if (modelSettings) {
    vm.modelSettings = modelSettings
    vm.selectedSourceType = modelSettings.type
  }

  console.log(vm.modelSettings)

  vm.apply = () => {
    vm.modelSettings.type = vm.selectedSourceType
    $mdDialog.hide(vm.modelSettings)
  }

  vm.hideDialog = () => {
    $mdDialog.cancel()
  }

  vm.addVariable = () => {
    if (!vm.modelSettings.vars) {
      vm.modelSettings.vars = []
    }

    vm.modelSettings.vars.push({
      startValue: 0,
      stepValue: 2,
      valueName: '#'
    })
  }

  vm.deleteVariable = (index) => {
    vm.modelSettings.vars.splice(index, 1)
  }
}
