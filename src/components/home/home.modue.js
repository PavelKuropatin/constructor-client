import './home.scss';
import './components/partials/action/action.scss';
import './components/partials/circle/circle.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import partialsConfig from './components/partials/partials.config';
import constants from '../constants/buissnes.constants';
import routing from './home.route';
import homeController from './home.controller';
import openDiagramController from './components/dialogs/open_diagram/open-diagram.controller';

import jsPlumbCanvasDirective from './components/directives/js-plumb-canvas.directive';
import jsPlumbConnectionDirective from './components/directives/js-plumb-connection.directive';
import jsPlumbEndpointDirective from './components/directives/js-plumb-endpoint.directive';
import jsPlumbObjectDirective from './components/directives/js-plumb-object.directive';
import sidenavDirective from './components/directives/sidenav/sidenav.directive';
import settingDirective from './components/directives/setting/setting.directive';

import uuidService from './components/services/uuid.service';
import stateObjectHttpService from './components/services/state-object.http.service';
import jsPlumbStyleService from './components/services/js-plumb-style.service';
import stateObjectService from './components/services/state-object.service';

export default angular.module('app.home', [uirouter])
	.config(routing)
	.controller('homeController', homeController)
  .controller('openDiagramController', openDiagramController)
	.directive('jsPlumbCanvas', jsPlumbCanvasDirective)
  .directive('jsPlumbConnection', jsPlumbConnectionDirective)
  .directive('jsPlumbEndpoint', jsPlumbEndpointDirective)
  .directive('jsPlumbObject', jsPlumbObjectDirective)
  .directive('setting', settingDirective)
  .directive('sidenav', sidenavDirective)
	.service('uuidService', uuidService)
	.service('stateObjectHttpService', stateObjectHttpService)
  .service('jsPlumbStyleService', jsPlumbStyleService)
  .service('stateObjectService', stateObjectService)
  .constant('CONSTANTS', constants)
  .run(partialsConfig)
	.name;
