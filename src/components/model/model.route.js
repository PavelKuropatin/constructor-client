import modelTemplate from './model.html';

export default function modelRouteConfig($stateProvider, ROUTES) {
  'ngInject';
  $stateProvider
    .state(ROUTES.MODEL, {
      url: '/model',
      views: {
        'main':{
          template: modelTemplate,
          controller: 'modelController as model',
        }
      },
    });
}
