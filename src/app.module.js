import angular from 'angular';
import uirouter from 'angular-ui-router';
import animate from 'angular-animate';
import aria from 'angular-aria';
import messages from 'angular-messages';
import material from 'angular-material';

require('lodash');
require('jsplumb');

require('jquery-ui/ui/widgets/draggable');
require('jquery-ui/ui/widgets/droppable');

import './../assets/images/grid_background.gif';

import 'jsplumb/css/jsplumbtoolkit-defaults.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'angular-material/angular-material.scss';

import './components/home/components/directives/sidenav/sidenav.scss';
import './global.scss';

import routing from './app.route';
import homeModule from './components/home/home.modue';
import configModule from './config/env/env.config.module';

angular.module('diplom', [uirouter, animate, aria, messages, material, homeModule, configModule])
	.config(routing);
