export default function stateObjectHttpService($http, env) {
  const STATE_OBJECT_URL = '/api/schema/1';

  const saveAllStateObject = function (stateObjects) {
    restructureBeforeSending(stateObjects);
    return $http({
      method: 'POST',
      url: env.api + STATE_OBJECT_URL,
      data: stateObjects
    });
  };

  const getAllStateObject = function () {
    $http.get(env.api + STATE_OBJECT_URL).then(
      (response) => {
        return restructureFromGetting(response.data);
      });
  };

  const restructureFromGetting = (schema) => {
      _.forEach(schema.modules, (m) => {
          m.sources = m.sources.map(s => {
            let connections = m.connections ? m.connections
              .filter(c => c.source == s.uuid)
              .map(c => {
                return {
                  uuid: c.target,
                  type: c.type,
                  mouseover: c.mouseover
                };
              }) : [];
            return {
              uuid: s.uuid,
              connections: connections
            };
          });
          m.connections = null; // remove reference on array items before deleting
          delete m.connections;
        }
      );
      return schema;
    }
  ;


  const restructureBeforeSending = (schema) => {
    _.forEach(schema.modules, (m) => {
      let sources = m.sources.map(c => {
        return {uuid: c.uuid};
      });
      let connections = m.sources
        .filter(s => s.connections || s.connections.length !== 0)
        .map(s => {
          if (s.connections) {
            return s.connections.map(c => {
              return {
                source: s.uuid,
                target: c.uuid,
                type: c.type,
                mouseover: c.mouseover
              };
            });
          }
        })
        .reduce((prev, cur) => prev.concat(cur), []);
      m.sources = sources;
      m.connections = connections;
    });
    return schema;
  };


  return {
    getAllStateObject: getAllStateObject,
    saveAllStateObject: saveAllStateObject
  };
}

