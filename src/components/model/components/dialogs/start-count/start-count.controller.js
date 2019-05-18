export default function startCountController($mdDialog) {
  "ngInject";
  let vm = this;

  vm.hideDialog = hideDialog;
  vm.chooseDiagram = chooseDiagram;

  vm.countModel = {
    startValue: 0,
    stepValue: 2,
    interval: 1000,
    valueName: 'x'
  };

  function chooseDiagram() {
    $mdDialog.hide(vm.countModel);
  }

  function hideDialog() {
    $mdDialog.cancel();
  }
}
