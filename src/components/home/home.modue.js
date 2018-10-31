import './home.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './home.route';
import homeController from './home.controller';

import jsPlumbCanvasDirective from './components/directives/js-plumb-canvas.directive';
import jsPlumbConnectionDirective from './components/directives/js-plumb-connection.directive';
import jsPlumbEndpointDirective from './components/directives/js-plumb-endpoint.directive';
import jsPlumbObjectDirective from './components/directives/js-plumb-object.directive';
import sidenavDirective from './components/directives/sidenav/sidenav.directive';

import uuidService from './components/services/uuid.service';
import stateObjectHttpService from './components/services/state-object.http.service';

export default angular.module('app.home', [uirouter])
	.config(routing)
	.controller('homeController', homeController)
	.directive('jsPlumbCanvas', jsPlumbCanvasDirective)
  .directive('jsPlumbConnection', jsPlumbConnectionDirective)
  .directive('jsPlumbEndpoint', jsPlumbEndpointDirective)
  .directive('jsPlumbObject', jsPlumbObjectDirective)
	.directive('sidenav', sidenavDirective)
	.service('uuidService', uuidService)
	.service('stateObjectHttpService', stateObjectHttpService)
	.name;
