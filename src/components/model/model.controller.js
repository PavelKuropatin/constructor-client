import openDiagramTemplate from "../home/components/dialogs/open_diagram/open-diagram.html";
import img from "./../../../assets/images/Background.png";

export default function modelController($scope, $state, $mdDialog, $interval, ROUTES, stateObjectHttpService) {
  'ngInject';
  const vm = this;
  vm.backgroundImg = img;
  vm.modelInfo = [];
  vm.sortableOptions = {
    connectWith: '.connectedItems',
  };
  vm.timer;

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

  vm.startCount = function () {
    vm.timer = $interval(() => {
      var init = 0;
      var test = {label: 'x', value: init++};
      _.forEach(vm.modelInfo, (model) => countFunction(model, test));
    }, 10);

    setInterval(function () {
      var init = 0;
      var test = {label: 'x', value: init++};
      _.forEach(vm.modelInfo, (model) => countFunction(model, test));
    }, 100);

  };

  vm.killtimer = function () {  
    if (angular.isDefined(vm.timer)) {
      $interval.cancel(vm.timer);
      vm.timer = undefined;
    }
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

  jsPlumb.ready(() => {
    stateObjectHttpService.getAllStateObject({uuid: 'f9bc9b13-4f6a-4951-bfe2-f5735b12a479'}).then((response) => {
      vm.diagramInfo = response.data;
    });
  });

  const countFunction = (state, test) => {
    console.log(test);
    _.forEach(state.outputContainer, container => {
      let bufFunction = _.clone(container.stringFunction);
      _.forEach(state.inputContainer, item => {
        bufFunction = _.replace(bufFunction, new RegExp(item.label, 'g'), item.value);
      });
      try {
        container.value = math.eval(bufFunction);
      } catch (err) {
      }
    });
  };
}
