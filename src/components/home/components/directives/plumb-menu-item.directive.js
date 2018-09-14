export default function plumbMenuItem() {
  return {
    replace: true,
    link: function (scope, element, attrs) {
      scope.home.jsPlumbInstance.draggable(element, {
        containment: element.parent().parent()
      });
    }
  };
}
