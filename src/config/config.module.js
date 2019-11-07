import angular from 'angular';
import envConfigModule from './env/env.config.module';
import restangularConfig from './config.restangular';

require('restangular');

export default angular.module('diplom.config', [envConfigModule, 'restangular'])
  .config(restangularConfig)
  .name
