export default function HeaderController() {
  const vm = this;

  vm.click = () => {
    jsPlumb.repaintEverything();
  };

}
