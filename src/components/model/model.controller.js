import openDiagramTemplate from '../home/components/dialogs/open-diagram/open-diagram.html';
import img from './../../../assets/images/Background.png';
import startCountTemplate from './components/dialogs/start-count/start-count.html';

export default function modelController($scope, $state, $mdDialog, $timeout, ROUTES, stateObjectHttpService,
                                        stateObjectService, CONSTANTS) {
  'ngInject';
  const vm = this;
  vm.backgroundImg = img;
  vm.modelInfo = {modules: []};
  vm.sortableOptions = {
    connectWith: '.connectedItems',
  };
  vm.modelTemplate = CONSTANTS.MODEL.CAR;


  $scope.$watchCollection('model.modelInfo.modules', function () {
    console.log(vm.modelInfo.modules);
  });

  vm.goToSchema = () => {
    $state.go(ROUTES.HOME);
  };

  vm.setActiveState = (state) => {
    vm.activeState = state;
  };

  vm.saveId = function (e, ui) {
    _.head(vm.modelInfo.modules).targetId = e.target.id;
  };

  vm.findById = function (id) {
    return _.find(vm.modelInfo.modules, function (model) {
      return model.targetId == id;
    });
  };

  vm.stopCount = function () {
    $timeout.cancel(vm.timer);
    vm.timer = null;
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

  vm.openStartCountDiagram = () => {
    $mdDialog.show({
      controller: 'startCountController as vm',
      template: startCountTemplate,
      clickOutsideToClose: true,
    }).then(function (modelSettings) {
      console.log(modelSettings);
      vm.modelSettings = modelSettings;
      startCounter();
    });
  };

  jsPlumb.ready(() => {
    stateObjectHttpService.getAllStateObject({uuid: '712941e9-7525-4d8a-a7b7-49a35df7a790'}).then((response) => {
      vm.diagramInfo = response.data;
    });
  });

  const startCounter = function () {
    if (!vm.timer) {
      updateCounter();
    }
  };

  const updateCounter = function () {
    vm.modelSettings.startValue += +vm.modelSettings.stepValue;
    changeParam();
    vm.timer = $timeout(updateCounter, vm.modelSettings.interval);
  };

  const changeParam = () => {
    _.forEach(vm.modelInfo.modules, state => {
      _.forEach(state.inputContainer, item => {
        if (item.label === vm.modelSettings.valueName) {
          item.value = vm.modelSettings.startValue;
        }
      });
      stateObjectService.countFunction(state);
    });
  };
}
