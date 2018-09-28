export default function homeController(jsPlumbService, stateParamsService) {
  'ngInject';
  const vm = this;
  vm.jsPlumbInstance = jsPlumbService.getJsplumbInstance();
  vm.library = stateParamsService.getLibrary();
  vm.schema = stateParamsService.getSchema();

  vm.$onInit = () => {
  };
}
