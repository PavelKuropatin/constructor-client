export default function droppable(stateParamsService, moduleService) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      $(element).droppable({
        drop: function (event, ui) {
          let dragIndex = ui.draggable.data('identifier'),
            dragEl = angular.element(ui.draggable),
            dropEl = angular.element(this);

          if (dragEl.hasClass('menu-item') && dropEl.hasClass('drop-container')) {
            //todo refactor
            let x = event.pageX - moduleService.getStyleModule.module_css.width / 2;
            let y = event.pageY - moduleService.getStyleModule.module_css.height / 2;

            stateParamsService.addModuleToSchema(dragIndex, x, y);
          }
          scope.$apply();
        }
      });
    }
  };
}
