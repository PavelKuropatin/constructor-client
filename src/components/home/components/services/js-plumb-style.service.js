export default function jsPlumbStyleService (CONSTANTS) {
  'ngInject';

  const outputEndpointStyle1 = {
    endpoint: 'Rectangle',
    paintStyle: {
      fill: '#BCAAA4',
      width: 10,
      height: 100
    },
    maxConnections: -1,
    isTarget: true
  };

  const outputEndpointStyle2 = {
    endpoint: 'Rectangle',
    paintStyle: {
      fill: '#BCAAA4',
      width: 100,
      height: 10
    },
    maxConnections: -1,
    isTarget: true
  };
  const inputEndpointStyle1 = {
    endpoint: 'Rectangle',
    paintStyle: {
      stroke: '#BCAAA4',
      fill: 'transparent',
      strokeWidth: 3,
      width: 10,
      height: 100
    },
    isSource: true,
    maxConnections: -1,
    connector: ['Flowchart', { stub: [30, 30], gap: 20, cornerRadius: 10, alwaysRespectStubs: true }],
    connectorStyle: {
      strokeWidth: 6,
      stroke: '#61B7CF'
    },
    connectorHoverStyle: {
      stroke: '#216477'
    }
  };
  const inputEndpointStyle2 = {
    endpoint: 'Rectangle',
    paintStyle: {
      stroke: '#BCAAA4',
      fill: 'transparent',
      strokeWidth: 3,
      width: 100,
      height: 10
    },
    isSource: true,
    maxConnections: -1,
    connector: ['Flowchart', { stub: [30, 30], gap: 20, cornerRadius: 10, alwaysRespectStubs: true }],
    connectorStyle: {
      strokeWidth: 6,
      stroke: '#61B7CF'
    },
    connectorHoverStyle: {
      stroke: '#216477'
    }
  };

  const getOutputEndpointStyle1 = () => outputEndpointStyle1;
  const getOutputEndpointStyle2 = () => outputEndpointStyle2;

  const getInputEndpointStyle1 = () => inputEndpointStyle1;
  const getInputEndpointStyle2 = () => inputEndpointStyle2;

  return {
    getOutputEndpointStyle1: getOutputEndpointStyle1,
    getOutputEndpointStyle2: getOutputEndpointStyle2,
    getInputEndpointStyle1: getInputEndpointStyle1,
    getInputEndpointStyle2: getInputEndpointStyle2
  };
}

