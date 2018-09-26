export default function headerController($scope, $mdSidenav, jsplubService) {
  const vm = this;
  vm.zoomValue = 1;
  vm.toggleLeft = buildToggler('left');
  vm.toggleRight = buildToggler('right');
  vm.library = $scope.library;

  vm.zoom = (transformOrigin, el) => {
    transformOrigin = transformOrigin || [ 0.5, 0.5 ];
    const instance = jsplubService.getJsplumbInstance() || jsPlumb;
    el = el || instance.getContainer();
    let p = [ "webkit", "moz", "ms", "o" ],
      s = "scale(" + vm.zoomValue + ")",
      oString = (transformOrigin[0] * 100) + "% " + (transformOrigin[1] * 100) + "%";

    for (let i = 0; i < p.length; i++) {
      el.style[p[i] + "Transform"] = s;
      el.style[p[i] + "TransformOrigin"] = oString;
    }

    el.style["transform"] = s;
    el.style["transformOrigin"] = oString;

    instance.setZoom(vm.zoomValue);
  };

  function buildToggler(componentId) {
    return function () {
      $mdSidenav(componentId).toggle();
    };
  }

}
