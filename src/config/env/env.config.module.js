import angular from 'angular';

export default angular.module('diplom.config.env', [])
  .constant('env', {
    // api: 'https://diagram-diploma.herokuapp.com',
    api: 'http://localhost:8080',
    socket: 'http://localhost:8080'
  })
  .name;
