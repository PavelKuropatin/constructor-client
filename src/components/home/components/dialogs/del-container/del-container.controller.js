export default function delContainerController($mdDialog, container) {
  "ngInject";
  let vm = this;

  vm.container = container;
  vm.hideDialog = hideDialog;
  vm.chooseDiagram = chooseDiagram;

  function deleteVar(param) {
    $mdDialog.hide(param);
  }

  function hideDialog() {
    $mdDialog.cancel();
  }
}
