import './home.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './home.route';
import homeController from './home.controller';

import jsplubService from './components/services/jsplumb.service';
import moduleService from './components/services/module.sevice';
import stateParamsService from './components/services/state-params.service';

import draggableDirective from './components/directives/draggable.directive';
import droppableDirective from './components/directives/droppable.directive';
import plumbConnectDirective from './components/directives/plumb-connect.directive';
import plumbItemDirective from './components/directives/plumb-item.directive';
import plumbMenuItemDirective from './components/directives/plumb-menu-item.directive';
import postRenderDirective from './components/directives/post-render.directive';

export default angular.module('app.home', [uirouter])
	.config(routing)
	.controller('homeController', homeController)
  .directive('draggable', draggableDirective)
  .directive('droppable', droppableDirective)
  .directive('plumbConnect', plumbConnectDirective)
  .directive('plumbItem', plumbItemDirective)
  .directive('plumbMenuItem', plumbMenuItemDirective)
  .directive('postRender', postRenderDirective)
  .service('jsplubService', jsplubService)
  .service('moduleService', moduleService)
  .service('stateParamsService', stateParamsService)
	.name;
