import template from './custom-sidenav.html';

export default function customSidenavDirective ($timeout, $mdDialog, blockObjectService) {
  'ngInject';
  return {
    restrict: 'EA',
    scope: {
      schema: '=',
      activeBlock: '=',
      setActiveBlock: '=',
      changeVisibility: '=',
      isActiveBlock: '=',
      isActiveSetting: '=',
      refresh: '=',
      editable: '='
    },
    template: template,
    link: (scope, element, attr) => {
      scope.sortableOptions = {
        connectWith: '.connectedItems'
      };

      function refreshBlocks () {
        let bufBlockObjects = scope.schema.blocks.slice();
        scope.schema.blocks = [];
        $timeout(() => {
          scope.schema.blocks = bufBlockObjects;
        });
      }

      scope.showBlockSettings = (block) => {
        scope.isActiveSetting = !scope.isActiveSetting;
        blockObjectService.setConfigBlock(block);
      };

      scope.configBlock = (block) => {
        scope.isActiveSetting = !scope.isActiveSetting;
        blockObjectService.setConfigBlock(block);
      };
    }
  };
}
