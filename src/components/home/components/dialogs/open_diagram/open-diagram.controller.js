export default function openDiagramController($mdDialog, stateObjectHttpService) {
  "ngInject";
  let vm = this;

  vm.hideDialog = hideDialog;
  vm.chooseDiagram = chooseDiagram;
  vm.diagrams = [];

  vm.$onInit = function () {
    stateObjectHttpService.getAllDiagramInfo()
      .then((response) => {
        vm.choosenDiagram = _.head(response.data);
        vm.diagrams = response.data;
      });
  };

  function chooseDiagram() {
    $mdDialog.hide(vm.choosenDiagram);
  }

  function hideDialog() {
    $mdDialog.cancel();
  }


}
