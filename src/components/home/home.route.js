import homeTemplate from './home.html';

export default function homeRouteConfig ($stateProvider, ROUTES) {
  'ngInject';
  $stateProvider
    .state(ROUTES.SCHEMA, {
      url: '/',
      views: {
        'main': {
          template: homeTemplate,
          controller: 'homeController as vm'
        }
      }
    });
}
