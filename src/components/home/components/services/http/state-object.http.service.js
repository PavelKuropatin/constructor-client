export default function stateObjectHttpService($http, env) {
  'ngInject';

  const DEFAULT_DIAGRAM_URL = '/api/diagram';

  const getAllDiagramInfo = () => {
    return $http.get(env.api + DEFAULT_DIAGRAM_URL);
  };

  const saveDiagram = (diagram) => {
    return $http({
      method: 'POST',
      url: env.api + DEFAULT_DIAGRAM_URL,
      data: {
        modules: diagram.modules,
        name: diagram.name,
        description: diagram.description
      }
    });
  };

  const getAllStateObject = (diagram) => {
    return $http.get(env.api + DEFAULT_DIAGRAM_URL + '/' + diagram.uuid);
  };

  return {
    getAllStateObject: getAllStateObject,
    saveDiagram: saveDiagram,
    getAllDiagramInfo: getAllDiagramInfo
  };
}

