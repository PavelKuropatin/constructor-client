export default function containerController($mdDialog) {
  "ngInject";
  let vm = this;

  vm.hideDialog = hideDialog;
  vm.chooseDiagram = chooseDiagram;

  function chooseDiagram() {
    $mdDialog.hide(vm.inputModel);
  }

  function hideDialog() {
    $mdDialog.cancel();
  }
}
