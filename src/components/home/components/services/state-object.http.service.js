export default function stateObjectHttpService($http, env) {
  'ngInject';

  const STATE_OBJECT_URL = '/api/diagram/1';

  const saveAllStateObject = (stateObjects) => {
    return $http({
      method: 'POST',
      url: env.api + '/api/diagram',
      data: stateObjects
    });
  };

  const getAllStateObject = () => {
    $http.get(env.api + STATE_OBJECT_URL).then(
      (response) => {
        return response.data;
      });
  };

  return {
    getAllStateObject: getAllStateObject,
    saveAllStateObject: saveAllStateObject
  };
}

