import './home.scss';
import './components/partials/action/action.scss';
import './components/partials/circle/circle.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import partialsConfig from './components/partials/partials.config';
import routes from '../constants/routes.constants';
import routing from './home.route';
import homeController from './home.controller';
import openSchemaController from './components/dialogs/open-schema/open-schema.controller';
import addVarController from './components/dialogs/add-var/add-var.controller';
import deleteVarController from './components/dialogs/delete-var/delete-var.controller';
import editEndpointsLayoutController from './components/dialogs/edit-endpoints-layout/edit-endpoints-layout.controller';

import jsPlumbCanvasDirective from './components/directives/js-plumb/js-plumb-canvas.directive';
import jsPlumbConnectionDirective from './components/directives/js-plumb/js-plumb-connection.directive';
import jsPlumbEndpointDirective from './components/directives/js-plumb/js-plumb-endpoint.directive';
import jsPlumbObjectDirective from './components/directives/js-plumb/js-plumb-object.directive';
import sidenavDirective from './components/directives/sidenav/sidenav.directive';
import settingDirective from './components/directives/setting/setting.directive';

import blockObjectHttpService from './components/services/http/block-object.http.service';
import jsPlumbStyleService from './components/services/js-plumb-style.service';
import blockObjectService from './components/services/block-object.service';
import constants from '../constants/buissnes.constants';

export default angular.module('app.home', [uirouter])
  .config(routing)
  .controller('homeController', homeController)
  .controller('openSchemaController', openSchemaController)
  .controller('addContainerController', addVarController)
  .controller('delContainerController', deleteVarController)
  .controller('editEndpointsLayoutController', editEndpointsLayoutController)
  .directive('jsPlumbCanvas', jsPlumbCanvasDirective)
  .directive('jsPlumbConnection', jsPlumbConnectionDirective)
  .directive('jsPlumbEndpoint', jsPlumbEndpointDirective)
  .directive('jsPlumbObject', jsPlumbObjectDirective)
  .directive('setting', settingDirective)
  .directive('sidenav', sidenavDirective)
  .service('blockObjectHttpService', blockObjectHttpService)
  .service('jsPlumbStyleService', jsPlumbStyleService)
  .service('blockObjectService', blockObjectService)
  .constant('ROUTES', routes)
  .constant('CONSTANTS', constants)
  .run(partialsConfig)
  .name;
