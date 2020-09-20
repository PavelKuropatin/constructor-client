const math = require('mathjs');

export default function blockObjectService ($rootScope, blockObjectHttpService, CONSTANTS) {
  'ngInject';

  var configBlock;

  const createBlock = (schemaUuid, blockObjects) => {
    blockObjectHttpService.createBlock(schemaUuid).then(response => {
      blockObjects.push(response.data);
    });
  };

  const deleteBlock = (schemaUuid, blockObjects, block) => {
    blockObjectHttpService.deleteBlock(schemaUuid, block.uuid).then(response => {
      if (response.status === 202) {
        const index = blockObjects.indexOf(block);
        if (index !== -1) {
          blockObjects.splice(index, 1);
        }
      }
    });
  };

  const deleteSchema = (schema) => {
    blockObjectHttpService.deleteSchema(schema.uuid).then(response => {
      if (response.status === 202) {
        $rootScope.$broadcast(CONSTANTS.EVENT_CONSTANTS.SUCCESS_SCHEMA_DELETE);
      }
    });
  };

  const removeIndex = (index, object) => {
    object.splice(index, 1);
  };

  const setConfigBlock = (block) => {
    configBlock = block;
  };

  const getConfigBlock = () => {
    return configBlock;
  };

  const addContainer = (block, type, param, value) => {
    blockObjectHttpService.putNewContainer(block.uuid, type, param, value).then(response => {
      block.inputVars = response.data.inputVars;
      block.outputVars = response.data.outputVars;
    });
  };

  const deleteContainer = (block, type, param) => {
    blockObjectHttpService.deleteContainer(block.uuid, type, param).then(response => {
      block.inputVars = response.data.inputVars;
      block.outputVars = response.data.outputVars;
    });
  };

  const updateContainer = (blocks, inputBlock, outputBlock) => {
    let inputVars = outputBlock.inputVars;
    _.forEach(inputBlock.outputVars, (oVar) => {
      let _var = _.find(inputVars, (iVar) => iVar.label === oVar.label);
      if (_var) {
        _var.value = oVar.value;
      } else {
        inputVars.push({
          label: oVar.label,
          value: oVar.value
        });
      }
    });
  };

  function getParentBlocks (blocks, outputUuid) {
    return _.filter(blocks, (block) => {
      return _.find(block.inputs[0].connections, (connection) => {
        return connection.uuid === outputUuid;
      });
    });

  }

  function applyParentContainer (parentContainer, childContainer) {
    _.forEach(childContainer, (childVar) => {
      let parentVar = _.find(parentContainer, (parentVar) => parentVar.label === childVar.label);
      if (parentVar) {
        childVar.value = parentVar.value;
      }
    });
  }

  const countFunction = (blocks, block) => {
    let parentBlocks = getParentBlocks(blocks, block.outputs[0].uuid);
    _.forEach(parentBlocks, (parentBlock) => {
      applyParentContainer(parentBlock.outputVars, block.inputVars);
    });
    _.forEach(block.outputVars, container => {
      let bufFunction = _.clone(container.expression);
      _.forEach(block.inputVars, item => {
        bufFunction = _.replace(bufFunction, new RegExp(item.label, 'g'), item.value);
      });
      try {
        container.value = math.eval(bufFunction);
      } catch (err) {
      }
    });
  };

  function findInputBlock (blocks, inputUuid) {
    return _.find(blocks, block => {
      return _.find(block.inputs, (o) => o.uuid === inputUuid);
    });
  }

  function findOutputBlock (blocks, outputUuid) {
    return _.find(blocks, block => {
      return _.find(block.outputs, (o) => o.uuid === outputUuid);
    });
  }

  function findInput (blocks, inputUuid) {
    return _.find(blocks, block => {
      return _.find(block.inputs, (o) => o.uuid === inputUuid);
    });
  }

  return {
    createBlock: createBlock,
    deleteBlock: deleteBlock,
    removeIndex: removeIndex,
    setConfigBlock: setConfigBlock,
    getConfigBlock: getConfigBlock,
    addContainer: addContainer,
    deleteContainer: deleteContainer,
    updateContainer: updateContainer,
    deleteSchema: deleteSchema,
    countFunction: countFunction,
    findInputBlock: findInputBlock,
    findOutputBlock: findOutputBlock
  };
}

