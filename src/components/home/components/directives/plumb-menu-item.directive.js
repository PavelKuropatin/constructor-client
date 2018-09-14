export default function plumbMenuItem() {
  return {
    replace: true,
    controller: 'homeController as home',
    link: function (scope, element, attrs) {
      jsPlumb.draggable(element, {
        containment: element.parent().parent()
      });
    }
  };
}
