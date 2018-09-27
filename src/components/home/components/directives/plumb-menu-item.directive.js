export default function plumbMenuItem(jsplubService) {
  return {
    replace: true,
    link: function (scope, element, attrs) {
      scope.home.jsPlumbInstance.draggable(element, {
        containment: $('#sidenav-container')
      });
    }
  };
}
