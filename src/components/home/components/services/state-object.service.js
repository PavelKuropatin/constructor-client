const math = require('mathjs');

export default function stateObjectService ($rootScope, stateObjectHttpService, CONSTANTS) {
  'ngInject';

  var configState;

  const createState = (diagramUuid, stateObjects) => {
    stateObjectHttpService.createState(diagramUuid).then(response => {
      stateObjects.push(response.data);
    });
  };

  const deleteState = (diagramUuid, stateObjects, state) => {
    stateObjectHttpService.deleteState(diagramUuid, state.uuid).then(response => {
      if (response.status === 202) {
        const index = stateObjects.indexOf(state);
        if (index !== -1) {
          stateObjects.splice(index, 1);
        }
      }
    });
  };

  const deleteDiagram = (diagram) => {
    stateObjectHttpService.deleteDiagram(diagram.uuid).then(response => {
      if (response.status === 202) {
        $rootScope.$broadcast(CONSTANTS.EVENT_CONSTANTS.SUCCESS_DIAGRAM_DELETE);
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

  const deleteContainer = (state, type, param) => {
    stateObjectHttpService.deleteContainer(state.uuid, type, param).then(response => {
      state.inputContainer = response.data.inputContainer;
      state.outputContainer = response.data.outputContainer;
    });
  };

  const updateContainer = (states, sourceUuid, targetUuid) => {
    let inputContainer = findTargetState(states, targetUuid).inputContainer;
    _.forEach(findSourceState(states, sourceUuid).outputContainer, (oVar) => {
      let _var = _.find(inputContainer, (iVar) => iVar.label === oVar.label);
      if (_var) {
        _var.value = oVar.value;
      } else {
        inputContainer.push({
          label: oVar.label,
          value: oVar.value
        });
      }
    });
  };

  function getParentStates (states, targetUuid) {
    return _.filter(states, (state) => {
        return _.find(state.source.connections, (connection) => {
          return connection.target.uuid === targetUuid;
        });
    });

  }

  function applyParentContainer (parentContainer, childContainer) {
    _.forEach(childContainer, (childVar) => {
      let parentVar = _.find(parentContainer, (parentVar) => parentVar.label === childVar.label);
      if (parentVar) {
        childVar.value = parentVar.value;
      }
    });
  }

  const countFunction = (states, state) => {
    let parentStates = getParentStates(states, state.target.uuid);
    _.forEach(parentStates, (parentState) => {
      applyParentContainer(parentState.outputContainer, state.inputContainer);
    });
    _.forEach(state.outputContainer, container => {
      let bufFunction = _.clone(container.expression);
      _.forEach(state.inputContainer, item => {
        bufFunction = _.replace(bufFunction, new RegExp(item.label, 'g'), item.value);
      });
      try {
        container.value = math.eval(bufFunction);
      } catch (err) {
      }
    });
  };

  function findSourceState (states, sourceUuid) {
    return _.find(states, state => {
      return state.source.uuid == sourceUuid;
    });
  }

  function findTargetState (states, targetUuid) {
    return _.find(states, state => {
      return state.target.uuid == targetUuid;
    });
  }

  return {
    createState: createState,
    deleteState: deleteState,
    removeIndex: removeIndex,
    setConfigState: setConfigState,
    getConfigState: getConfigState,
    addContainer: addContainer,
    deleteContainer: deleteContainer,
    updateContainer: updateContainer,
    deleteDiagram: deleteDiagram,
    countFunction: countFunction
  };
}

