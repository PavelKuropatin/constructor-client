import './custom-home.scss';
import './components/custom-partials/action/action.scss';
import './components/custom-partials/circle/circle.scss';
import './components/directives/custom-setting/custom-setting.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routes from '../constants/routes.constants';
import routing from './custom-home.route';
import customHomeController from './custom-home.controller';

import customSidenavDirective from './components/directives/custom-sidenav/custom-sidenav.directive';
import customJsPlumbCanvasDirective from './components/directives/custom-js-plumb/custom-js-plumb-canvas.directive';
import customJsPlumbConnectionDirective
  from './components/directives/custom-js-plumb/custom-js-plumb-connection.directive';
import customJsPlumbEndpointDirective from './components/directives/custom-js-plumb/custom-js-plumb-endpoint.directive';
import customJsPlumbObjectDirective from './components/directives/custom-js-plumb/custom-js-plumb-object.directive';
import customPartialsConfig from './components/custom-partials/custom-partials.config';
import customJsPlumbStyleService from './components/service/custom-js-plumb-style.service';

import startCountController from './components/dialogs/start-count/start-count.controller';

import constants from '../constants/buissnes.constants';

import ngFileSelectDirective from './components/directives/file/ng-file-select.directive';
import fileReaderFactory from './components/directives/file/file-reader.factory';

import socketService from './components/service/socket.service';
import socketHttpService from './components/service/http/socket-http.service';
import imageHttpService from './components/service/http/image-http.service';
import customSettingDirective from './components/directives/custom-setting/custom-setting.directive';

export default angular.module('app.custom-home', [uirouter])
  .config(routing)
  .controller('customHomeController', customHomeController)
  .controller('startCountController', startCountController)
  .directive('ngFileSelect', ngFileSelectDirective)
  .factory('fileReader', fileReaderFactory)
  .directive('customSidenav', customSidenavDirective)
  .directive('customJsPlumbCanvas', customJsPlumbCanvasDirective)
  .directive('customJsPlumbConnection', customJsPlumbConnectionDirective)
  .directive('customJsPlumbEndpoint', customJsPlumbEndpointDirective)
  .directive('customJsPlumbObject', customJsPlumbObjectDirective)
  .directive('customSetting', customSettingDirective)
  .service('customJsPlumbStyleService', customJsPlumbStyleService)
  .service('imageHttpService', imageHttpService)
  .service('socketService', socketService)
  .service('socketHttpService', socketHttpService)
  .constant('ROUTES', routes)
  .constant('CONSTANTS', constants)
  .run(customPartialsConfig)
  .name;