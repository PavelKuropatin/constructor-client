import uirouter from 'angular-ui-router';
import envConfigModule from 'env/env.config.module';

import restangularConfig from 'config.restangular';

export default angular.module('diplom.config', [uirouter, envConfigModule, 'restangular'])
  .config(restangularConfig)
  .name;