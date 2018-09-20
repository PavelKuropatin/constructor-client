export default function jsplubService() {
  this.getJsplumbInstance = () => {
    return jsPlumb.getInstance({
      Container: $('#container'),
      Connector : "Flowchart",
      PaintStyle: {
        strokeWidth: 13,
        stroke: 'rgba(200,0,0,100)'
      },
      DragOptions: {cursor: "crosshair"},
      Endpoints: [["Dot", {radius: 7}], ["Dot", {radius: 11}]],
      EndpointStyles: [
        {fill: "#225588"},
        {fill: "#558822"}
      ]
    });
  };
}
