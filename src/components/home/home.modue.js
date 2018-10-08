import './home.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './home.route';
import homeController from './home.controller';
import storageFactory from './components/services/storage-factory';

import jsPlumbCanvasDirective from './components/directives/js-plumb-canvas.directive';
import jsPlumbConnectionDirective from './components/directives/js-plumb-connection.directive';
import jsPlumbEndpointDirective from './components/directives/js-plumb-endpoint.directive';
import jsPlumbObjectDirective from './components/directives/js-plumb-object.directive';

export default angular.module('app.home', [uirouter])
	.config(routing)
	.controller('FirstExampleController', homeController)
	.factory('$localStorage', storageFactory('localStorage'))
  .factory('$sessionStorage', storageFactory('sessionStorage'))
	.directive(jsPlumbCanvasDirective, 'jsPlumbCanvas')
  .directive(jsPlumbConnectionDirective, 'jsPlumbConnection')
  .directive(jsPlumbEndpointDirective, 'jsPlumbEndpoint')
  .directive(jsPlumbObjectDirective, 'jsPlumbObject')
	.name;
