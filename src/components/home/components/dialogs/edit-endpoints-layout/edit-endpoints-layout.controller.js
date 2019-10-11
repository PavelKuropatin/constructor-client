export default function editEndpointsLayoutController($mdDialog, endpointStyle, CONSTANTS) {
    "ngInject";
    let vm = this;

    vm.endpointStyle = endpointStyle;

    vm.sourceLayout = getByAnchor(vm.endpointStyle.sourceAnchor);
    vm.targetLayout = getByAnchor(vm.endpointStyle.targetAnchor);

    vm.endpointLayouts = {
        border_left : {
            a:  CONSTANTS.ANCHOR.LEFT_MIDDLE,
            e:CONSTANTS.ENDPOINT_STYLE.ACTION.LEFT
         },
        border_top : {
                                 a:  CONSTANTS.ANCHOR.TOP_CENTER,
                                 e: CONSTANTS.ENDPOINT_STYLE.ACTION.TOP
                              },
        border_right : {
                                   a: CONSTANTS.ANCHOR.RIGHT_MIDDLE ,
                                   e: CONSTANTS.ENDPOINT_STYLE.ACTION.RIGHT
                                },
        border_bottom : {
                                    a:  CONSTANTS.ANCHOR.BOTTOM_CENTER,
                                    e: CONSTANTS.ENDPOINT_STYLE.ACTION.BOTTOM
                                 },
    };

    function  getByAnchor (endpointAnchor){
            switch (endpointAnchor){
                case CONSTANTS.ANCHOR.TOP_CENTER:
                    return "border_top";
                case CONSTANTS.ANCHOR.BOTTOM_CENTER:
                    return "border_bottom";
                case CONSTANTS.ANCHOR.LEFT_MIDDLE:
                    return "border_left";
                case CONSTANTS.ANCHOR.RIGHT_MIDDLE:
                    return "border_right";
            }
    };

    vm.apply = () => {
        $mdDialog.hide(
            _.merge(vm.endpointStyle, {
                sourceAnchor : vm.endpointLayouts[vm.sourceLayout].a,
                sourceEndpoint : vm.endpointLayouts[vm.sourceLayout].e,
                targetAnchor : vm.endpointLayouts[vm.targetLayout].a,
                targetEndpoint : vm.endpointLayouts[vm.targetLayout].e
            })
        );
    };

    vm.hideDialog = () =>  {
        $mdDialog.cancel();
    };
}
