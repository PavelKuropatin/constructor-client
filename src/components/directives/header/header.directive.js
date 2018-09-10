import template from './header.html';

export default function header() {
	return {
		restrict: 'E',
		scope: {
		},
		template: template,
		controller: 'headerController as header'
	}
}
