/*global define*/

define(['angular'], function (angular) {
    "use strict";

    var directive = function (focus) {
        return function(scope, elem, attr) {
          elem.on(attr.eventFocus, function() {
            focus(attr.eventFocusId);
          });

          // Removes bound events in the element itself
          // when the scope is destroyed
          scope.$on('$destroy', function() {
            elem.off(attr.eventFocus);
          });
        };
    };

    directive.$inject = ['VERSION'];
    return directive;
});
