export default function sidenavController(jsplubService, stateParamsService) {
  'ngInject';
  const vm = this;
  vm.library = stateParamsService.getLibrary();
  vm.isSindenavVisible = true;


}
