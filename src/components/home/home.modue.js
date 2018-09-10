import './home.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './home.route';
import homeController from './home.controller';

export default angular.module('app.home', [uirouter])
	.config(routing)
	.controller('homeController', homeController)
	.name;
