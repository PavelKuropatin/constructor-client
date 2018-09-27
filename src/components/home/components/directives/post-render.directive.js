export default function postRender($timeout, restoreService, stateParamsService) {
  return {
    restrict: 'AE',
    terminal: true,
    transclude: true,
    link: function (scope, element, attrs) {
      _.forEach(restoreService.getLibraryModules(), (module) => {
        stateParamsService.addModuleToLibrary(module.title, module.description, module.x, module.y);
      });

      _.forEach(restoreService.getSchemaModules(), (module) => {
        stateParamsService.addModuleToSchema(module.library_id, module.x, module.y);
      });

      $timeout(() => {
        _.forEach(restoreService.getConnections(), (connection) => {
          scope.home.jsPlumbInstance.connect({
            source: connection.source,
            target: connection.target,
          });
        });
      }, 50);
    }
  };
}
