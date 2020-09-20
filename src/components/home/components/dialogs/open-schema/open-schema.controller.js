import './open-schema.scss';

export default function openSchemaController ($mdDialog, blockObjectHttpService) {
  'ngInject';
  let vm = this;
  vm.chosenUuid = null;

  vm.schemas = [];

  vm.$onInit = () => {
    blockObjectHttpService.getSchemasMeta()
      .then((response) => {
        vm.schemas = response.data;
        if (_.head(vm.schemas)) {
          vm.chosenUuid = _.head(vm.schemas).uuid;
        }
      });
  };

  vm.deleteSchema = (uuid) => {
    blockObjectHttpService.deleteSchema(uuid)
      .then((response) => {
        vm.$onInit();
      });
  };

  vm.setSchemaToLoad = (uuid) => {
    vm.chosenUuid = uuid;
  };

  vm.chooseSchema = () => {
    $mdDialog.hide(vm.chosenUuid);
  };

  vm.closeDialog = () => {
    $mdDialog.cancel();
  };

}
