/**
 * DOM event utilities
 */

define(function () {
    'use strict';

    var Event = {};

    Event.add = function(obj, type, func, capture){
        if(obj.attachEvent){
            obj.attachEvent('on'+type, func);
        }
        else if(obj.addEventListener){
            obj.addEventListener(type, func,
                (capture===undefined ? false : capture));
        } else{
            obj['on'+type] = func;
        }
    };

    Event.remove = function(obj, type, func, capture){
        if(obj.detachEvent){
            obj.detachEvent('on'+type,func);
        }
        else if(obj.removeEventListener){
            obj.removeEventListener(type, func,
                (capture===undefined ? false : capture));
        } else {
            obj['on'+type] = null;
        }
    };

    Event.stop = function(evt){
        if(!evt){
            evt = window.event;
        }
        if(evt.stopPropagation){
            evt.stopPropagation();
        } else {
            evt.cancelBubble = true;
        }
    };

    Event.cancel = function(evt){
        if(!evt){
            evt = window.event;
        }
        if(evt.preventDefault) {
            evt.preventDefault();
        } else {
            evt.returnValue = false;
        }
    };

    return Event;
});
