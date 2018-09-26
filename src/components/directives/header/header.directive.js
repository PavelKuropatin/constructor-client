import template from './header.html';

export default function eader() {
	return {
		restrict: 'E',
		scope: {
			library: '='
		},
		template: template,
		controller: 'headerController as vm'
	};
}
