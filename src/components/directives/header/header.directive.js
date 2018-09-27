import template from './header.html';

export default function headerDirective() {
	return {
		restrict: 'E',
		scope: {
		},
		template: template,
		controller: 'headerController as vm'
	};
}
