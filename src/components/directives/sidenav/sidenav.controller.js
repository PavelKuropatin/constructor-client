export default function sidenavController(jsPlumbService, stateParamsService) {
  'ngInject';
  const vm = this;
  vm.library = stateParamsService.getLibrary();
  vm.isSindenavVisible = true;


}
