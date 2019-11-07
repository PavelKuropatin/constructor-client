import openDiagramTemplate from './components/dialogs/open-diagram/open-diagram.html';

export default function homeController ($scope, $state, $mdDialog, $translate, stateObjectHttpService, jsPlumbStyleService,
  stateObjectService, CONSTANTS, ROUTES) {
  'ngInject';
  $scope.CONSTANTS = CONSTANTS;
  const vm = this;
  vm.zoomlevel = 64;
  vm.activeState = null;

  vm.targetEndpointStyle1 = jsPlumbStyleService.getTargetEndpointStyle1();
  vm.targetEndpointStyle2 = jsPlumbStyleService.getTargetEndpointStyle2();

  vm.sourceEndpointStyle1 = jsPlumbStyleService.getSourceEndpointStyle1();
  vm.sourceEndpointStyle2 = jsPlumbStyleService.getSourceEndpointStyle2();

  vm.countFunction = stateObjectService.countFunction;
  vm.isActiveSetting = false;

  $scope.$on(CONSTANTS.EVENT_CONSTANTS.SUCCESS_DIAGRAM_DELETE, () => {
    vm.diagram = undefined
  });

  vm.goToModel = () => {
    $state.go(ROUTES.MODEL)
  };

  vm.setActiveState = (state) => {
    vm.activeState = state
  };

  vm.onConnection = (instance, connection, targetUuid, sourceUuid) => {
    _.forEach(vm.diagram.states, state => {
      _.forEach(state.sources, source => {
        if (source.uuid == sourceUuid) {
          source.connections.push({ 'uuid': targetUuid });
          $scope.$apply()
        }
      })
    });
    stateObjectService.updateContainer(vm.diagram.states, sourceUuid, targetUuid);
    vm.updateDiagram()
  };

  vm.updateDiagram = () => {
    stateObjectHttpService.updateDiagram(vm.diagram).then(response => {
      vm.diagram = response.data
    })
  };

  vm.createNewDiagram = () => {
    stateObjectHttpService.createNewDiagram().then(response => {
      vm.diagram = response.data
    })
  };

//    jsPlumb.ready(() => {
//            stateObjectHttpService.getDiagram("468b7557-77d8-40c0-baf5-d6201562f348").then((response) => {
//                vm.diagram = response.data;
//          });
//    });

  vm.openDiagram = () => {
    $mdDialog.show({
      controller: 'openDiagramController as vm',
      template: openDiagramTemplate,
      clickOutsideToClose: true,
    }).then((uuid) => {
      jsPlumb.ready(() => {
        stateObjectHttpService.getDiagram(uuid).then((response) => {
          vm.diagram = response.data
        })
      })
    })
  };

  vm.setLanguage = (lang) => {
    $translate.use(lang)
  }
}
