import homeTemplate from './home.html';

export default function homeRouteConfig($stateProvider) {
  'ngInject';
	$stateProvider
		.state('home', {
			url: '/',
			views: {
				'main':{
					template: homeTemplate,
					controller: 'homeController as home',
				}
			},
		});
}
