/**
 * Very basic autoscroll directive;
 *
 * @author James Huston <james@jameshuston.net>
 * @since 2013-08-05
 */

/* Code not available as a bower package so it is included here */

'use strict';

angular.module('ColossalChat')
.directive('autoscrollDown', function () {
    return {
        link: function postLink(scope, element) {
            scope.$watch(
            function () {
                return element.children().length;
            },
            function () {
                element[0].scrollTop = element.prop('scrollHeight');
            }
        );
        }
    };
});