export default function addContainerController($mdDialog) {
  "ngInject";
  let vm = this;

  vm.hideDialog = hideDialog;
  vm.addVar = addVar;

  function addVar() {
    $mdDialog.hide(vm.inputModel);
  }

  function hideDialog() {
    $mdDialog.cancel();
  }
}
