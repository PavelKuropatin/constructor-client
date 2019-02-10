export default function stateObjectService(stateObjectHttpService) {
  'ngInject';

  var configState;

  const getNewState = (diagramUuid, stateObjects) => {
    stateObjectHttpService.createState(diagramUuid).then(response => {
      stateObjects.push(response.data);
    });
  };

  const removeState = (diagramUuid, stateObjects, state) => {
    stateObjectHttpService.deleteState(diagramUuid, state.uuid).then(response => {
      if (response.status === 202) {
        const index = stateObjects.indexOf(state);
        if (index !== -1) {
          stateObjects.splice(index, 1);
        }
      }
    });
  };

  const removeIndex = (index, object) => {
    object.splice(index, 1);
  };

  const setConfigState = (state) => {
    configState = state;
  };

  const getConfigState = () => {
    return configState;
  };

  const addContainer = (state, type, param, value) => {
    stateObjectHttpService.putNewContainer(state.uuid, type, param, value).then(response => {
      state.inputContainer = response.data.inputContainer;
      state.outputContainer = response.data.outputContainer;
    });
  };

  return {
    getNewState: getNewState,
    removeState: removeState,
    removeIndex: removeIndex,
    setConfigState: setConfigState,
    getConfigState: getConfigState,
    addContainer: addContainer
  };
}

