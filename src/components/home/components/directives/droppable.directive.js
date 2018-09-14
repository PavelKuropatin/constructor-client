export default function droppable() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      $(element).droppable({
        drop: function (event, ui) {
          let dragIndex = angular.element(ui.draggable).data('identifier'),
            dragEl = angular.element(ui.draggable),
            dropEl = angular.element(this);

          if (dragEl.hasClass('menu-item') && dropEl.hasClass('drop-container')) {
            let x = event.pageX - scope.home.module_css.width / 2;
            let y = event.pageY - scope.home.module_css.height / 2;

            scope.home.addModuleToSchema(dragIndex, x, y);
          }

          scope.$apply();
        }
      });
    }
  };
}
