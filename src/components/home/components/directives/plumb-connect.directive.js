export default function plumbConnect(jsPlumbService, stateParamsService) {
  'ngInject';
  return {
    replace: true,
    link: function (scope, element, attrs) {
      jsPlumbService.getJsplumbInstance().makeSource(element, {
        parent: $('#container'),
        paintStyle: {
          strokeStyle: "#225588",
          fillStyle: "transparent",
          radius: 7,
          lineWidth: 2
        },
      });
      // $(element).attr('id', scope.module.sourceId);
      stateParamsService.setNewSourceId(scope.module.sourceId, $(element).attr('id'));
    }
  };
}
