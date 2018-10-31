export default function stateObjectHttpService($http) {
  const STATE_OBJECT_URL = '/schema';

  const getAllStateObject = function () {
    $http.get(STATE_OBJECT_URL).then(
      (response) => {
        return response.data;
      });
  };

  return {
    getAllStateObject: getAllStateObject
  };
}

