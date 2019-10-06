import './model.scss';
import './components/model-partials/car/car.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './model.route';
import modelController from './model.controller';
import startCountController from './components/dialogs/start-count/start-count.controller';
import routes from '../constants/routes.constants';
import constants from '../constants/buissnes.constants';

import modelSidenavDirective from './components/directives/model-sidenav.directive';
import modelPartialsConfig from './components/model-partials/model-partials.config';

export default angular.module('app.model', [uirouter])
    .config(routing)
    .controller('modelController', modelController)
    .controller('startCountController', startCountController)
    .directive('modelSidenav', modelSidenavDirective)
    .constant('CONSTANTS', constants)
    .constant('ROUTES', routes)
    .run(modelPartialsConfig)
    .name;
