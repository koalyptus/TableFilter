/**
 * DOM utilities
 */

(function(window, TF){
    'use strict';

    TF.Dom = {};

    /**
     * Returns text + text of children of given node
     * @param  {NodeElement} node
     * @return {String}
     */
    TF.Dom.getText = function(node){
        var s = node.textContent || node.innerText ||
                node.innerHTML.replace(/<[^<>]+>/g, '');
        s = s.replace(/^\s+/, '').replace(/\s+$/, '');
        return s/*.tf_Trim()*/;
    };

    /**
     * Creates an html element with given collection of attributes
     * @param  {String} tag a string of the html tag to create
     * @param  {Array} an undetermined number of arrays containing the with 2
     *                    items, the attribute name and its value ['id','myId']
     * @return {Object}     created element
     */
    TF.Dom.create = function(tag){
        if(!tag || tag===''){
            return;
        }

        var el = document.createElement(tag),
            args = arguments;

        if(args.length > 1){
            for(var i=0; i<args.length; i++){
                var argtype = typeof args[i];
                if(argtype.toLowerCase() === 'object' && args[i].length === 2){
                    el.setAttribute(args[i][0], args[i][1]);
                }
            }
        }
        return el;
    };

    /**
     * Returns a text node with given text
     * @param  {String} text
     * @return {Object}
     */
    TF.Dom.text = function(text){
        return document.createTextNode(text);
    };

    /**
     * Returns offset position of passed element
     * @param  {object} obj [description]
     * @return {object}     literal object with left and top values
     */
    TF.Dom.position = function(obj){
        var l = 0, t = 0;
        if (obj && obj.offsetParent){
            do {
                l += obj.offsetLeft;
                t += obj.offsetTop;
            } while (obj == obj.offsetParent);
        }
        return { 'left': l, 'top': t };
    };

    TF.Dom.hasClass = function (ele, cls){
        if(!ele){ return false; }

        if(supportsClassList()){
            return ele.classList.contains(cls);
        }
        return ele.className.match(new RegExp('(\\s|^)'+ cls +'(\\s|$)'));
    };

    TF.Dom.addClass = function (ele, cls){
        if(!ele){ return; }

        if(supportsClassList()){
            ele.classList.add(cls);
            return;
        }

        if(ele.className === ''){
            ele.className = cls;
        }
        else if(!this.hasClass(ele, cls)){
            ele.className += " " + cls;
        }
    };

    TF.Dom.removeClass = function (ele, cls){
        if(!ele){ return; }

        if(supportsClassList()){
            ele.classList.remove(cls);
            return;
        }
        var reg = new RegExp('(\\s|^)'+ cls +'(\\s|$)', 'g');
        ele.className = ele.className.replace(reg, '');
    };

    // HTML5 classList API
    function supportsClassList(){
        return document.documentElement.classList;
    }

})(this, this.TF || {});
