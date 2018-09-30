export default function stateParamsService(moduleService, jsPlumbService) {
  'ngInject';
  const vm = this;
//todo create  sources = []
//todo create  targets = []
//todo delete schema = []

  vm.library = [];
  // library_uuid is a unique identifier per module type in the library
  // state is [identifier, x position, y position, title, description]
  vm.schema = [];
  // schema_uuid should always yield a unique identifier, can never be decreased
  vm.connections = [];

  vm.getLibrary = () => {
    return vm.library;
  };

  vm.setLibrary = (library) => {
    vm.library = library;
  };

  vm.getSchema = () => {
    return vm.schema;
  };

  vm.setNewSourceId = (oldSourceId, newSourceId) => {
    vm.schema[_.findIndex(vm.schema, {'sourceId': oldSourceId})].sourceId = newSourceId;
  };

  vm.setNewTargetId = (oldTargetId, newTargetId) => {
    vm.schema[_.findIndex(vm.schema, {'targetId': oldTargetId})].targetId = newTargetId;
  };

  vm.setSchema = (schema) => {
    vm.schema = schema;
  };

  vm.addModuleToLibrary = (libraryId, title, description) => {
    vm.library.push(moduleService.createLibraryModule(libraryId, title, description));
  };

  vm.addModuleToSchema = (libraryId, targetId, sourceId,  posX, posY, title, description) => {
    _.forEach(vm.library, (module) => {
      if (module.libraryId === libraryId) {
        title = module.title;
        description = module.description;
      }
    });
    vm.schema.push(moduleService.createSchemaModule(libraryId, targetId, sourceId, title, description, posX, posY));
  };

  jsPlumbService.getJsplumbInstance().bind("connection", (info) => {
    vm.connections.push(moduleService.createConnection(info.connection.id, info.sourceId, info.targetId));
  });

  // jsPlumbService.getJsplumbInstance().bind("beforeDrop", (info) => {
  //   // console.log(info);
  //   // vm.connections.push(moduleService.createConnection(info.connection.id, info.sourceId, info.targetId));
  // });
}
