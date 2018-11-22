export default function jsPlumbStyleService() {
  'ngInject';

  const targetEndpointStyle = {
    endpoint: "Rectangle",
    paintStyle: {
      fill: "#BCAAA4",
      width: 10,
      height: 100,
    },
    maxConnections: -1,
    isTarget: true
  };

  const sourceEndpointStyle = {
    endpoint: "Rectangle",
    paintStyle: {
      stroke: "#BCAAA4",
      fill: "transparent",
      strokeWidth: 3,
      width: 10,
      height: 100,
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

