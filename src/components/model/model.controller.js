import openDiagramTemplate from '../home/components/dialogs/open-diagram/open-diagram.html';
import img from './../../../assets/images/Background.png';
import startCountTemplate from './components/dialogs/start-count/start-count.html';

export default function modelController($scope, $state, $mdDialog, $timeout, $translate, ROUTES, stateObjectHttpService,
                                        stateObjectService, CONSTANTS) {
    'ngInject';
    const vm = this;
    vm.backgroundImg = img;
    vm.modelInfo = {modules: []};
    vm.sortableOptions = {
        connectWith: '.connectedItems',
    };
    vm.modelTemplate = CONSTANTS.MODEL.CAR;


    $scope.$watchCollection('model.modelInfo.modules', () => {
        console.log(vm.modelInfo.modules);
    });

    vm.goToSchema = () => {
        $state.go(ROUTES.SCHEMA);
    };

    vm.goToSocket = () => {
        $state.go(ROUTES.SOCKET);
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

    vm.stopCount = () => {
        $timeout.cancel(vm.timer);
        vm.timer = null;
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
            console.log(vm.diagramInfo);
        });
    };

    vm.openStartCountDiagram = () => {
        $mdDialog.show({
            locals: {countModel: vm.modelSettings},
            controller: 'startCountController as vm',
            template: startCountTemplate,
            clickOutsideToClose: true,
        }).then((modelSettings) => {
            console.log(modelSettings);
            vm.modelSettings = modelSettings;
            startCounter();
        });
    };

    jsPlumb.ready(() => {
        //    stateObjectHttpService.getAllStateObject({uuid: '712941e9-7525-4d8a-a7b7-49a35df7a790'}).then((response) => {
        //      vm.diagramInfo = response.data;
        //    });
    });

    const startCounter = () => {
        if (!vm.timer) {
            updateCounter();
        }
    };

    const updateCounter = () => {
        _.forEach(vm.modelSettings.vars, _var => {
            _var.startValue = +_var.startValue + +_var.stepValue;
        });
        changeParam();
        vm.timer = $timeout(updateCounter, vm.modelSettings.interval);
    };

    const changeParam = () => {
        console.log(vm.modelSettings.vars);
        _.forEach(vm.modelInfo.modules, state => {
            _.forEach(state.inputContainer, item => {
                let values = vm.modelSettings.vars.find(_var => _var.valueName === item.label);
                if (values) {
                    item.value = values.startValue;
                }
            });
            stateObjectService.countFunction(state);
        });
    };

    vm.setLanguage = (lang) => {
        $translate.use(lang);
    };
}
