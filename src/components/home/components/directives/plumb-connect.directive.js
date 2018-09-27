export default function plumbConnect(jsplubService) {
  return {
    replace: true,
    link: function (scope, element, attrs) {
      scope.home.jsPlumbInstance.makeSource(element, {
        parent: $('#container'),
        paintStyle: {
          strokeStyle: "#225588",
          fillStyle: "transparent",
          radius: 7,
          lineWidth: 2
        },
      });
    }
  };
}
