import template from './sidenav.html';
import containerTemplate from '../../dialogs/add-var/add-var.html';
import delContainerTemplate from '../../dialogs/delete-var/delete-var.html';
import editEndpointsLayoutTemplate from '../../dialogs/edit-endpoints-layout/edit-endpoints-layout.html';

export default function sidenavDirective ($timeout, $mdDialog, blockObjectService, CONSTANTS) {
  'ngInject';
  return {
    restrict: 'EA',
    scope: {
      schema: '=',
      activeBlock: '=',
      isActiveSetting: '=',
      isActiveModel: '=?'
    },
    template: template,
    link: function (scope, element, attr) {
      scope.CONSTANTS = CONSTANTS;
      scope.newBlock = blockObjectService.createBlock;
      scope.deleteBlock = blockObjectService.deleteBlock;
      scope.removeIndex = blockObjectService.removeIndex;
      scope.deleteSchema = blockObjectService.deleteSchema;
      scope.partials = _.values(CONSTANTS.PARTIALS);
      scope.colors = _.values(CONSTANTS.TYPE_ACTION);
      scope.countFunction = blockObjectService.countFunction;

      scope.openContainerSchema = (block, type) => {
        $mdDialog.show({
          controller: 'addContainerController as vm',
          template: containerTemplate,
          clickOutsideToClose: true
        }).then(function (model) {
          blockObjectService.addContainer(block, type, model.param, model.value);
        });
      };

      scope.setActiveBlock = (block) => {
        if (scope.activeBlock === block) {
          scope.activeBlock = null;
        } else {
          scope.activeBlock = block;
          scope.countFunction(scope.schema.blocks, scope.activeBlock);
        }
      };

      scope.isActionBlock = (block) => {
        return block.template === CONSTANTS.PARTIALS.ACTION;
      };

      scope.isCircleBlock = (block) => {
        return block.template === CONSTANTS.PARTIALS.CIRCLE;
      };

      function refreshBlocks () {
        let bufBlockObjects = scope.schema.blocks.slice();
        scope.schema.blocks = [];
        $timeout(() => {
          scope.schema.blocks = bufBlockObjects;
        });
      }

      scope.editEndpoints = (block) => {
        $mdDialog.show({
          locals: { endpointStyle: block.endpointStyle },
          controller: 'editEndpointsLayoutController as vm',
          template: editEndpointsLayoutTemplate,
          clickOutsideToClose: true
        }).then(function (endpointStyle) {
          block.endpointStyle = endpointStyle;
          refreshBlocks();
        });
      };

      scope.deleteInput = (block, type) => {
        $mdDialog.show({
          locals: { container: block.inputVars },
          controller: 'delContainerController as vm',
          template: delContainerTemplate,
          clickOutsideToClose: true
        }).then(function (param) {
          blockObjectService.deleteContainer(block, type, param);
        });
      };

      scope.deleteOutput = (block, type) => {
        $mdDialog.show({
          locals: { container: block.outputVars },
          controller: 'delContainerController as vm',
          template: delContainerTemplate,
          clickOutsideToClose: true
        }).then(function (param) {
          blockObjectService.deleteContainer(block, type, param);
        });
      };

      scope.showBlockSettings = (block) => {
        scope.isActiveSetting = !scope.isActiveSetting;
        blockObjectService.setConfigBlock(block);
      };
    }
  };
}
