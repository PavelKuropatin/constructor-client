export default function jsPlumbCanvasDirective() {
  // 'ngInject';
  const jsPlumbZoomCanvas = function (instance, zoom, el, transformOrigin) {
    transformOrigin = transformOrigin || [0, 0];
    const p = ["webkit", "moz", "ms", "o"],
      s = "scale(" + zoom + ")",
      oString = (transformOrigin[0] * 100) + "% " + (transformOrigin[1] * 100) + "%";
    for (let i = 0; i < p.length; i++) {
      el.style[p[i] + "Transform"] = s;
      el.style[p[i] + "TransformOrigin"] = oString;
    }
    el.style["transform"] = s;
    el.style["transformOrigin"] = oString;
    instance.setZoom(zoom);
  };

  return {
    restrict: 'E',
    scope: {
      onConnection: '=onConnection',
      zoom: '=',
      x: '=',
      y: '='
    },
    controller: function ($scope) {
      this.scope = $scope;
    },
    transclude: true,
    template: '<div ng-transclude></div>',
    link: function (scope, element, attr) {
      var instance = jsPlumb.getInstance();
      scope.jsPlumbInstance = instance;

      instance.bind("connection", function (info, origEvent) {
        // console.log("[connection] event in jsPlumbCanvas Directive [DRAG & DROP]", info, origEvent);

        // if (typeof origEvent !== 'undefined' && origEvent.type === 'drop') {
          var targetUUID = $(info.target).attr('uuid');
          var sourceUUID = $(info.source).attr('uuid');
        scope.onConnection(instance, info.connection, targetUUID, sourceUUID);
          instance.deleteConnection(info.connection);
        // }
      });

      $(element).css({
        minWidth: '1000px',
        minHeight: '1000px',
        display: 'block',
      }).draggable({
        stop: function (event, ui) {
          var position = $(this).position();
          scope.x = position.left;
          scope.y = position.top;
          scope.$parent.$apply();
        }
      });

      instance.setContainer($(element));

      var zoom = (typeof scope.zoom === 'undefined') ? 1 : scope.zoom / 100;
      jsPlumbZoomCanvas(instance, zoom, $(element)[0]);

      scope.$watch('zoom', function (newVal, oldVal) {
        jsPlumbZoomCanvas(instance, newVal / 100, $(element)[0]);
      });

      $(element).bind('mousewheel', function (e) {
        if (e.originalEvent.wheelDelta / 200 > 0) {
          scope.zoom += 10;
          scope.$apply();

        }
        else {
          scope.zoom -= 10;
          scope.$apply();
        }
      });

    }
  };
}
