import openDiagramTemplate from "./components/dialogs/open-diagram/open-diagram.html";

export default function homeController($scope, $state, $mdDialog, $translate, stateObjectHttpService, jsPlumbStyleService,
                                       stateObjectService, CONSTANTS, ROUTES) {
    'ngInject';
    const vm = this;
    vm.zoomlevel = 64;
    vm.activeState = null;
    vm.targetEndpointStyle = jsPlumbStyleService.getTargetEndpointStyle();
    vm.sourceEndpointStyle = jsPlumbStyleService.getSourceEndpointStyle();
    vm.countFunction = stateObjectService.countFunction;
    vm.isActiveSetting = false;

    $scope.$on(CONSTANTS.EVENT_CONSTANTS.SUCCESS_DIAGRAM_DELETE, () => {
        vm.diagram = undefined;
    });

    vm.goToModel = () => {
        $state.go(ROUTES.MODEL);
    };
    vm.goToSocket = () => {
        $state.go(ROUTES.SOCKET);
    };

    vm.setActiveState = (state) => {
        console.log(state);
        vm.activeState = state;
    };

    vm.onConnection = (instance, connection, targetUUID, sourceUUID) => {
        _.forEach(vm.diagram.modules, state => {
            _.forEach(state.sources, source => {
                if (source.uuid == sourceUUID) {
                    source.connections.push({'uuid': targetUUID});
                    $scope.$apply();
                }
            });
        });
        stateObjectService.updateContainer(vm.diagram.modules, sourceUUID, targetUUID);
        vm.updateDiagram();
    };

    vm.updateDiagram = () => {
        stateObjectHttpService.updateDiagram(vm.diagram).then(response => {
            vm.diagram = response.data;
        });
    };

    vm.createNewDiagram = () => {
        stateObjectHttpService.createNewDiagram().then(response => {
            vm.diagram = response.data;
        });
    };

    jsPlumb.ready(() => {
        //    stateObjectHttpService.getDiagram({uuid: "8d51047f-9dba-4239-b1e2-b3977ac4d8d5"}).then((response) => {
        //      vm.diagram = response.data;
        //    });
    });

    vm.openDiagram = () => {
        $mdDialog.show({
            controller: 'openDiagramController as vm',
            template: openDiagramTemplate,
            clickOutsideToClose: true,
        }).then((uuid) => {
            jsPlumb.ready(() => {
                stateObjectHttpService.getDiagram(uuid).then((response) => {
                    vm.diagram = response.data;
                    console.log(vm.diagram);
                });
            });
        });
    };

    vm.setLanguage = (lang) => {
        $translate.use(lang);
    };
}
