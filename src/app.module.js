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

require('lodash');
require('jsplumb');
require('mathjs');
require('angular-translate');
require('angular-translate-storage-local');
require('angular-translate-loader-static-files');

import './../assets/images/grid_background.gif';

import 'jsplumb/css/jsplumbtoolkit-defaults.css';
import 'angular-material/angular-material.scss';
import 'material-icons/iconfont/material-icons.scss';

import './components/home/components/directives/sidenav/sidenav.scss';
import './global.scss';

import routing from './app.route';
import homeModule from './components/home/home.modue';
import modelModule from './components/model/model.module';
import configModule from './config/config.module';

angular.module('diplom', ['ui.sortable', 
'pascalprecht.translate',
uirouter, animate, aria, messages, material, homeModule, modelModule, configModule])
.config(function($urlRouterProvider, $locationProvider, $translateProvider) {
  "use strict";

  $urlRouterProvider.otherwise('/');

  $translateProvider.useStaticFilesLoader({
    prefix: '/assets/i18n/',
    suffix: '.json'
  });

  $translateProvider.preferredLanguage("ru");
  $translateProvider.fallbackLanguage("en");

  // $locationProvider.html5Mode(true);
});