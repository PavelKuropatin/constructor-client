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
}
