import angular from 'angular';
import uirouter from 'angular-ui-router';

import socketController from './socket.controller';
import connectConfigController from './components/dialogs/connect-config/connect-config.controller';

import socketService from './components/services/socket.service';
import socketHttpService from './components/services/http/socket-http.service';

import socketSidenavDirective from './components/directives/socket-sidenav.directive';

import routes from '../constants/routes.constants';
import routing from './socket.route';
import constants from '../constants/buissnes.constants';

import socketPartialsConfig from './components/socket-partials/socket-partials.config';

export default angular.module('app.socket', [uirouter])
    .config(routing)
    .controller('socketController', socketController)
        .controller('connectConfigController', connectConfigController)
.service('socketService', socketService)
    .service('socketHttpService', socketHttpService)
        .directive('socketSidenav', socketSidenavDirective)

    .constant('ROUTES', routes)
    .constant('CONSTANTS', constants)
    .run(socketPartialsConfig)
    .name;