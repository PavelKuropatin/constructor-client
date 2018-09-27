export default function stateParamsService(moduleService) {
  const vm = this;

  vm.library = [];
  // library_uuid is a unique identifier per module type in the library
  vm.library_uuid = 0;
  // state is [identifier, x position, y position, title, description]
  vm.schema = [];
  // schema_uuid should always yield a unique identifier, can never be decreased
  vm.schema_uuid = 0;

  vm.getLibrary = () => {
    return vm.library;
  };

  vm.setLibrary = (library) => {
    vm.library = library;
  };

  vm.getSchema = () => {
    return vm.schema;
  };

  vm.setSchema = (schema) => {
    vm.schema = schema;
  };

  vm.addModuleToLibrary = (title, description, posX, posY) => {
    const library_id = vm.library_uuid++;
    const schema_id = -1;
    const m = moduleService.createModule(library_id, schema_id, title, description, posX, posY);
    vm.library.push(m);
  };

  vm.addModuleToSchema = (library_id, posX, posY) => {
    const schema_id = vm.schema_uuid++;
    let title;
    let description;
    _.forEach(vm.library, (module) => {
      if (module.library_id === library_id) {
        title = module.title;
        description = module.description;
      }
    });
    vm.schema.push(moduleService.createModule(library_id, schema_id, title, description, posX, posY));
  };

  function init() {
    let library_topleft = {
      x: 15,
      y: 145,
      item_height: 50,
      margin: 5,
    };
    let module_css = {
      width: 150,
      height: 100, // actually variable
    };
    vm.addModuleToLibrary("Sum", "Aggregates an incoming sequences of values and returns the sum",
      library_topleft.x + library_topleft.margin,
      library_topleft.y + library_topleft.margin);
    vm.addModuleToLibrary("Camera", "Hooks up to hardware camera and sends out an image at 20 Hz",
      library_topleft.x + library_topleft.margin,
      library_topleft.y + library_topleft.margin + library_topleft.item_height);
  }
  init();
}