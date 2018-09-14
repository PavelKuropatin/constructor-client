export default function plumbMenuItem() {
  return {
    replace: true,
    link: function (scope, element, attrs) {
      jsPlumb.draggable(element, {
        containment: element.parent().parent()
      });
    }
  };
}
