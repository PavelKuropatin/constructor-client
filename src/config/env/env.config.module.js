import angular from 'angular';

export default angular.module("diplom.config.env", [])
  .constant('env', {
    api: 'https://diagram-diploma.herokuapp.com'
  })
  .name;
