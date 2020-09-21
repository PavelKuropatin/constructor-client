import './modeling.scss';
import './components/modeling-partials/action/action.scss';
import './components/modeling-partials/circle/circle.scss';
import './components/directives/modeling-setting/modeling-setting.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routes from '../constants/routes.constants';
import routing from './modeling.route';
import modelingController from './modeling.controller';

import modelingSidenavDirective from './components/directives/modeling-sidenav/modeling-sidenav.directive';
import modelingJsPlumbCanvasDirective from './components/directives/modeling-js-plumb/modeling-js-plumb-canvas.directive';
import modelingJsPlumbConnectionDirective
  from './components/directives/modeling-js-plumb/modeling-js-plumb-connection.directive';
import modelingJsPlumbEndpointDirective from './components/directives/modeling-js-plumb/modeling-js-plumb-endpoint.directive';
import modelingJsPlumbObjectDirective from './components/directives/modeling-js-plumb/modeling-js-plumb-object.directive';
import modelingPartialsConfig from './components/modeling-partials/modeling-partials.config';
import customJsPlumbStyleService from './components/service/custom-js-plumb-style.service';

import startCountController from './components/dialogs/start-count/start-count.controller';

import constants from '../constants/buissnes.constants';

import ngFileSelectDirective from './components/directives/file/ng-file-select.directive';
import fileReaderFactory from './components/directives/file/file-reader.factory';

import socketService from './components/service/socket.service';
import socketHttpService from './components/service/http/socket-http.service';
import imageHttpService from './components/service/http/image-http.service';
import modelingSettingDirective from './components/directives/modeling-setting/modeling-setting.directive';

export default angular.module('app.modeling', ['ngMaterial', uirouter])
  .config(routing)
  .controller('startCountController', startCountController)
  .controller('customHomeController', modelingController)
  .directive('ngFileSelect', ngFileSelectDirective)
  .factory('fileReader', fileReaderFactory)
  .directive('customSidenav', modelingSidenavDirective)
  .directive('customJsPlumbCanvas', modelingJsPlumbCanvasDirective)
  .directive('customJsPlumbConnection', modelingJsPlumbConnectionDirective)
  .directive('customJsPlumbEndpoint', modelingJsPlumbEndpointDirective)
  .directive('customJsPlumbObject', modelingJsPlumbObjectDirective)
  .directive('customSetting', modelingSettingDirective)
  .service('customJsPlumbStyleService', customJsPlumbStyleService)
  .service('imageHttpService', imageHttpService)
  .service('socketService', socketService)
  .service('socketHttpService', socketHttpService)
  .constant('ROUTES', routes)
  .constant('CONSTANTS', constants)
  .run(modelingPartialsConfig)
  .name;
