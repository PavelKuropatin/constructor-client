import './model.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './model.route';
import modelController from './model.controller';
import routes from '../constants/routes.constants';
import constants from '../constants/buissnes.constants';

export default angular.module('app.model', [uirouter])
  .config(routing)
  .controller('modelController', modelController)
  .constant('CONSTANTS', constants)
  .constant('ROUTES', routes)
  .name;
