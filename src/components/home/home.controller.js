export default function homeController() {
  'ngInject';
  const vm = this;

  function module(library_id, schema_id, title, description, x, y) {
    this.library_id = library_id;
    this.schema_id = schema_id;
    this.title = title;
    this.description = description;
    this.x = x;
    this.y = y;
  }
  vm.$onInit = () => {
    vm.init();
    vm.redraw();
    // let m = new module(1, 1, 'test', 'test', 23, 80);
    // vm.library.push(m);
  };



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

  vm.redraw = function () {
    vm.schema_uuid = 0;
    jsPlumb.detachEveryConnection();
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
  vm.addModuleToLibrary = function (title, description, posX, posY) {
    var library_id = vm.library_uuid++;
    var schema_id = -1;
    var m = new module(library_id, schema_id, title, description, posX, posY);
    vm.library.push(m);
  };

  // add a module to the schema
  vm.addModuleToSchema = function (library_id, posX, posY) {
    var schema_id = vm.schema_uuid++;
    var title = "Unknown";
    var description = "Likewise unknown";
    for (var i = 0; i < vm.library.length; i++) {
      if (vm.library[i].library_id == library_id) {
        title = vm.library[i].title;
        description = vm.library[i].description;
      }
    }
    var m = new module(library_id, schema_id, title, description, posX, posY);
    vm.schema.push(m);
  };

  vm.removeState = function (schema_id) {
    for (var i = 0; i < vm.schema.length; i++) {
      // compare in non-strict manner
      if (vm.schema[i].schema_id == schema_id) {
        vm.schema.splice(i, 1);
      }
    }
  };

  vm.init = function () {
    jsPlumb.bind("ready", function () {
      jsPlumb.bind("connection", function (info) {
        vm.$apply(function () {
        });
      });
    });
  };
}
