export default function moduleService() {
  this.createSchemaModule = (libraryId, targetId, sourceId, title, description, x, y) => {
    return {
      libraryId: libraryId,
      targetId: targetId,
      sourceId: sourceId,
      title: title,
      description: description,
      x: x,
      y: y
    };
  };

  this.createLibraryModule = (libraryId, title, description) => {
    return {
      libraryId: libraryId,
      title: title,
      description: description,
    };
  };

  this.createConnection = (connectionId, targetId, sourceId) => {
    return {
      id: connectionId,
      targetId: targetId,
      sourceId: sourceId
    };
  };

  this.getStyleModule = ()  => {
    return {
      width: 150,
      height: 100,
    };
  };
}
