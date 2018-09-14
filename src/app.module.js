import angular from 'angular';
import uirouter from 'angular-ui-router';
import animate from 'angular-animate';
import aria from 'angular-aria';
import messages from 'angular-messages';
import material from 'angular-material';

require('lodash');
require('jsplumb');

import 'popper.js';
import 'jsplumb';

import routing from './app.route';

import 'angular-material/angular-material.scss';
import './components/directives/header/header.scss';
import './global.scss';

import homeModule from './components/home/home.modue';

import headerDirective from './components/directives/header/header.directive';
import headerController from './components/directives/header/header.controller';

angular.module('diplom', [uirouter, animate, aria, messages, material, homeModule])
	.directive('header', headerDirective)
	.controller('headerController', headerController)
	.config(routing);
