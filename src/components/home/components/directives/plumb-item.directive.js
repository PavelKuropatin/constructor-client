export default function plumbItem(jsplubService) {
  return {
    replace: true,
    link: function (scope, element, attrs) {
      // todo there are problems
      scope.home.jsPlumbInstance.makeTarget(element, {
        anchor: 'Continuous',
        maxConnections: 2,
      });
      scope.home.jsPlumbInstance.draggable(element, {
        containment: $('#container')
      });

      // this should actually done by a AngularJS template and subsequently a controller attached to the dbl-click event
      // element.bind('dblclick', function(e) {
      //   // jsPlumb.detachAllConnections($(this));
      //   $(this).remove();
      //   // stop event propagation, so it does not directly generate a new state
      //   e.stopPropagation();
      //   //we need the scope of the parent, here assuming <plumb-item> is part of the <plumbApp>
      //   scope.removeState(attrs.identifier);
      //   scope.$digest();
      // });

    }
  };
}
