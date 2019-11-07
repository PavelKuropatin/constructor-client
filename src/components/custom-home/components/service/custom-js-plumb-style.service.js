export default function customJsPlumbStyleService (CONSTANTS) {
  'ngInject'

  const targetEndpointStyle1 = {
    endpoint: 'Rectangle',
    paintStyle: {
      fill: '#BCAAA4',
      width: 10,
      height: 20,
    },
    enabled: false,
    maxConnections: -1,
    isTarget: true
  }

  const targetEndpointStyle2 = {
    endpoint: 'Rectangle',
    paintStyle: {
      fill: '#BCAAA4',
      width: 20,
      height: 10,
    },
    enabled: false,
    maxConnections: -1,
    isTarget: true
  }

  const sourceEndpointStyle1 = {
    endpoint: 'Rectangle',
    paintStyle: {
      stroke: '#BCAAA4',
      fill: 'transparent',
      strokeWidth: 3,
      width: 10,
      height: 20,
    },
    isSource: true,
    enabled: false,
    maxConnections: -1,
    connector: ['Flowchart', { stub: [30, 30], gap: 20, cornerRadius: 10, alwaysRespectStubs: true }],
    connectorStyle: {
      strokeWidth: 6,
      stroke: '#61B7CF'
    },
    connectorHoverStyle: {
      stroke: '#216477'
    }
  }

  const sourceEndpointStyle2 = {
    endpoint: 'Rectangle',
    paintStyle: {
      stroke: '#BCAAA4',
      fill: 'transparent',
      strokeWidth: 3,
      width: 20,
      height: 10,
    },
    isSource: true,
    enabled: false,
    maxConnections: -1,
    connector: ['Flowchart', { stub: [30, 30], gap: 20, cornerRadius: 10, alwaysRespectStubs: true }],
    connectorStyle: {
      strokeWidth: 6,
      stroke: '#61B7CF'
    },
    connectorHoverStyle: {
      stroke: '#216477'
    }
  }

  const getTargetEndpointStyle1 = () => targetEndpointStyle1
  const getTargetEndpointStyle2 = () => targetEndpointStyle2

  const getSourceEndpointStyle1 = () => sourceEndpointStyle1
  const getSourceEndpointStyle2 = () => sourceEndpointStyle2

  return {
    getTargetEndpointStyle1: getTargetEndpointStyle1,
    getTargetEndpointStyle2: getTargetEndpointStyle2,
    getSourceEndpointStyle2: getSourceEndpointStyle2,
    getSourceEndpointStyle1: getSourceEndpointStyle1
  }
}

