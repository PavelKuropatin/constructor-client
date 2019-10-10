import './open-diagram.scss';

export default function openDiagramController($mdDialog, stateObjectHttpService) {
    "ngInject";
    let vm = this;
    vm.chosenUUID = null;

    vm.diagrams = [];
    vm.headers = [{ label : "name", name: "Name" }];

    vm.$onInit = () => {
        stateObjectHttpService.getDiagramsMeta()
            .then((response) => {
                vm.diagrams = response.data;
                if (_.head(vm.diagrams)){
                    vm.chosenUUID = _.head(vm.diagrams).uuid;
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
        vm.chosenUUID = uuid;
    };

    vm.chooseDiagram = () => {
        $mdDialog.hide(vm.chosenUUID);
    };

    vm.hideDialog = () => {
        $mdDialog.cancel();
    };


}
