export default function postRender($timeout, restoreService, stateParamsService, jsPlumbService) {
  return {
    restrict: 'AE',
    terminal: true,
    transclude: true,
    link: function (scope, element, attrs) {
      _.forEach(restoreService.getLibraryModules(), (module) => {
        stateParamsService.addModuleToLibrary(module.libraryId, module.title, module.description);
      });

      _.forEach(restoreService.getSchemaModules(), (module) => {
        stateParamsService.addModuleToSchema(module.libraryId, module.targetId, module.sourceId, module.x, module.y, module.title, module.description);
      });
      $timeout(() => {
        _.forEach(restoreService.getConnections(), (connection) => {
          jsPlumbService.getJsplumbInstance().connect({
            source: connection.source,
            target: connection.target,
          }).setParameter("id", connection.connectionId);
        });
      }, 50);
    }
  };
}
