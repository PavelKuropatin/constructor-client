export default function homeController(jsplubService, stateParamsService) {
  'ngInject';
  const vm = this;
  vm.jsPlumbInstance = jsplubService.getJsplumbInstance();
  vm.library = stateParamsService.getLibrary();
  vm.schema = stateParamsService.getSchema();

  vm.$onInit = () => {
    vm.init();
  };


  vm.redraw = () => {
    // vm.schema_uuid = 0;
    // // vm.jsPlumbInstance.detachEveryConnection();
    // vm.schema = [];
    // vm.library = [];
    // stateParamsService.addModuleToLibrary("Sum", "Aggregates an incoming sequences of values and returns the sum",
    //   vm.library_topleft.x + vm.library_topleft.margin,
    //   vm.library_topleft.y + vm.library_topleft.margin);
    // stateParamsService.addModuleToLibrary("Camera", "Hooks up to hardware camera and sends out an image at 20 Hz",
    //   vm.library_topleft.x + vm.library_topleft.margin,
    //   vm.library_topleft.y + vm.library_topleft.margin + vm.library_topleft.item_height);
  };

  vm.removeState = (schema_id) => {
    // for (let i = 0; i < vm.schema.length; i++) {
    //   // compare in non-strict manner
    //   if (vm.schema[i].schema_id === schema_id) {
    //     vm.schema.splice(i, 1);
    //   }
    // }
  };

  vm.init = () => {
  };
}