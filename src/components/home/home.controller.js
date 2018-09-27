export default function homeController(jsplubService, stateParamsService) {
  'ngInject';
  const vm = this;
  vm.jsPlumbInstance = jsplubService.getJsplumbInstance();
  vm.library = stateParamsService.getLibrary();
  vm.schema = stateParamsService.getSchema();

  vm.$onInit = () => {
  };
}
