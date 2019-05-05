const math = require('mathjs');

export default function stateObjectService($rootScope, stateObjectHttpService, CONSTANTS) {
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

  const updateContainer = (modules, sourceUuid, targetUuid) => {
    findTargetState(modules, targetUuid).inputContainer = findSourceState(modules, sourceUuid).outputContainer;
  };

  const countFunction = (state) => {
    _.forEach(state.outputContainer, container => {
      let bufFunction = _.clone(container.stringFunction);
      _.forEach(state.inputContainer, item => {
        bufFunction = _.replace(bufFunction, new RegExp(item.label,'g'), item.value);
      });
      try {
        container.value = math.eval(bufFunction);
      } catch (err) {}
    });
  };

  function findSourceState(modules, sourceUuid) {
    return _.find(modules, state => {
      return state.sources[0].uuid == sourceUuid;
    });
  }

  function findTargetState(modules, targetUuid) {
    return _.find(modules, state => {
      return state.targets[0].uuid == targetUuid;
    });
  }

  return {
    createState: createState,
    deleteState: deleteState,
    removeIndex: removeIndex,
    setConfigState: setConfigState,
    getConfigState: getConfigState,
    addContainer: addContainer,
    updateContainer: updateContainer,
    deleteDiagram: deleteDiagram,
    countFunction: countFunction
  };
}

