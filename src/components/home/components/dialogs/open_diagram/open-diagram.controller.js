export default function openDiagramController($mdDialog) {
  "ngInject";
  let vm = this;

  vm.hideDialog = hideDialog;
  vm.chooseDiagram = chooseDiagram;
  vm.digrams = ['test1', 'test2'];
  vm.choosenDiagram = _.head(vm.digrams);

  function chooseDiagram() {
    $mdDialog.hide(vm.choosenDiagram);
  }

  function hideDialog() {
    $mdDialog.cancel();
  }


}
