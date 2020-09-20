export default function deleteVarController ($mdDialog, vars) {
  'ngInject';
  let vm = this;

  vm.vars = vars;
  vm.closeDialog = closeDialog;
  vm.deleteVar = deleteVar;

  function deleteVar (param) {
    $mdDialog.hide(param);
  }

  function closeDialog () {
    $mdDialog.cancel();
  }
}
