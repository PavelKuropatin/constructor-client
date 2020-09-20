export default function blockObjectHttpService ($http, env) {
  'ngInject';

  const DEFAULT_SCHEMA_URL = '/api/schema';
  const DEFAULT_BLOCK_URL = '/api/block';
  const DEFAULT_SETTINGS_URL = '/api/settings';

  const deleteBlock = (uuidSchema, uuidBlock) => {
    return $http.delete(env.api + DEFAULT_SCHEMA_URL + '/' + uuidSchema + '/block/' + uuidBlock);
  };

  const createBlock = (uuidSchema) => {
    return $http.post(env.api + DEFAULT_SCHEMA_URL + '/' + uuidSchema + '/block');
  };

  const getSchemasMeta = () => {
    return $http.get(env.api + DEFAULT_SCHEMA_URL);
  };

  const saveSchema = (schema) => {
    return $http.post(env.api + DEFAULT_SCHEMA_URL,
      {
        blocks: schema.blocks,
        name: schema.name,
        description: schema.description
      });
  };

  const updateSchema = (schema) => {
    return $http.put(env.api + DEFAULT_SCHEMA_URL + '/' + schema.uuid, schema);
  };

  const getSchema = (uuid) => {
    return $http.get(env.api + DEFAULT_SCHEMA_URL + '/' + uuid);
  };

  const createNewSchema = () => {
    return $http.post(env.api + DEFAULT_SCHEMA_URL + '/new');
  };

  const putNewContainer = (blockUuid, type, param, value) => {
    return $http.post(env.api + DEFAULT_BLOCK_URL + '/' + blockUuid + '/vars/create', {
      type: type,
      param: param,
      value: value
    });
  };

  const deleteContainer = (blockUuid, type, param) => {
    return $http.post(env.api + DEFAULT_BLOCK_URL + '/' + blockUuid + '/vars/delete', {
      type: type,
      param: param,
      value: 0
    });
  };

  const deleteSchema = (uuidSchema) => {
    return $http.delete(env.api + DEFAULT_SCHEMA_URL + '/' + uuidSchema);
  };

  const saveSettings = (blockUuid, blockSettings) => {
    return $http.post(env.api + DEFAULT_SETTINGS_URL + '/' + blockUuid, blockSettings);
  };

  const deleteSettingsAction = (blockUuid, actionUuid) => {
    return $http.delete(env.api + DEFAULT_SETTINGS_URL + '/' + blockUuid + '/action/' + actionUuid);
  };

  const getBlockSettings = (blockUuid) => {
    return $http.get(env.api + DEFAULT_SETTINGS_URL + '/' + blockUuid);
  };

  const addSettingsAction = (blockUuid) => {
    return $http.post(env.api + DEFAULT_SETTINGS_URL + '/' + blockUuid + '/action', {
      condition: 'true',
      type: 'none'
    });
  };

  const saveHistory = (schema) => {
    return $http.post(env.api + '/api/history', {
      schemaUuid: schema.uuid,
      json: JSON.stringify(schema)
    });
  };

  return {
    createNewSchema: createNewSchema,
    getSchema: getSchema,
    saveSchema: saveSchema,
    getSchemasMeta: getSchemasMeta,
    createBlock: createBlock,
    deleteBlock: deleteBlock,
    updateSchema: updateSchema,
    putNewContainer: putNewContainer,
    deleteContainer: deleteContainer,
    deleteSchema: deleteSchema,
    saveSettings: saveSettings,
    deleteSettingsAction: deleteSettingsAction,
    getBlockSettings: getBlockSettings,
    addSettingsAction: addSettingsAction,
    saveHistory: saveHistory
  };
}

