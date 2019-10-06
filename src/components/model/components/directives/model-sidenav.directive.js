import template from './model-sidenav.html';

export default function modelSidenavDirective() {
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
