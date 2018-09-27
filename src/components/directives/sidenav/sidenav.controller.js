export default function sidenavController(jsplubService, stateParamsService) {
  const vm = this;
  vm.library = stateParamsService.getLibrary();
  vm.isSindenavVisible = true;


}
