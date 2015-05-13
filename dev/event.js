define(['exports'], function (exports) {
    /**
     * DOM event utilities
     */

    'use strict';

    var Event = {
        add: function add(obj, type, func, capture) {
            if (obj.addEventListener) {
                obj.addEventListener(type, func, capture);
            } else if (obj.attachEvent) {
                obj.attachEvent('on' + type, func);
            } else {
                obj['on' + type] = func;
            }
        },
        remove: function remove(obj, type, func, capture) {
            if (obj.detachEvent) {
                obj.detachEvent('on' + type, func);
            } else if (obj.removeEventListener) {
                obj.removeEventListener(type, func, capture);
            } else {
                obj['on' + type] = null;
            }
        },
        stop: function stop(evt) {
            if (!evt) {
                evt = window.event;
            }
            if (evt.stopPropagation) {
                evt.stopPropagation();
            } else {
                evt.cancelBubble = true;
            }
        },
        cancel: function cancel(evt) {
            if (!evt) {
                evt = window.event;
            }
            if (evt.preventDefault) {
                evt.preventDefault();
            } else {
                evt.returnValue = false;
            }
        },
        target: function target(evt) {
            return evt && evt.target || window.event && window.event.srcElement;
        },
        keyCode: function keyCode(evt) {
            return evt.charCode ? evt.charCode : evt.keyCode ? evt.keyCode : evt.which ? evt.which : 0;
        }
    };

    exports.Event = Event;
});
//# sourceMappingURL=event.js.map