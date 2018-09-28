export default function plumbMenuItem(jsplubService) {
  'ngInject';
  return {
    replace: true,
    link: function (scope, element, attrs) {
      scope.home.jsPlumbInstance.draggable(element, {
        containment: $('#sidenav-container')
      });
    }
  };
}
