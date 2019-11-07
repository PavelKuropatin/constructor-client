import './open-diagram.scss';

export default function openDiagramController ($mdDialog, stateObjectHttpService) {
  'ngInject';
  let vm = this;
  vm.chosenUuid = null;

  vm.diagrams = [];

  vm.$onInit = () => {
    stateObjectHttpService.getDiagramsMeta()
      .then((response) => {
        vm.diagrams = response.data;
        if (_.head(vm.diagrams)) {
          vm.chosenUuid = _.head(vm.diagrams).uuid;
        }
      });
  };

  vm.deleteDiagram = (uuid) => {
    stateObjectHttpService.deleteDiagram(uuid)
      .then((response) => {
        vm.$onInit();
      });
  };

  vm.setDiagramToLoad = (uuid) => {
    vm.chosenUuid = uuid;
  };

  vm.chooseDiagram = () => {
    $mdDialog.hide(vm.chosenUuid);
  };

  vm.hideDialog = () => {
    $mdDialog.cancel();
  };

}
