export default function jsPlumbStyleService() {
  const targetEndpointStyle = {
    endpoint: "Dot",
    paintStyle: {fill: "#BCAAA4"},
    maxConnections: -1,
    isTarget: true
  };

  const sourceEndpointStyle = {
    endpoint: "Dot",
    paintStyle: {
      stroke: "#BCAAA4",
      fill: "transparent",
      strokeWidth: 3
    },
    isSource: true,
    maxConnections: -1,
    connector: ["Flowchart", {stub: [30, 30], gap: 20, cornerRadius: 10, alwaysRespectStubs: true}],
    connectorStyle: {
      strokeWidth: 6,
      stroke: "#61B7CF"
    },
    connectorHoverStyle: {
      stroke: "#216477"
    }
  };

  const getTargetEndpointStyle = () => {
    return targetEndpointStyle;
  };

  const getSourceEndpointStyle = () => {
    return sourceEndpointStyle;
  };

  return {
    getTargetEndpointStyle: getTargetEndpointStyle,
    getSourceEndpointStyle: getSourceEndpointStyle
  };
}

