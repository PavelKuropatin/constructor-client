export default function restoreService($http) {
  'ngInject';
  //todo use $http service

  //by schemaId for example (schemaId: 0)
  this.getConnections = () => {
    return [
      {
        connectionId: 'con_9',
        target: 'jsPlumb_2_15',
        source: 'jsPlumb_2_12'
      }
    ];
  };

  //by schemaId for example (schemaId: 0)
  this.getLibraryModules = () => {
    return [
      {
        libraryId: 0,
        title: "Test1",
        description: "Some text1",
      },
      {
        libraryId: 1,
        title: "Test2",
        description: "Some text2",
      },
    ];
  };

  //by schemaId for example (schemaId: 0)
  this.getSchemaModules = () => {
    return [
      {
        libraryId: 0,
        targetId: 'jsPlumb_2_13',
        sourceId: 'jsPlumb_2_12',
        title: "test",
        description: "test",
        x: 250,
        y: 200
      },
      {
        libraryId: 1,
        targetId: 'jsPlumb_2_15',
        sourceId: 'jsPlumb_2_14',
        title: "test",
        description: "test",
        x: 350,
        y: 300
      }
    ];
  };
}
