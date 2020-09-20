require('jquery');
require('jquery-ui');
require('jquery-ui/ui/widgets/sortable');
require('jquery-ui/ui/disable-selection');
require('jquery-ui/ui/widgets/draggable');
require('jquery-ui/ui/widgets/droppable');
require('angular-ui-sortable');

import angular from 'angular';
import uirouter from 'angular-ui-router';
import animate from 'angular-animate';
import aria from 'angular-aria';
import messages from 'angular-messages';
import material from 'angular-material';
import './../assets/images/grid_background.gif';

import 'jsplumb/css/jsplumbtoolkit-defaults.css';
import 'angular-material/angular-material.scss';
import 'material-icons/iconfont/material-icons.scss';

import './components/home/components/directives/sidenav/sidenav.scss';
import './global.scss';

import config from './app.config';
import homeModule from './components/home/home.module';
import customHomeModule from './components/modeling/modeling.module';
import configModule from './config/config.module';

require('lodash');
require('jsplumb');
require('mathjs');
require('angular-translate');
require('angular-translate-storage-local');
require('angular-translate-loader-static-files');

angular
  .module('diplom', [
    'ui.sortable',
    'pascalprecht.translate',
    uirouter, animate, aria,
    messages, material,
    homeModule,
    configModule,
    customHomeModule
  ])
  .config(config);
