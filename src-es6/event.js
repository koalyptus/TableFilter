/**
 * DOM event utilities
 */

var Event = {
    add: function(obj, type, func, capture){
        if(obj.attachEvent){
            obj.attachEvent('on'+type, func);
        }
        else if(obj.addEventListener){
            obj.addEventListener(type, func,
                (capture===undefined ? false : capture));
        } else{
            obj['on'+type] = func;
        }
    },
    remove: function(obj, type, func, capture){
        if(obj.detachEvent){
            obj.detachEvent('on'+type,func);
        }
        else if(obj.removeEventListener){
            obj.removeEventListener(type, func,
                (capture===undefined ? false : capture));
        } else {
            obj['on'+type] = null;
        }
    },
    stop: function(evt){
        if(!evt){
            evt = window.event;
        }
        if(evt.stopPropagation){
            evt.stopPropagation();
        } else {
            evt.cancelBubble = true;
        }
    },
    cancel: function(evt){
        if(!evt){
            evt = window.event;
        }
        if(evt.preventDefault) {
            evt.preventDefault();
        } else {
            evt.returnValue = false;
        }
    }
};

exports.Event = Event;
