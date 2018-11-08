export default function stateObjectService(uuidService, CONSTANTS) {
  const DEFAULT_POSITION_X = 10;
  const DEFAULT_POSITION_Y = 10;
  const DEFAULT_NAME = 'New State';

  const getNewState = (stateObjects) => {
    stateObjects.push({
      'name': DEFAULT_NAME,
      'template': CONSTANTS.PARTIALS.ACTION,
      'color': CONSTANTS.TYPE_ACTION.MAIN.color,
      'sources': [
        {uuid: uuidService.getNextUUID()},
        {uuid: uuidService.getNextUUID()},
      ],
      'targets': [
        {uuid: uuidService.getNextUUID()},
        {uuid: uuidService.getNextUUID()}
      ],
      'x': DEFAULT_POSITION_X,
      'y': DEFAULT_POSITION_Y
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

  return {
    getNewState: getNewState,
    removeState: removeState,
    removeIndex: removeIndex
  };
}

