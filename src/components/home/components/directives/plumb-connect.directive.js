export default function plumbConnect(jsPlumbService) {
  'ngInject';
  return {
    replace: true,
    link: function (scope, element, attrs) {
      jsPlumbService.getJsplumbInstance().makeSource(element, {
        // parent: $('#container'),
        paintStyle: {
          strokeStyle: "#225588",
          fillStyle: "transparent",
          radius: 7,
          lineWidth: 2
        },
      });

      if (scope.module.sourceId) {
        $(element).attr('id', scope.module.sourceId);
      } else {
        scope.module.sourceId = $(element).attr('id');
      }
    }
  };
}
