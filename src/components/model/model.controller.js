import openDiagramTemplate from "../home/components/dialogs/open_diagram/open-diagram.html";

export default function modelController($scope, $state, $mdDialog, ROUTES, stateObjectHttpService) {
  'ngInject';
  const vm = this;

  vm.goToSchema = ()  => {
    $state.go(ROUTES.HOME);
  };

  vm.rightArray = [];
  vm.sortableOptions = {
    connectWith: '.connectedItems .list'
  };

  $scope.$watchCollection('model.rightArray', function () {
    console.log(vm.rightArray);
  });

  vm.openDiagram = function () {
    $mdDialog.show({
      controller: 'openDiagramController as vm',
      template: openDiagramTemplate,
      clickOutsideToClose: true,
    }).then(function (diagram) {
      jsPlumb.ready(() => {
        stateObjectHttpService.getAllStateObject(diagram).then((response) => {
          vm.diagramInfo = response.data;
        });
      });
    });
  };
}
