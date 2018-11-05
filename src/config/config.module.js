import angular from 'angular';

require('restangular');

import envConfigModule from './env/env.config.module';
import restangularConfig from './config.restangular';

export default angular.module('diplom.config', [envConfigModule, 'restangular'])
  .config(restangularConfig)
  .name;
