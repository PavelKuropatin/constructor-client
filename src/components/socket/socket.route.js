import socketTemplate from './socket.html';

export default function socketRouteConfig($stateProvider, ROUTES) {
    'ngInject';
    $stateProvider
        .state(ROUTES.SOCKET, {
            url: '/socket',
            views: {
                'main': {
                    template: socketTemplate,
                    controller: 'socketController as vm',
                }
            },
        });
}
