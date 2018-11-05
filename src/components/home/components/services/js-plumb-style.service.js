export default function jsPlumbStyleService() {
  const targetEndpointStyle = {
    endpoint: "Dot",
    paintStyle: {fill: "#7AB02C", radius: 11},
    maxConnections: -1,
    isTarget: true
  };

  const sourceEndpointStyle = {
    endpoint: "Dot",
    paintStyle: {
      stroke: "#7AB02C",
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

