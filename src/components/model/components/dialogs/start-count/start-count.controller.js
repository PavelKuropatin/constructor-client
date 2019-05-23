export default function startCountController($mdDialog, countModel) {
  "ngInject";
  let vm = this;

  vm.hideDialog = hideDialog;
  vm.chooseDiagram = chooseDiagram;

  vm.addVar = addVar;
  vm.delVar = delVar;

  if (countModel){
    vm.countModel = countModel;
  } else {
    vm.countModel = {
        interval: 1000,
        vars : [{
            startValue: 0,
            stepValue: 2,
            valueName: 'x'
        }]
    };
  }

  function chooseDiagram() {
    $mdDialog.hide(vm.countModel);
  }

  function hideDialog() {
    $mdDialog.cancel();
  }

  function addVar() {
    vm.countModel.vars.push({
           startValue: 0,
           stepValue: 2,
           valueName: '#'
     });
  }

  function delVar(index) {
      vm.countModel.vars.splice(index, 1);
  }
}
