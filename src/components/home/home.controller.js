export default function homeController(jsplubService, moduleService) {
  'ngInject';
  const vm = this;
  vm.jsPlumbInstance = jsplubService.getJsplumbInstance();
  // module should be visualized by title, icon
  vm.library = [];
  // library_uuid is a unique identifier per module type in the library
  vm.library_uuid = 0;
  // state is [identifier, x position, y position, title, description]
  vm.schema = [];
  // schema_uuid should always yield a unique identifier, can never be decreased
  vm.schema_uuid = 0;
  // todo: find out how to go back and forth between css and angular
  vm.library_topleft = {
    x: 15,
    y: 145,
    item_height: 50,
    margin: 5,
  };
  vm.module_css = {
    width: 150,
    height: 100, // actually variable
  };

  vm.$onInit = () => {
    vm.init();
  };


  vm.redraw = () => {
    vm.schema_uuid = 0;
    // vm.jsPlumbInstance.detachEveryConnection();
    vm.schema = [];
    vm.library = [];
    vm.addModuleToLibrary("Sum", "Aggregates an incoming sequences of values and returns the sum",
      vm.library_topleft.x + vm.library_topleft.margin,
      vm.library_topleft.y + vm.library_topleft.margin);
    vm.addModuleToLibrary("Camera", "Hooks up to hardware camera and sends out an image at 20 Hz",
      vm.library_topleft.x + vm.library_topleft.margin,
      vm.library_topleft.y + vm.library_topleft.margin + vm.library_topleft.item_height);
  };

  // add a module to the library
  vm.addModuleToLibrary = (title, description, posX, posY) => {
    let library_id = vm.library_uuid++;
    let schema_id = -1;
    let m = moduleService.createModule(library_id, schema_id, title, description, posX, posY);
    vm.library.push(m);
  };

  // add a module to the schema
  vm.addModuleToSchema = (library_id, posX, posY) => {
    let schema_id = vm.schema_uuid++;
    let title = "Unknown";
    let description = "Likewise unknown";
    for (let i = 0; i < vm.library.length; i++) {
      if (vm.library[i].library_id === library_id) {
        title = vm.library[i].title;
        description = vm.library[i].description;
      }
    }
    let m = moduleService.createModule(library_id, schema_id, title, description, posX, posY);
    vm.schema.push(m);
  };

  vm.removeState = (schema_id) => {
    for (let i = 0; i < vm.schema.length; i++) {
      // compare in non-strict manner
      if (vm.schema[i].schema_id === schema_id) {
        vm.schema.splice(i, 1);
      }
    }
  };

  vm.init = () => {
  };

  window.setZoom = function(zoom, instance, transformOrigin, el) {
    transformOrigin = transformOrigin || [ 0.5, 0.5 ];
    instance = instance || jsPlumb;
    el = el || instance.getContainer();
    let p = [ "webkit", "moz", "ms", "o" ],
      s = "scale(" + zoom + ")",
      oString = (transformOrigin[0] * 100) + "% " + (transformOrigin[1] * 100) + "%";

    for (let i = 0; i < p.length; i++) {
      el.style[p[i] + "Transform"] = s;
      el.style[p[i] + "TransformOrigin"] = oString;
    }

    el.style["transform"] = s;
    el.style["transformOrigin"] = oString;

    instance.setZoom(zoom);
  };

  window.setZoom(0.7, vm.jsPlumbInstance);
}
