export default function moduleService() {
  this.createModule = (library_id, schema_id, title, description, x, y) => {
    return {
      library_id: library_id,
      schema_id: schema_id,
      title: title,
      description: description,
      x: x,
      y: y
    };
  };

  this.getLibraryTopleft = () => {
    return {
      x: 15,
      y: 145,
      item_height: 50,
      margin: 5,
    };
  };

  this.getStyleModule = ()  => {
    return {
      width: 150,
      height: 100, // actually variable
    };
  };
}
