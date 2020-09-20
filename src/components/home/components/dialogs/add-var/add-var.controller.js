export default function addVarController ($mdDialog) {
  'ngInject';
  const vm = this;

  vm.addVar = () => {
    $mdDialog.hide(vm.inputVar);
  };

  vm.closeDialog = () => {
    $mdDialog.cancel();
  };
}
