export default function restoreService($http) {
  'ngInject';
  //todo use $http service

  this.getConnections = () => {
    return [
      {
        connectionId: 'test',
        source:"jsPlumb_2_3",
        target:"jsPlumb_2_1",
      },
      // {
      //   source:"jsPlumb_2_1",
      //   target:"jsPlumb_2_3",
      // }
    ];
  };

  this.getLibraryModules = () => {
    return [
      {
        library_id: 0,
        title: "Test1",
        description: "Some text1",
        x: 20,
        y: 50
      },
      {
        library_id: 1,
        title: "Test2",
        description: "Some text2",
        x: 20,
        y: 80
      },
    ];
  };

  this.getSchemaModules = () => {
    return [
      {
        library_id: 0,
        schema_id: 1,
        title: "test",
        description: "test",
        x: 250,
        y: 200
      },
      {
        library_id: 1,
        schema_id: 2,
        title: "test",
        description: "test",
        x: 350,
        y: 300
      }
    ];
  };
}
