export default function connectConfigController($mdDialog, connectSettings) {
    "ngInject";

    let vm = this;

    if (connectSettings) {
        vm.connectSettings = connectSettings;
    } else {
        vm.connectSettings = {
            host: "localhost",
            port: 6666,
            pause: 2000
        };
    }

    vm.acceptSettings  = () => {
        $mdDialog.hide(vm.connectSettings);
    };

    vm.hideDialog = () => {
        console.log((!connectSettings.host || 0 === connectSettings.host.length) || !parseInt(connectSettings.port));
        console.log(!connectSettings.host );
        console.log(0 === connectSettings.host.length);
                console.log(!parseInt(+connectSettings.port));

        $mdDialog.cancel();
    };

}
