import openDiagramTemplate from '../home/components/dialogs/open-diagram/open-diagram.html';
import img from './../../../assets/images/Background.png';
import connectConfigTemplate from './components/dialogs/connect-config/connect-config.html';


export default function socketController($scope, $state, $translate, $mdDialog, socketService, socketHttpService,
    stateObjectHttpService, ROUTES, CONSTANTS) {

    'ngInject';
    const vm = this;

    vm.backgroundImg = img;
    vm.connectSettings = {};
    vm.modelInfo = { modules: [] };
    vm.diagramInfo = { modules: [] };
    vm.sortableOptions = {
        connectWith: '.connectedItems',
    };
    vm.modelTemplate = CONSTANTS.SOCKET.CAR;


    vm.goToSchema = () => {
        $state.go(ROUTES.SCHEMA);
    };

    vm.goToModel = () => {
        $state.go(ROUTES.MODEL);
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

    vm.openConnectDialog = () => {
        $mdDialog.show({
            locals: { connectSettings: vm.connectSettings },
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


    vm.stopMonitor = () => {
        socketHttpService.stopMonitor(vm.cmdUUID);
    };

    vm.setLanguage = (lang) => {
        $translate.use(lang);
    };

    socketService.receive().then(null, null, (message) => {
        console.log(vm.cmdUUID);
        let out = JSON.parse(message);
        _.forEach(vm.modelInfo.modules, state => {
            if (state.name in out) {
                state.outputContainer = [{ "label": "x", "value": out[state.name] }];
            }
        });
        console.log(message);
    });

}