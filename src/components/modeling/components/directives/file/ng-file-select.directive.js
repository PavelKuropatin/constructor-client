export default function ngFileSelectDirective () {

  return {
    link: function (scope, element) {

      element.bind('change', function (e) {
        scope.getFile((e.srcElement || e.output).files[0]);
      });

    }

  };

}
