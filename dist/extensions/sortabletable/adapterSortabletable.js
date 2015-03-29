
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.AdapterSortableTable = factory();//
    }
})(this, function() {define('types',["exports"], function (exports) {
    "use strict";

    /**
     * Types utilities
     */

    var Types = {};

    var UNDEFINED = void 0;

    /**
     * Checks if var exists and is an object
     * @param  {String or Object}  v
     * @return {Boolean}
     */
    Types.isObj = function (v) {
        var isO = false;
        if (typeof v === "string") {
            if (window[v] && typeof window[v] === "object") {
                isO = true;
            }
        } else {
            if (v && typeof v === "object") {
                isO = true;
            }
        }
        return isO;
    };

    /**
     * Checks if passed parameter is a function
     * @param  {Function} fn
     * @return {Boolean}
     */
    Types.isFn = function (fn) {
        return fn && fn.constructor == Function;
    };

    /**
     * Checks if passed param is an array
     * @param  {Array}  obj
     * @return {Boolean}
     */
    Types.isArray = function (obj) {
        return obj && obj.constructor == Array;
    };

    /**
     * Determines if passed param is undefined
     * @param  {Any}  o
     * @return {Boolean}
     */
    Types.isUndef = function (o) {
        return o === UNDEFINED;
    };

    exports.Types = Types;
});
//# sourceMappingURL=types.js.map;
define('dom',["exports"], function (exports) {
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
//# sourceMappingURL=dom.js.map;
define('string',["exports"], function (exports) {
    "use strict";

    /**
     * String utilities
     */

    var Str = {};

    Str.lower = function (text) {
        return text.toLowerCase();
    };

    Str.upper = function (text) {
        return text.toUpperCase();
    };

    Str.trim = function (text) {
        if (text.trim) {
            return text.trim();
        }
        return text.replace(/^\s*|\s*$/g, "");
    };

    Str.isEmpty = function (text) {
        return this.trim(text) === "";
    };

    Str.rgxEsc = function (text) {
        function escape(e) {
            var a = new RegExp("\\" + e, "g");
            text = text.replace(a, "\\" + e);
        }

        var chars = ["\\", "[", "^", "$", ".", "|", "?", "*", "+", "(", ")"];
        for (var e = 0; e < chars.length; e++) {
            escape(chars[e]);
        }
        return text;
    };

    Str.matchCase = function (text, mc) {
        if (!mc) {
            return this.lower(text);
        }
        return text;
    };

    exports.Str = Str;
});
//# sourceMappingURL=string.js.map;
define('array',["exports", "string"], function (exports, _string) {
    "use strict";

    /**
     * Array utilities
     */

    var Str = _string.Str;

    var Arr = {
        has: function has(arr, val, caseSensitive) {
            var sCase = caseSensitive === undefined ? false : caseSensitive;
            for (var i = 0; i < arr.length; i++) {
                if (Str.matchCase(arr[i].toString(), sCase) == val) {
                    return true;
                }
            }
            return false;
        },
        indexByValue: function indexByValue(arr, val, caseSensitive) {
            var sCase = caseSensitive === undefined ? false : caseSensitive;
            for (var i = 0; i < arr.length; i++) {
                if (Str.matchCase(arr[i].toString(), sCase) == val) {
                    return i;
                }
            }
            return -1;
        }
    };

    exports.Arr = Arr;
});
//# sourceMappingURL=array.js.map;
define('event',["exports"], function (exports) {
    "use strict";

    /**
     * DOM event utilities
     */

    var Event = {
        add: function add(obj, type, func, capture) {
            if (obj.addEventListener) {
                obj.addEventListener(type, func, capture);
            } else if (obj.attachEvent) {
                obj.attachEvent("on" + type, func);
            } else {
                obj["on" + type] = func;
            }
        },
        remove: function remove(obj, type, func, capture) {
            if (obj.detachEvent) {
                obj.detachEvent("on" + type, func);
            } else if (obj.removeEventListener) {
                obj.removeEventListener(type, func, capture);
            } else {
                obj["on" + type] = null;
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
        }
    };

    exports.Event = Event;
});
//# sourceMappingURL=event.js.map;
define('date',["exports"], function (exports) {
    "use strict";

    /**
     * Date utilities
     */

    var DateHelper = {
        isValid: function isValid(dateStr, format) {
            if (!format) {
                format = "DMY";
            }
            format = format.toUpperCase();
            if (format.length != 3) {
                if (format === "DDMMMYYYY") {
                    var d = this.format(dateStr, format);
                    dateStr = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
                    format = "DMY";
                }
            }
            if (format.indexOf("M") === -1 || format.indexOf("D") === -1 || format.indexOf("Y") === -1) {
                format = "DMY";
            }
            var reg1, reg2;
            // If the year is first
            if (format.substring(0, 1) == "Y") {
                reg1 = /^\d{2}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
                reg2 = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
            } else if (format.substring(1, 2) == "Y") {
                // If the year is second
                reg1 = /^\d{1,2}(\-|\/|\.)\d{2}\1\d{1,2}$/;
                reg2 = /^\d{1,2}(\-|\/|\.)\d{4}\1\d{1,2}$/;
            } else {
                // The year must be third
                reg1 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{2}$/;
                reg2 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/;
            }
            // If it doesn't conform to the right format (with either a 2 digit year or
            // 4 digit year), fail
            if (reg1.test(dateStr) === false && reg2.test(dateStr) === false) {
                return false;
            }
            // Split into 3 parts based on what the divider was
            var parts = dateStr.split(RegExp.$1);
            var mm, dd, yy;
            // Check to see if the 3 parts end up making a valid date
            if (format.substring(0, 1) === "M") {
                mm = parts[0];
            } else if (format.substring(1, 2) === "M") {
                mm = parts[1];
            } else {
                mm = parts[2];
            }
            if (format.substring(0, 1) === "D") {
                dd = parts[0];
            } else if (format.substring(1, 2) === "D") {
                dd = parts[1];
            } else {
                dd = parts[2];
            }
            if (format.substring(0, 1) === "Y") {
                yy = parts[0];
            } else if (format.substring(1, 2) === "Y") {
                yy = parts[1];
            } else {
                yy = parts[2];
            }
            if (parseInt(yy, 10) <= 50) {
                yy = (parseInt(yy, 10) + 2000).toString();
            }
            if (parseInt(yy, 10) <= 99) {
                yy = (parseInt(yy, 10) + 1900).toString();
            }
            var dt = new Date(parseInt(yy, 10), parseInt(mm, 10) - 1, parseInt(dd, 10), 0, 0, 0, 0);
            if (parseInt(dd, 10) != dt.getDate()) {
                return false;
            }
            if (parseInt(mm, 10) - 1 != dt.getMonth()) {
                return false;
            }
            return true;
        },
        format: (function (_format) {
            var _formatWrapper = function format(_x, _x2) {
                return _format.apply(this, arguments);
            };

            _formatWrapper.toString = function () {
                return _format.toString();
            };

            return _formatWrapper;
        })(function (dateStr, format) {
            if (!format) {
                format = "DMY";
            }
            if (!dateStr || dateStr === "") {
                return new Date(1001, 0, 1);
            }
            var oDate, parts;

            function y2kDate(yr) {
                if (yr === undefined) {
                    return 0;
                }
                if (yr.length > 2) {
                    return yr;
                }
                var y;
                //>50 belong to 1900
                if (yr <= 99 && yr > 50) {
                    y = "19" + yr;
                }
                //<50 belong to 2000
                if (yr < 50 || yr === "00") {
                    y = "20" + yr;
                }
                return y;
            }

            function mmm2mm(mmm) {
                if (mmm === undefined) {
                    return 0;
                }
                var mondigit;
                var MONTH_NAMES = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december", "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
                for (var m_i = 0; m_i < MONTH_NAMES.length; m_i++) {
                    var month_name = MONTH_NAMES[m_i];
                    if (mmm.toLowerCase() === month_name) {
                        mondigit = m_i + 1;
                        break;
                    }
                }
                if (mondigit > 11 || mondigit < 23) {
                    mondigit = mondigit - 12;
                }
                if (mondigit < 1 || mondigit > 12) {
                    return 0;
                }
                return mondigit;
            }

            switch (format.toUpperCase()) {
                case "DDMMMYYYY":
                    parts = dateStr.replace(/[- \/.]/g, " ").split(" ");
                    oDate = new Date(y2kDate(parts[2]), mmm2mm(parts[1]) - 1, parts[0]);
                    break;
                case "DMY":
                    parts = dateStr.replace(/^(0?[1-9]|[12][0-9]|3[01])([- \/.])(0?[1-9]|1[012])([- \/.])((\d\d)?\d\d)$/, "$1 $3 $5").split(" ");
                    oDate = new Date(y2kDate(parts[2]), parts[1] - 1, parts[0]);
                    break;
                case "MDY":
                    parts = dateStr.replace(/^(0?[1-9]|1[012])([- \/.])(0?[1-9]|[12][0-9]|3[01])([- \/.])((\d\d)?\d\d)$/, "$1 $3 $5").split(" ");
                    oDate = new Date(y2kDate(parts[2]), parts[0] - 1, parts[1]);
                    break;
                case "YMD":
                    parts = dateStr.replace(/^((\d\d)?\d\d)([- \/.])(0?[1-9]|1[012])([- \/.])(0?[1-9]|[12][0-9]|3[01])$/, "$1 $4 $6").split(" ");
                    oDate = new Date(y2kDate(parts[0]), parts[1] - 1, parts[2]);
                    break;
                default:
                    //in case format is not correct
                    parts = dateStr.replace(/^(0?[1-9]|[12][0-9]|3[01])([- \/.])(0?[1-9]|1[012])([- \/.])((\d\d)?\d\d)$/, "$1 $3 $5").split(" ");
                    oDate = new Date(y2kDate(parts[2]), parts[1] - 1, parts[0]);
                    break;
            }
            return oDate;
        })
    };

    exports.DateHelper = DateHelper;
});
//# sourceMappingURL=date.js.map;
define('helpers',["exports"], function (exports) {
    "use strict";

    /**
     * Misc helpers
     */

    var Helpers = {
        isIE: function isIE() {
            return /msie|MSIE/.test(navigator.userAgent);
        },

        removeNbFormat: function removeNbFormat(data, format) {
            if (!data) {
                return;
            }
            if (!format) {
                format = "us";
            }
            var n = data;
            if (str.lower(format) === "us") {
                n = +n.replace(/[^\d\.-]/g, "");
            } else {
                n = +n.replace(/[^\d\,-]/g, "").replace(",", ".");
            }
            return n;
        }
    };

    exports.Helpers = Helpers;
});
//# sourceMappingURL=helpers.js.map;
define('extensions/sortabletable/adapterSortabletable',["exports", "module", "../../types", "../../dom", "../../array", "../../event", "../../date", "../../helpers"], function (exports, module, _types, _dom, _array, _event, _date, _helpers) {
    "use strict";

    var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    var Types = _types.Types;
    var Dom = _dom.Dom;
    var array = _array.Arr;
    var Event = _event.Event;
    var DateHelper = _date.DateHelper;
    var Helpers = _helpers.Helpers;

    var AdapterSortableTable = (function () {

        /**
         * SortableTable Adapter module
         * @param {Object} tf TableFilter instance
         */

        function AdapterSortableTable(tf) {
            _classCallCheck(this, AdapterSortableTable);

            // Configuration object
            var f = tf.config();

            this.isPaged = false;

            //indicates if tables was sorted
            this.sorted = false;

            // edit .sort-arrow.descending / .sort-arrow.ascending in filtergrid.css
            // to reflect any path change
            this.sortImgPath = f.sort_images_path || tf.themesPath;
            this.sortImgBlank = f.sort_image_blank || "blank.png";
            this.sortImgClassName = f.sort_image_class_name || "sort-arrow";
            this.sortImgAscClassName = f.sort_image_asc_class_name || "ascending";
            this.sortImgDescClassName = f.sort_image_desc_class_name || "descending";
            //cell attribute storing custom key
            this.sortCustomKey = f.sort_custom_key || "data-tf-sortKey";

            /*** TF additional events ***/
            //additional paging events for alternating background
            // o.Evt._Paging.nextEvt = function(){ if(o.sorted && o.alternateBgs) o.Filter(); }
            // o.Evt._Paging.prevEvt = o.Evt._Paging.nextEvt;
            // o.Evt._Paging.firstEvt = o.Evt._Paging.nextEvt;
            // o.Evt._Paging.lastEvt = o.Evt._Paging.nextEvt;
            // o.Evt._OnSlcPagesChangeEvt = o.Evt._Paging.nextEvt;

            // callback invoked after sort is loaded and instanciated
            this.onSortLoaded = Types.isFn(f.on_sort_loaded) ? f.on_sort_loaded : null;
            // callback invoked before table is sorted
            this.onBeforeSort = Types.isFn(f.on_before_sort) ? f.on_before_sort : null;
            // callback invoked after table is sorted
            this.onAfterSort = Types.isFn(f.on_after_sort) ? f.on_after_sort : null;

            this.tf = tf;
        }

        _prototypeProperties(AdapterSortableTable, null, {
            init: {
                value: function init() {
                    var tf = this.tf;
                    var sortConfig = tf.sortConfig;

                    // SortableTable class sanity check (sortabletable.js)
                    if (Types.isUndef(SortableTable)) {
                        throw new Error("SortableTable class not found.");
                    }

                    this.overrideSortableTable();
                    this.setSortTypes();

                    //Column sort at start
                    if (sortConfig.sortCol) {
                        this.stt.sort(sortConfig.sortCol[0], sortConfig.sortCol[1]);
                    }

                    tf.isSortEnabled = true;
                    if (this.onSortLoaded) {
                        this.onSortLoaded.call(null, tf, this);
                    }

                    /*** SortableTable callbacks ***/
                    this.stt.onbeforesort = function () {
                        if (this.onBeforeSort) {
                            this.onBeforeSort.call(null, tf, this.stt.sortColumn);
                        }

                        tf.performSort();

                        /*** sort behaviour for paging ***/
                        if (tf.paging) {
                            this.isPaged = true;
                            tf.paging = false;
                            tf.Cpt.paging.destroy();
                        }
                    };

                    this.stt.onsort = function () {
                        this.sorted = true;

                        //rows alternating bg issue
                        // TODO: move into AlternateRows component
                        if (tf.alternateBgs) {
                            var rows = tf.tbl.rows,
                                c = 0;

                            var setClass = function setClass(row, i, removeOnly) {
                                if (Types.isUndef(removeOnly)) {
                                    removeOnly = false;
                                }
                                var altRows = tf.Cpt.alternateRows,
                                    oddCls = altRows.oddCss,
                                    evenCls = altRows.evenCss;
                                Dom.removeClass(row, oddCls);
                                Dom.removeClass(row, evenCls);

                                if (!removeOnly) {
                                    Dom.addClass(row, i % 2 ? oddCls : evenCls);
                                }
                            };

                            for (var i = tf.refRow; i < tf.nbRows; i++) {
                                var isRowValid = rows[i].getAttribute("validRow");
                                if (tf.paging && rows[i].style.display === "") {
                                    setClass(rows[i], c);
                                    c++;
                                } else {
                                    if ((isRowValid === "true" || isRowValid === null) && rows[i].style.display === "") {
                                        setClass(rows[i], c);
                                        c++;
                                    } else {
                                        setClass(rows[i], c, true);
                                    }
                                }
                            }
                        }
                        //sort behaviour for paging
                        if (this.isPaged) {
                            var paginator = tf.Cpt.paging,
                                config = tf.config();
                            if (paginator.hasResultsPerPage) {
                                var slc = paginator.resultsPerPageSlc;
                                config.paging_length = slc.options[slc.selectedIndex].value;
                            }
                            paginator.addPaging(false);
                            paginator.setPage(paginator.currentPageNb);
                            this.isPaged = false;
                        }

                        if (this.onAfterSort) {
                            this.onAfterSort.call(null, tf, tf.stt.sortColumn);
                        }
                    };
                },
                writable: true,
                configurable: true
            },
            overrideSortableTable: {
                value: function overrideSortableTable() {
                    var adpt = this,
                        tf = this.tf;

                    /**
                     * Overrides headerOnclick method in order to handle th event
                     * @param  {Object} e [description]
                     */
                    SortableTable.prototype.headerOnclick = function (evt) {
                        if (!tf.sort) {
                            return;
                        }
                        // find Header element
                        var el = evt.target || evt.srcElement,
                            tagName = el.tagName;

                        while (tagName !== "TD" && tagName !== "TH") {
                            el = el.parentNode;
                        }

                        this.sort(SortableTable.msie ? SortableTable.getCellIndex(el) : el.cellIndex);
                    };

                    /**
                     * Overrides getCellIndex IE returns wrong cellIndex when columns are
                     * hidden
                     * @param  {Object} oTd TD element
                     * @return {Number}     Cell index
                     */
                    SortableTable.getCellIndex = function (oTd) {
                        var cells = oTd.parentNode.cells,
                            l = cells.length,
                            i;
                        for (i = 0; cells[i] != oTd && i < l; i++) {}
                        return i;
                    };

                    /**
                     * Overrides initHeader in order to handle filters row position
                     * @param  {Array} oSortTypes
                     */
                    SortableTable.prototype.initHeader = function (oSortTypes) {
                        var stt = this;
                        if (!stt.tHead) {
                            throw new Error("Sorting feature requires a THEAD element");
                        }
                        stt.headersRow = tf.headersRow;
                        var cells = stt.tHead.rows[stt.headersRow].cells;
                        var doc = stt.tHead.ownerDocument || stt.tHead.document;
                        stt.sortTypes = oSortTypes || [];
                        var l = cells.length;
                        var img, c;
                        for (var i = 0; i < l; i++) {
                            c = cells[i];
                            if (stt.sortTypes[i] !== null && stt.sortTypes[i] !== "None") {
                                c.style.cursor = "pointer";
                                img = Dom.create("img", ["src", adpt.sortImgPath + adpt.sortImgBlank]);
                                c.appendChild(img);
                                if (stt.sortTypes[i] !== null) {
                                    c.setAttribute("_sortType", stt.sortTypes[i]);
                                }
                                Event.add(c, "click", stt._headerOnclick);
                            } else {
                                c.setAttribute("_sortType", oSortTypes[i]);
                                c._sortType = "None";
                            }
                        }
                        stt.updateHeaderArrows();
                    };

                    /**
                     * Overrides updateHeaderArrows in order to handle arrows indicators
                     */
                    SortableTable.prototype.updateHeaderArrows = function () {
                        var stt = this;
                        var cells, l, img;
                        // external headers
                        if (tf.sortConfig.asyncSort && tf.sortConfig.triggerIds !== null) {
                            var triggers = tf.sortConfig.triggerIds;
                            cells = [];
                            l = triggers.length;
                            for (var j = 0; j < triggers.length; j++) {
                                cells.push(Dom.id(triggers[j]));
                            }
                        } else {
                            if (!this.tHead) {
                                return;
                            }
                            cells = stt.tHead.rows[stt.headersRow].cells;
                            l = cells.length;
                        }
                        for (var i = 0; i < l; i++) {
                            var cellAttr = cells[i].getAttribute("_sortType");
                            if (cellAttr !== null && cellAttr !== "None") {
                                img = cells[i].lastChild || cells[i];
                                if (img.nodeName.toLowerCase() !== "img") {
                                    img = Dom.create("img", ["src", adpt.sortImgPath + adpt.sortImgBlank]);
                                    cells[i].appendChild(img);
                                }
                                if (i === stt.sortColumn) {
                                    img.className = adpt.sortImgClassName + " " + (this.descending ? adpt.sortImgDescClassName : adpt.sortImgAscClassName);
                                } else {
                                    img.className = adpt.sortImgClassName;
                                }
                            }
                        }
                    };

                    /**
                     * Overrides getRowValue for custom key value feature
                     * @param  {Object} oRow    Row element
                     * @param  {String} sType
                     * @param  {Number} nColumn
                     * @return {String}
                     */
                    SortableTable.prototype.getRowValue = function (oRow, sType, nColumn) {
                        var stt = this;
                        // if we have defined a custom getRowValue use that
                        var sortTypeInfo = stt._sortTypeInfo[sType];
                        if (sortTypeInfo && sortTypeInfo.getRowValue) {
                            return sortTypeInfo.getRowValue(oRow, nColumn);
                        }
                        var c = oRow.cells[nColumn];
                        var s = SortableTable.getInnerText(c);
                        return stt.getValueFromString(s, sType);
                    };

                    /**
                     * Overrides getInnerText in order to avoid Firefox unexpected sorting
                     * behaviour with untrimmed text elements
                     * @param  {Object} oNode DOM element
                     * @return {String}       DOM element inner text
                     */
                    SortableTable.getInnerText = function (oNode) {
                        if (oNode.getAttribute(tf.sortCustomKey) != null) {
                            return oNode.getAttribute(tf.sortCustomKey);
                        } else {
                            return Dom.getText(oNode);
                        }
                    };
                },
                writable: true,
                configurable: true
            },
            setSortTypes: {
                value: function setSortTypes() {
                    var _this = this;

                    var tf = this.tf,
                        configSort = tf.sortConfig,
                        configSortTypes = configSort.sortTypes,
                        sortTypes = [];

                    for (var i = 0; i < tf.nbCells; i++) {
                        var colType;

                        if (configSortTypes !== null && configSortTypes[i] != null) {
                            colType = configSortTypes[i].toLowerCase();
                            if (colType === "none") {
                                colType = "None";
                            }
                        } else {
                            // resolve column types
                            if (tf.hasColNbFormat && tf.colNbFormat[i] !== null) {
                                colType = tf.colNbFormat[i].toLowerCase();
                            } else if (tf.hasColDateType && tf.colDateType[i] !== null) {
                                colType = tf.colDateType[i].toLowerCase() + "date";
                            } else {
                                colType = "String";
                            }
                        }
                        sortTypes.push(colType);
                    }

                    //Public TF method to add sort type
                    this.addSortType = function () {
                        SortableTable.prototype.addSortType(arguments[0], arguments[1], arguments[2], arguments[3]);
                    };

                    //Custom sort types
                    this.addSortType("number", Number);
                    this.addSortType("caseinsensitivestring", SortableTable.toUpperCase);
                    this.addSortType("date", SortableTable.toDate);
                    this.addSortType("string");
                    this.addSortType("us", this.usNumberConverter);
                    this.addSortType("eu", this.euNumberConverter);
                    this.addSortType("dmydate", this.dmyDateConverter);
                    this.addSortType("ymddate", this.ymdDateConverter);
                    this.addSortType("mdydate", this.mdyDateConverter);
                    this.addSortType("ddmmmyyyydate", this.ddmmmyyyyDateConverter);
                    this.addSortType("ipaddress", this.ipAddress, this.sortIP);

                    this.stt = new SortableTable(tf.tbl, sortTypes);

                    /*** external table headers adapter ***/
                    if (configSort.asyncSort && configSort.triggerIds !== null) {
                        var triggers = configSort.triggerIds;
                        for (var j = 0; j < triggers.length; j++) {
                            if (triggers[j] === null) {
                                continue;
                            }
                            var trigger = Dom.id(triggers[j]);
                            if (trigger) {
                                trigger.style.cursor = "pointer";
                                // trigger.onclick = function(){
                                //     if(o.sort)
                                //         o.st.asyncSort( triggers.tf_IndexByValue(this.id, true) );
                                // }
                                Event.add(trigger, "click", function (evt) {
                                    var elm = evt.target;
                                    if (!_this.tf.sort) {
                                        return;
                                    }
                                    _this.stt.asyncSort(
                                    // triggers.tf_IndexByValue(this.id, true)
                                    Arr.indexByValue(triggers, elm.id, true));
                                });
                                trigger.setAttribute("_sortType", sortTypes[j]);
                            }
                        }
                    }
                },
                writable: true,
                configurable: true
            },
            usNumberConverter: {

                //Converters

                value: function usNumberConverter(s) {
                    return Helpers.removeNbFormat(s, "us");
                },
                writable: true,
                configurable: true
            },
            euNumberConverter: {
                value: function euNumberConverter(s) {
                    return Helpers.removeNbFormat(s, "eu");
                },
                writable: true,
                configurable: true
            },
            dateConverter: {
                value: function dateConverter(s, format) {
                    return DateHelper.format(s, format);
                },
                writable: true,
                configurable: true
            },
            dmyDateConverter: {
                value: function dmyDateConverter(s) {
                    return this.dateConverter(s, "DMY");
                },
                writable: true,
                configurable: true
            },
            mdyDateConverter: {
                value: function mdyDateConverter(s) {
                    return this.dateConverter(s, "MDY");
                },
                writable: true,
                configurable: true
            },
            ymdDateConverter: {
                value: function ymdDateConverter(s) {
                    return this.dateConverter(s, "YMD");
                },
                writable: true,
                configurable: true
            },
            ddmmmyyyyDateConverter: {
                value: function ddmmmyyyyDateConverter(s) {
                    return this.dateConverter(s, "DDMMMYYYY");
                },
                writable: true,
                configurable: true
            },
            ipAddress: {
                value: function ipAddress(value) {
                    var vals = value.split(".");
                    for (var x in vals) {
                        var val = vals[x];
                        while (3 > val.length) {
                            val = "0" + val;
                        }
                        vals[x] = val;
                    }
                    return vals.join(".");
                },
                writable: true,
                configurable: true
            },
            sortIP: {
                value: function sortIP(a, b) {
                    var aa = this.ipAddress(a.value.toLowerCase());
                    var bb = this.ipAddress(b.value.toLowerCase());
                    if (aa == bb) {
                        return 0;
                    } else if (aa < bb) {
                        return -1;
                    } else {
                        return 1;
                    }
                },
                writable: true,
                configurable: true
            }
        });

        return AdapterSortableTable;
    })();

    module.exports = AdapterSortableTable;
});
//# sourceMappingURL=adapterSortabletable.js.map;
/*----------------------------------------------------------------------------\
|                            Sortable Table 1.12                              |
|-----------------------------------------------------------------------------|
|                         Created by Erik Arvidsson                           |
|                  (http://webfx.eae.net/contact.html#erik)                   |
|                      For WebFX (http://webfx.eae.net/)                      |
|-----------------------------------------------------------------------------|
| A DOM 1 based script that allows an ordinary HTML table to be sortable.     |
|-----------------------------------------------------------------------------|
|                  Copyright (c) 1998 - 2006 Erik Arvidsson                   |
|-----------------------------------------------------------------------------|
| Licensed under the Apache License, Version 2.0 (the "License"); you may not |
| use this file except in compliance with the License.  You may obtain a copy |
| of the License at http://www.apache.org/licenses/LICENSE-2.0                |
| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - |
| Unless  required  by  applicable law or  agreed  to  in  writing,  software |
| distributed under the License is distributed on an  "AS IS" BASIS,  WITHOUT |
| WARRANTIES OR  CONDITIONS OF ANY KIND,  either express or implied.  See the |
| License  for the  specific language  governing permissions  and limitations |
| under the License.                                                          |
|-----------------------------------------------------------------------------|
| 2003-01-10 | First version                                                  |
| 2003-01-19 | Minor changes to the date parsing                              |
| 2003-01-28 | JScript 5.0 fixes (no support for 'in' operator)               |
| 2003-02-01 | Sloppy typo like error fixed in getInnerText                   |
| 2003-07-04 | Added workaround for IE cellIndex bug.                         |
| 2003-11-09 | The bDescending argument to sort was not correctly working     |
|            | Using onclick DOM0 event if no support for addEventListener    |
|            | or attachEvent                                                 |
| 2004-01-13 | Adding addSortType and removeSortType which makes it a lot     |
|            | easier to add new, custom sort types.                          |
| 2004-01-27 | Switch to use descending = false as the default sort order.    |
|            | Change defaultDescending to suit your needs.                   |
| 2004-03-14 | Improved sort type None look and feel a bit                    |
| 2004-08-26 | Made the handling of tBody and tHead more flexible. Now you    |
|            | can use another tHead or no tHead, and you can chose some      |
|            | other tBody.                                                   |
| 2006-04-25 | Changed license to Apache Software License 2.0                 |
|-----------------------------------------------------------------------------|
| Created 2003-01-10 | All changes are in the log above. | Updated 2006-04-25 |
\----------------------------------------------------------------------------*/


function SortableTable(oTable, oSortTypes) {

	this.sortTypes = oSortTypes || [];

	this.sortColumn = null;
	this.descending = null;

	var oThis = this;
	this._headerOnclick = function (e) {
		oThis.headerOnclick(e);
	};

	if (oTable) {
		this.setTable( oTable );
		this.document = oTable.ownerDocument || oTable.document;
	}
	else {
		this.document = document;
	}


	// only IE needs this
	var win = this.document.defaultView || this.document.parentWindow;
	this._onunload = function () {
		oThis.destroy();
	};
	if (win && typeof win.attachEvent != "undefined") {
		win.attachEvent("onunload", this._onunload);
	}
}

SortableTable.gecko = navigator.product == "Gecko";
SortableTable.msie = /msie/i.test(navigator.userAgent);
// Mozilla is faster when doing the DOM manipulations on
// an orphaned element. MSIE is not
SortableTable.removeBeforeSort = SortableTable.gecko;

SortableTable.prototype.onsort = function () {};

// default sort order. true -> descending, false -> ascending
SortableTable.prototype.defaultDescending = false;

// shared between all instances. This is intentional to allow external files
// to modify the prototype
SortableTable.prototype._sortTypeInfo = {};

SortableTable.prototype.setTable = function (oTable) {
	if ( this.tHead )
		this.uninitHeader();
	this.element = oTable;
	this.setTHead( oTable.tHead );
	this.setTBody( oTable.tBodies[0] );
};

SortableTable.prototype.setTHead = function (oTHead) {
	if (this.tHead && this.tHead != oTHead )
		this.uninitHeader();
	this.tHead = oTHead;
	this.initHeader( this.sortTypes );
};

SortableTable.prototype.setTBody = function (oTBody) {
	this.tBody = oTBody;
};

SortableTable.prototype.setSortTypes = function ( oSortTypes ) {
	if ( this.tHead )
		this.uninitHeader();
	this.sortTypes = oSortTypes || [];
	if ( this.tHead )
		this.initHeader( this.sortTypes );
};

// adds arrow containers and events
// also binds sort type to the header cells so that reordering columns does
// not break the sort types
SortableTable.prototype.initHeader = function (oSortTypes) {
	if (!this.tHead) return;
	var cells = this.tHead.rows[0].cells;
	var doc = this.tHead.ownerDocument || this.tHead.document;
	this.sortTypes = oSortTypes || [];
	var l = cells.length;
	var img, c;
	for (var i = 0; i < l; i++) {
		c = cells[i];
		if (this.sortTypes[i] != null && this.sortTypes[i] != "None") {
			img = doc.createElement("IMG");
			img.src = "images/blank.png";
			c.appendChild(img);
			if (this.sortTypes[i] != null)
				c._sortType = this.sortTypes[i];
			if (typeof c.addEventListener != "undefined")
				c.addEventListener("click", this._headerOnclick, false);
			else if (typeof c.attachEvent != "undefined")
				c.attachEvent("onclick", this._headerOnclick);
			else
				c.onclick = this._headerOnclick;
		}
		else
		{
			c.setAttribute( "_sortType", oSortTypes[i] );
			c._sortType = "None";
		}
	}
	this.updateHeaderArrows();
};

// remove arrows and events
SortableTable.prototype.uninitHeader = function () {
	if (!this.tHead) return;
	var cells = this.tHead.rows[0].cells;
	var l = cells.length;
	var c;
	for (var i = 0; i < l; i++) {
		c = cells[i];
		if (c._sortType != null && c._sortType != "None") {
			c.removeChild(c.lastChild);
			if (typeof c.removeEventListener != "undefined")
				c.removeEventListener("click", this._headerOnclick, false);
			else if (typeof c.detachEvent != "undefined")
				c.detachEvent("onclick", this._headerOnclick);
			c._sortType = null;
			c.removeAttribute( "_sortType" );
		}
	}
};

SortableTable.prototype.updateHeaderArrows = function () {
	if (!this.tHead) return;
	var cells = this.tHead.rows[0].cells;
	var l = cells.length;
	var img;
	for (var i = 0; i < l; i++) {
		if (cells[i]._sortType != null && cells[i]._sortType != "None") {
			img = cells[i].lastChild;
			if (i == this.sortColumn)
				img.className = "sort-arrow " + (this.descending ? "descending" : "ascending");
			else
				img.className = "sort-arrow";
		}
	}
};

SortableTable.prototype.headerOnclick = function (e) {
	// find TD element
	var el = e.target || e.srcElement;
	while (el.tagName != "TD")
		el = el.parentNode;

	this.sort(SortableTable.msie ? SortableTable.getCellIndex(el) : el.cellIndex);
};

// IE returns wrong cellIndex when columns are hidden
SortableTable.getCellIndex = function (oTd) {
	var cells = oTd.parentNode.childNodes
	var l = cells.length;
	var i;
	for (i = 0; cells[i] != oTd && i < l; i++)
		;
	return i;
};

SortableTable.prototype.getSortType = function (nColumn) {
	return this.sortTypes[nColumn] || "String";
};

// only nColumn is required
// if bDescending is left out the old value is taken into account
// if sSortType is left out the sort type is found from the sortTypes array

SortableTable.prototype.sort = function (nColumn, bDescending, sSortType) {
	if (!this.tBody) return;
	if (sSortType == null)
		sSortType = this.getSortType(nColumn);

	// exit if None
	if (sSortType == "None")
		return;

	if (bDescending == null) {
		if (this.sortColumn != nColumn)
			this.descending = this.defaultDescending;
		else
			this.descending = !this.descending;
	}
	else
		this.descending = bDescending;

	this.sortColumn = nColumn;

	if (typeof this.onbeforesort == "function")
		this.onbeforesort();

	var f = this.getSortFunction(sSortType, nColumn);
	var a = this.getCache(sSortType, nColumn);
	var tBody = this.tBody;

	a.sort(f);

	if (this.descending)
		a.reverse();

	if (SortableTable.removeBeforeSort) {
		// remove from doc
		var nextSibling = tBody.nextSibling;
		var p = tBody.parentNode;
		p.removeChild(tBody);
	}

	// insert in the new order
	var l = a.length;
	for (var i = 0; i < l; i++)
		tBody.appendChild(a[i].element);

	if (SortableTable.removeBeforeSort) {
		// insert into doc
		p.insertBefore(tBody, nextSibling);
	}

	this.updateHeaderArrows();

	this.destroyCache(a);

	if (typeof this.onsort == "function")
		this.onsort();
};

SortableTable.prototype.asyncSort = function (nColumn, bDescending, sSortType) {
	var oThis = this;
	this._asyncsort = function () {
		oThis.sort(nColumn, bDescending, sSortType);
	};
	window.setTimeout(this._asyncsort, 1);
};

SortableTable.prototype.getCache = function (sType, nColumn) {
	if (!this.tBody) return [];
	var rows = this.tBody.rows;
	var l = rows.length;
	var a = new Array(l);
	var r;
	for (var i = 0; i < l; i++) {
		r = rows[i];
		a[i] = {
			value:		this.getRowValue(r, sType, nColumn),
			element:	r
		};
	};
	return a;
};

SortableTable.prototype.destroyCache = function (oArray) {
	var l = oArray.length;
	for (var i = 0; i < l; i++) {
		oArray[i].value = null;
		oArray[i].element = null;
		oArray[i] = null;
	}
};

SortableTable.prototype.getRowValue = function (oRow, sType, nColumn) {
	// if we have defined a custom getRowValue use that
	if (this._sortTypeInfo[sType] && this._sortTypeInfo[sType].getRowValue)
		return this._sortTypeInfo[sType].getRowValue(oRow, nColumn);

	var s;
	var c = oRow.cells[nColumn];
	if (typeof c.innerText != "undefined")
		s = c.innerText;
	else
		s = SortableTable.getInnerText(c);
	return this.getValueFromString(s, sType);
};

SortableTable.getInnerText = function (oNode) {
	var s = "";
	var cs = oNode.childNodes;
	var l = cs.length;
	for (var i = 0; i < l; i++) {
		switch (cs[i].nodeType) {
			case 1: //ELEMENT_NODE
				s += SortableTable.getInnerText(cs[i]);
				break;
			case 3:	//TEXT_NODE
				s += cs[i].nodeValue;
				break;
		}
	}
	return s;
};

SortableTable.prototype.getValueFromString = function (sText, sType) {
	if (this._sortTypeInfo[sType])
		return this._sortTypeInfo[sType].getValueFromString( sText );
	return sText;
	/*
	switch (sType) {
		case "Number":
			return Number(sText);
		case "CaseInsensitiveString":
			return sText.toUpperCase();
		case "Date":
			var parts = sText.split("-");
			var d = new Date(0);
			d.setFullYear(parts[0]);
			d.setDate(parts[2]);
			d.setMonth(parts[1] - 1);
			return d.valueOf();
	}
	return sText;
	*/
	};

SortableTable.prototype.getSortFunction = function (sType, nColumn) {
	if (this._sortTypeInfo[sType])
		return this._sortTypeInfo[sType].compare;
	return SortableTable.basicCompare;
};

SortableTable.prototype.destroy = function () {
	this.uninitHeader();
	var win = this.document.parentWindow;
	if (win && typeof win.detachEvent != "undefined") {	// only IE needs this
		win.detachEvent("onunload", this._onunload);
	}
	this._onunload = null;
	this.element = null;
	this.tHead = null;
	this.tBody = null;
	this.document = null;
	this._headerOnclick = null;
	this.sortTypes = null;
	this._asyncsort = null;
	this.onsort = null;
};

// Adds a sort type to all instance of SortableTable
// sType : String - the identifier of the sort type
// fGetValueFromString : function ( s : string ) : T - A function that takes a
//    string and casts it to a desired format. If left out the string is just
//    returned
// fCompareFunction : function ( n1 : T, n2 : T ) : Number - A normal JS sort
//    compare function. Takes two values and compares them. If left out less than,
//    <, compare is used
// fGetRowValue : function( oRow : HTMLTRElement, nColumn : int ) : T - A function
//    that takes the row and the column index and returns the value used to compare.
//    If left out then the innerText is first taken for the cell and then the
//    fGetValueFromString is used to convert that string the desired value and type

SortableTable.prototype.addSortType = function (sType, fGetValueFromString, fCompareFunction, fGetRowValue) {
	this._sortTypeInfo[sType] = {
		type:				sType,
		getValueFromString:	fGetValueFromString || SortableTable.idFunction,
		compare:			fCompareFunction || SortableTable.basicCompare,
		getRowValue:		fGetRowValue
	};
};

// this removes the sort type from all instances of SortableTable
SortableTable.prototype.removeSortType = function (sType) {
	delete this._sortTypeInfo[sType];
};

SortableTable.basicCompare = function compare(n1, n2) {
	if (n1.value < n2.value)
		return -1;
	if (n2.value < n1.value)
		return 1;
	return 0;
};

SortableTable.idFunction = function (x) {
	return x;
};

SortableTable.toUpperCase = function (s) {
	return s.toUpperCase();
};

SortableTable.toDate = function (s) {
	var parts = s.split("-");
	var d = new Date(0);
	d.setFullYear(parts[0]);
	d.setDate(parts[2]);
	d.setMonth(parts[1] - 1);
	return d.valueOf();
};


// add sort types
SortableTable.prototype.addSortType("Number", Number);
SortableTable.prototype.addSortType("CaseInsensitiveString", SortableTable.toUpperCase);
SortableTable.prototype.addSortType("Date", SortableTable.toDate);
SortableTable.prototype.addSortType("String");
// None is a special case
;
define("extensions/sortabletable/sortabletable", function(){});


    return require('extensions/sortabletable/adapterSortabletable');

});