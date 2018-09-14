export default function draggable() {
  return {
    // A = attribute, E = Element, C = Class and M = HTML Comment
    restrict:'A',
    //The link function is responsible for registering DOM listeners as well as updating the DOM.
    link: function(scope, element, attrs) {
      element = draggable({
        // let it go back to its original position
        revert:true,
      });
    }
  };
}
