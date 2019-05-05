import './home.scss';
import './components/partials/action/action.scss';
import './components/partials/circle/circle.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import partialsConfig from './components/partials/partials.config';
import routes from '../constants/routes.constants';
import routing from './home.route';
import homeController from './home.controller';
import openDiagramController from './components/dialogs/open_diagram/open-diagram.controller';
import containerController from './components/dialogs/container/container.controller';

import jsPlumbCanvasDirective from './components/directives/js_plumb/js-plumb-canvas.directive';
import jsPlumbConnectionDirective from './components/directives/js_plumb/js-plumb-connection.directive';
import jsPlumbEndpointDirective from './components/directives/js_plumb/js-plumb-endpoint.directive';
import jsPlumbObjectDirective from './components/directives/js_plumb/js-plumb-object.directive';
import sidenavDirective from './components/directives/sidenav/sidenav.directive';
import settingDirective from './components/directives/setting/setting.directive';

import stateObjectHttpService from './components/services/http/state-object.http.service';
import jsPlumbStyleService from './components/services/js-plumb-style.service';
import stateObjectService from './components/services/state-object.service';
import constants from '../constants/buissnes.constants';

export default angular.module('app.home', [uirouter])
	.config(routing)
	.controller('homeController', homeController)
  .controller('openDiagramController', openDiagramController)
	.controller('containerController', containerController)
	.directive('jsPlumbCanvas', jsPlumbCanvasDirective)
  .directive('jsPlumbConnection', jsPlumbConnectionDirective)
  .directive('jsPlumbEndpoint', jsPlumbEndpointDirective)
  .directive('jsPlumbObject', jsPlumbObjectDirective)
  .directive('setting', settingDirective)
  .directive('sidenav', sidenavDirective)
	.service('stateObjectHttpService', stateObjectHttpService)
  .service('jsPlumbStyleService', jsPlumbStyleService)
  .service('stateObjectService', stateObjectService)
  .constant('ROUTES', routes)
	.constant('CONSTANTS', constants)
	.run(partialsConfig)
	.name;
