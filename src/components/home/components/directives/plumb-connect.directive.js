export default function plumbConnect() {
  return {
    replace: true,
    link: function (scope, element, attrs) {
      jsPlumb.getInstance().makeSource(element, {
        parent: element.parent(),
				anchor: 'Continuous',
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
