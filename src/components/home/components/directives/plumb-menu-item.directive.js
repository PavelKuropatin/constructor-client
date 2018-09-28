export default function plumbMenuItem(jsPlumbService) {
  'ngInject';
  return {
    replace: true,
    link: function (scope, element, attrs) {
      jsPlumbService.getJsplumbInstance().draggable(element, {
        containment: $('#sidenav-container')
      });
    }
  };
}
