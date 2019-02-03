export default function stateObjectHttpService($http, env) {
  'ngInject';

  const DEFAULT_DIAGRAM_URL = '/api/diagram';
  const DEFAULT_PROVIDER_DIAGRAM_URL = '/api/provider';

  const deleteState = (uuidDiagram, uuidState) => {
    return $http.delete(env.api + DEFAULT_PROVIDER_DIAGRAM_URL + '/diagram/' + uuidDiagram + '/state/' + uuidState);
  };

  const createState = (uuidDiagram) => {
    return $http.post(env.api + DEFAULT_PROVIDER_DIAGRAM_URL + '/diagram/' + uuidDiagram + '/state');
  };

  const getAllDiagramInfo = () => {
    return $http.get(env.api + DEFAULT_DIAGRAM_URL);
  };

  const saveDiagram = (diagram) => {
    return $http.post(env.api + DEFAULT_DIAGRAM_URL,
      {
        modules: diagram.modules,
        name: diagram.name,
        description: diagram.description
      });
  };

  const updateDiagram = (diagram) => {
    return $http.put(env.api + DEFAULT_DIAGRAM_URL + '/' + diagram.uuid, diagram);
  };

  const getAllStateObject = (diagram) => {
    return $http.get(env.api + DEFAULT_DIAGRAM_URL + '/' + diagram.uuid);
  };

  const createNewDiagram = () => {
    return $http.post(env.api + DEFAULT_PROVIDER_DIAGRAM_URL + '/diagram');
  };

  return {
    createNewDiagram: createNewDiagram,
    getAllStateObject: getAllStateObject,
    saveDiagram: saveDiagram,
    getAllDiagramInfo: getAllDiagramInfo,
    createState: createState,
    deleteState: deleteState,
    updateDiagram: updateDiagram
  };
}

