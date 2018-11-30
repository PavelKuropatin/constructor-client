export default function stateObjectService(uuidService, CONSTANTS) {
  'ngInject';

  const DEFAULT_POSITION_X = 10;
  const DEFAULT_POSITION_Y = 10;
  const DEFAULT_NAME = 'New State';
  const DEFAULT_INPUT_CONTAINER = [
    {
      label: 'v1',
      value: undefined
    },
    {
      label: 'v2',
      value: undefined
    },
    {
      label: 'v3',
      value: undefined
    },
  ];
  const DEFAULT_OUTPUT_CONTAINER = [
    {
      label: 'v4',
      value: undefined
    },
    {
      label: 'v5',
      value: undefined
    },
    {
      label: 'v6',
      value: undefined
    },
  ];

  var configState;

  const getNewState = (stateObjects) => {
    stateObjects.push({
      name: DEFAULT_NAME,
      template: CONSTANTS.PARTIALS.ACTION,
      color: CONSTANTS.TYPE_ACTION.MAIN.color,
      outputContainer: DEFAULT_OUTPUT_CONTAINER,
      inputContainer: DEFAULT_INPUT_CONTAINER,
      endpointStyle: {
        targetEndpoint: CONSTANTS.ENDPOINT_STYLE.ACTION.LEFT,
        sourceEndpoint: CONSTANTS.ENDPOINT_STYLE.ACTION.RIGHT,
        targetAnchor:  CONSTANTS.ANCHOR.LEFT_MIDDLE,
        sourceAnchor: CONSTANTS.ANCHOR.RIGHT_MIDDLE
      },
      sources: [
        {uuid: uuidService.getNextUUID()},
        {uuid: uuidService.getNextUUID()},
      ],
      targets: [
        {uuid: uuidService.getNextUUID()},
        {uuid: uuidService.getNextUUID()}
      ],
      x: DEFAULT_POSITION_X,
      y: DEFAULT_POSITION_Y
    });
  };

  const removeState = (stateObjects, state) => {
    const index = stateObjects.indexOf(state);
    if (index !== -1) {
      stateObjects.splice(index, 1);
    }
  };

  const removeIndex = (index, object) => {
    object.splice(index, 1);
  };

  const setConfigState =  (state) => {
    configState = state;
  };

  const getConfigState = () => {
    return configState;
  };

  return {
    getNewState: getNewState,
    removeState: removeState,
    removeIndex: removeIndex,
    setConfigState: setConfigState,
    getConfigState: getConfigState
  };
}

