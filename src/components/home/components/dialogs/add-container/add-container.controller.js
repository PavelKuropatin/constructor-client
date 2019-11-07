export default function addContainerController ($mdDialog) {
  'ngInject';
  const vm = this;

  vm.addVar = () => {
    $mdDialog.hide(vm.inputModel);
  };

  vm.hideDialog = () => {
    $mdDialog.cancel();
  };
}
