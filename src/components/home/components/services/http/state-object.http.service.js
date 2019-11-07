export default function stateObjectHttpService ($http, env) {
  'ngInject';

  const DEFAULT_DIAGRAM_URL = '/api/diagram';
  const DEFAULT_STATE_URL = '/api/state';

  const deleteState = (uuidDiagram, uuidState) => {
    return $http.delete(env.api + DEFAULT_DIAGRAM_URL + '/' + uuidDiagram + '/state/' + uuidState);
  };

  const createState = (uuidDiagram) => {
    return $http.post(env.api + DEFAULT_DIAGRAM_URL + '/' + uuidDiagram + '/state');
  };

  const getDiagramsMeta = () => {
    return $http.get(env.api + DEFAULT_DIAGRAM_URL);
  };

  const saveDiagram = (diagram) => {
    return $http.post(env.api + DEFAULT_DIAGRAM_URL,
      {
        states: diagram.states,
        name: diagram.name,
        description: diagram.description
      });
  };

  const updateDiagram = (diagram) => {
    return $http.post(env.api + DEFAULT_DIAGRAM_URL, diagram);
  };

  const getDiagram = (uuid) => {
    return $http.get(env.api + DEFAULT_DIAGRAM_URL + '/' + uuid);
  };

  const createNewDiagram = () => {
    return $http.post(env.api + DEFAULT_DIAGRAM_URL + '/new');
  };

  const putNewContainer = (stateUuid, type, param, value) => {
    return $http.post(env.api + DEFAULT_STATE_URL + '/' + stateUuid + '/container/create', {
      type: type,
      param: param,
      value: value
    });
  };

  const deleteContainer = (stateUuid, type, param) => {
    return $http.post(env.api + DEFAULT_STATE_URL + '/' + stateUuid + '/container/delete', {
      type: type,
      param: param,
      value: 0
    });
  };

  const deleteDiagram = (uuidDiagram) => {
    return $http.delete(env.api + DEFAULT_DIAGRAM_URL + '/' + uuidDiagram);
  };

  return {
    createNewDiagram: createNewDiagram,
    getDiagram: getDiagram,
    saveDiagram: saveDiagram,
    getDiagramsMeta: getDiagramsMeta,
    createState: createState,
    deleteState: deleteState,
    updateDiagram: updateDiagram,
    putNewContainer: putNewContainer,
    deleteContainer: deleteContainer,
    deleteDiagram: deleteDiagram
  };
}

