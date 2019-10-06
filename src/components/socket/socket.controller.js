import openDiagramTemplate from '../home/components/dialogs/open-diagram/open-diagram.html';
import img from './../../../assets/images/Background.png';
import connectConfigTemplate from './components/dialogs/connect-config/connect-config.html';


export default function socketController($scope, $state, $translate, $mdDialog, socketService, socketHttpService,
    stateObjectHttpService, ROUTES, CONSTANTS) {

    'ngInject';
    const vm = this;
    $scope.message = [];
    $scope.max = 140;

    vm.backgroundImg = img;
    vm.connectSettings = {};
    vm.modelInfo = {modules: []};
    vm.diagramInfo = {modules: []};
    vm.sortableOptions = {
        connectWith: '.connectedItems',
    };
    vm.modelTemplate = CONSTANTS.SOCKET.CAR;


    socketService.receive().then(null, null, (message) => {
        console.log(message);
    });

    vm.goToSchema = () => {
        $state.go(ROUTES.SCHEMA);
    };

    vm.goToModel = () => {
        $state.go(ROUTES.MODEL);
    };

    vm.openConnectDialog = () => {
        $mdDialog.show({
                locals: {connectSettings: vm.connectSettings},
                controller: 'connectConfigController as vm',
                template: connectConfigTemplate,
                clickOutsideToClose: true,
            }).then((connectSettings) => {
                console.log(connectSettings);
                vm.connectSettings = connectSettings;

                socketService.initSocket(console.log);
                vm.cmdUUID = socketHttpService.startGetState(connectSettings);
            });
    };

     vm.openDiagram = () => {
            $mdDialog.show({
                controller: 'openDiagramController as vm',
                template: openDiagramTemplate,
                clickOutsideToClose: true,
            }).then((diagram) => {
                jsPlumb.ready(() => {
                    stateObjectHttpService.getAllStateObject(diagram).then((response) => {
                        vm.diagramInfo = response.data;
                    });
                });
            });
        };


   vm.setActiveState = (state) => {
        vm.activeState = state;
    };

    vm.saveId = (e, ui) => {
        _.head(vm.modelInfo.modules).targetId = e.target.id;
    };

    vm.findById = (id) => {
        return _.find(vm.modelInfo.modules, function (model) {
            return model.targetId == id;
        });
    };

    vm.setLanguage = (lang) => {
        $translate.use(lang);
    };
}