import openDiagramTemplate from "../home/components/dialogs/open_diagram/open-diagram.html";
import img from './../../../assets/images/Background.png';

export default function modelController($scope, $state, $mdDialog, ROUTES, stateObjectHttpService) {
  'ngInject';
  const vm = this;
  vm.backgroundImg = img;
  vm.modelInfo = [];
  vm.sortableOptions = {
    connectWith: '.connectedItems',
  };

  $scope.$watchCollection('model.modelInfo', function () {
    console.log(vm.modelInfo);
  });

  vm.goToSchema = () => {
    $state.go(ROUTES.HOME);
  };

  vm.setActiveState = (state) => {
    vm.activeState = state;
  };

  vm.saveId = function (e, ui) {
    _.head(vm.modelInfo).targetId = e.target.id;
  };

  vm.findById = function (id) {
    return _.find(vm.modelInfo, function (model) {
      return model.targetId == id;
    });
  };

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
