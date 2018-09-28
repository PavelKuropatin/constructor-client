export default function jsPlumbService() {
  'ngInject';
  const vm = this;
  vm.jsPlumbInstance = jsPlumb.getInstance({
    Container: $('#container'),
    Connector : "Flowchart",
    PaintStyle: {
      strokeWidth: 3,
      stroke: 'rgba(200,0,0,100)'
    },
    DragOptions: {cursor: "crosshair"},
    Endpoints: [["Dot", {radius: 7}], ["Dot", {radius: 11}]],
    EndpointStyles: [
      {fill: "#225588"},
      {fill: "#558822"}
    ]
  });

  vm.getJsplumbInstance = () => {
    vm.jsPlumbInstance.setContainer($('#container'));
    return vm.jsPlumbInstance;
  };
}
