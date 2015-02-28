define(["exports"], function (exports) {
    "use strict";

    /**
     * DOM utilities
     */

    var Dom = {};

    /**
     * Returns text + text of children of given node
     * @param  {NodeElement} node
     * @return {String}
     */
    Dom.getText = function (node) {
        var s = node.textContent || node.innerText || node.innerHTML.replace(/<[^<>]+>/g, "");
        s = s.replace(/^\s+/, "").replace(/\s+$/, "");
        return s;
    };

    /**
     * Creates an html element with given collection of attributes
     * @param  {String} tag a string of the html tag to create
     * @param  {Array} an undetermined number of arrays containing the with 2
     *                    items, the attribute name and its value ['id','myId']
     * @return {Object}     created element
     */
    Dom.create = function (tag) {
        if (!tag || tag === "") {
            return;
        }

        var el = document.createElement(tag),
            args = arguments;

        if (args.length > 1) {
            for (var i = 0; i < args.length; i++) {
                var argtype = typeof args[i];
                if (argtype.toLowerCase() === "object" && args[i].length === 2) {
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
    Dom.text = function (text) {
        return document.createTextNode(text);
    };

    /**
     * Returns offset position of passed element
     * @param  {object} obj [description]
     * @return {object}     literal object with left and top values
     */
    Dom.position = function (obj) {
        var l = 0,
            t = 0;
        if (obj && obj.offsetParent) {
            do {
                l += obj.offsetLeft;
                t += obj.offsetTop;
            } while (obj == obj.offsetParent);
        }
        return { left: l, top: t };
    };

    Dom.hasClass = function (ele, cls) {
        if (!ele) {
            return false;
        }

        if (supportsClassList()) {
            return ele.classList.contains(cls);
        }
        return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
    };

    Dom.addClass = function (ele, cls) {
        if (!ele) {
            return;
        }

        if (supportsClassList()) {
            ele.classList.add(cls);
            return;
        }

        if (ele.className === "") {
            ele.className = cls;
        } else if (!this.hasClass(ele, cls)) {
            ele.className += " " + cls;
        }
    };

    Dom.removeClass = function (ele, cls) {
        if (!ele) {
            return;
        }

        if (supportsClassList()) {
            ele.classList.remove(cls);
            return;
        }
        var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)", "g");
        ele.className = ele.className.replace(reg, "");
    };

    /**
     * Creates and returns an option element
     * @param  {String}  text  option text
     * @param  {String}  value option value
     * @param  {Boolean} isSel whether option is selected
     * @return {Object}        option element
     */
    Dom.createOpt = function (text, value, isSel) {
        var isSelected = isSel ? true : false,
            opt = isSelected ? this.create("option", ["value", value], ["selected", "true"]) : this.create("option", ["value", value]);
        opt.appendChild(this.text(text));
        return opt;
    };

    /**
     * Creates and returns a checklist item
     * @param  {Number} chkIndex  index of check item
     * @param  {String} chkValue  check item value
     * @param  {String} labelText check item label text
     * @return {Object}           li DOM element
     */
    Dom.createCheckItem = function (chkIndex, chkValue, labelText) {
        var li = this.create("li"),
            label = this.create("label", ["for", chkIndex]),
            check = this.create("input", ["id", chkIndex], ["name", chkIndex], ["type", "checkbox"], ["value", chkValue]);
        label.appendChild(check);
        label.appendChild(this.text(labelText));
        li.appendChild(label);
        li.label = label;
        li.check = check;
        return li;
    };

    Dom.id = function (id) {
        return document.getElementById(id);
    };

    Dom.tag = function (o, tagname) {
        return o.getElementsByTagName(tagname);
    };

    // HTML5 classList API
    function supportsClassList() {
        return document.documentElement.classList;
    }

    exports.Dom = Dom;
});
//# sourceMappingURL=dom.js.map