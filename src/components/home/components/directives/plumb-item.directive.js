export default function plumbItem() {
  return {
    replace: true,
    controller: 'homeController as home',
    transclude : true,
    link: function (scope, element, attrs) {
      jsPlumb.makeTarget(element, {
        anchor: 'Continuous',
        maxConnections: 2,
      });
      jsPlumb.draggable(element, {
        containment: 'parent'
      });

      // this should actually done by a AngularJS template and subsequently a controller attached to the dbl-click event
      element.bind('dblclick', function(e) {
        jsPlumb.detachAllConnections($(this));
        $(this).remove();
        // stop event propagation, so it does not directly generate a new state
        e.stopPropagation();
        //we need the scope of the parent, here assuming <plumb-item> is part of the <plumbApp>
        scope.$parent.removeState(attrs.identifier);
        scope.$parent.$digest();
      });

    }
  };
}
