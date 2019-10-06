import template from './socket-sidenav.html';

export default function socketSidenavDirective() {
    'ngInject';
    return {
        restrict: 'EA',
        scope: {
            states: '='
        },
        template: template,
        link: (scope, element, attr) => {
            scope.sortableOptions = {
                connectWith: '.connectedItems'
            };
        }
    };
}
