import homeTemplate from './modeling.html';

export default function homeRouteConfig ($stateProvider, ROUTES) {
  'ngInject';
  $stateProvider
    .state(ROUTES.MODEL, {
      url: '/model',
      views: {
        'main': {
          template: homeTemplate,
          controller: 'customHomeController as vm'
        }
      }
    });
}
