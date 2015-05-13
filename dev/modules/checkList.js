define(['exports', '../dom', '../array', '../string', '../sort', '../event'], function (exports, _dom, _array, _string, _sort, _event) {
    'use strict';

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    var CheckList = (function () {

        /**
         * Checklist UI component
         * @param {Object} tf TableFilter instance
         */

        function CheckList(tf) {
            _classCallCheck(this, CheckList);

            // Configuration object
            var f = tf.config();

            this.checkListDiv = []; //checklist container div
            //defines css class for div containing checklist filter
            this.checkListDivCssClass = f.div_checklist_css_class || 'div_checklist';
            //defines css class for checklist filters
            this.checkListCssClass = f.checklist_css_class || 'flt_checklist';
            //defines css class for checklist item (li)
            this.checkListItemCssClass = f.checklist_item_css_class || 'flt_checklist_item';
            //defines css class for selected checklist item (li)
            this.checkListSlcItemCssClass = f.checklist_selected_item_css_class || 'flt_checklist_slc_item';
            //Load on demand text
            this.activateCheckListTxt = f.activate_checklist_text || 'Click to load filter data';
            //defines css class for checklist filters
            this.checkListItemDisabledCssClass = f.checklist_item_disabled_css_class || 'flt_checklist_item_disabled';
            this.enableCheckListResetFilter = f.enable_checklist_reset_filter === false ? false : true;
            //checklist filter container div
            this.prfxCheckListDiv = 'chkdiv_';

            this.isCustom = null;
            this.opts = null;
            this.optsTxt = null;

            this.tf = tf;
        }

        _createClass(CheckList, [{
            key: 'onChange',

            // TODO: move event here
            value: function onChange(evt) {
                this.tf.Evt.onSlcChange(evt);
            }
        }, {
            key: 'optionClick',
            value: function optionClick(evt) {
                this.setCheckListValues(evt.target);
                this.onChange(evt);
            }
        }, {
            key: 'build',

            /**
             * Build checklist UI asynchronously
             * @param  {Number}  colIndex   Column index
             * @param  {Boolean} isExternal Render in external container
             * @param  {String}  extFltId   External container id
             */
            value: function build(colIndex, isExternal, extFltId) {
                var tf = this.tf;
                tf.EvtManager(tf.Evt.name.checklist, { slcIndex: colIndex, slcExternal: isExternal, slcId: extFltId });
            }
        }, {
            key: '_build',

            /**
             * Build checklist UI
             * @param  {Number}  colIndex   Column index
             * @param  {Boolean} isExternal Render in external container
             * @param  {String}  extFltId   External container id
             */
            value: function _build(colIndex) {
                var _this = this;

                var isExternal = arguments[1] === undefined ? false : arguments[1];
                var extFltId = arguments[2] === undefined ? null : arguments[2];

                var tf = this.tf;
                colIndex = parseInt(colIndex, 10);

                this.opts = [];
                this.optsTxt = [];

                var divFltId = this.prfxCheckListDiv + colIndex + '_' + tf.id;
                if (!_dom.Dom.id(divFltId) && !isExternal || !_dom.Dom.id(extFltId) && isExternal) {
                    return;
                }

                var flt = !isExternal ? this.checkListDiv[colIndex] : _dom.Dom.id(extFltId);
                var ul = _dom.Dom.create('ul', ['id', tf.fltIds[colIndex]], ['colIndex', colIndex]);
                ul.className = this.checkListCssClass;
                _event.Event.add(ul, 'change', function (evt) {
                    _this.onChange(evt);
                });

                var rows = tf.tbl.rows;
                this.isCustom = tf.hasCustomSlcOptions && _array.Arr.has(tf.customSlcOptions.cols, colIndex);

                var activeFlt;
                if (tf.refreshFilters && tf.activeFilterId) {
                    activeFlt = tf.activeFilterId.split('_')[0];
                    activeFlt = activeFlt.split(tf.prfxFlt)[1];
                }

                var excludedOpts,
                    filteredDataCol = [];
                if (tf.refreshFilters && tf.disableExcludedOptions) {
                    excludedOpts = [];
                }

                for (var k = tf.refRow; k < tf.nbRows; k++) {
                    // always visible rows don't need to appear on selects as always
                    // valid
                    if (tf.hasVisibleRows && _array.Arr.has(tf.visibleRows, k) && !tf.paging) {
                        continue;
                    }

                    var cells = rows[k].cells;
                    var ncells = cells.length;

                    // checks if row has exact cell #
                    if (ncells !== tf.nbCells || this.isCustom) {
                        continue;
                    }

                    // this loop retrieves cell data
                    for (var j = 0; j < ncells; j++) {
                        if (colIndex === j && (!tf.refreshFilters || tf.refreshFilters && tf.disableExcludedOptions) || colIndex === j && tf.refreshFilters && (rows[k].style.display === '' && !tf.paging || tf.paging && (!activeFlt || activeFlt === colIndex || activeFlt != colIndex && _array.Arr.has(tf.validRowsIndex, k)))) {
                            var cell_data = tf.getCellData(j, cells[j]);
                            //Vary Peter's patch
                            var cell_string = _string.Str.matchCase(cell_data, tf.matchCase);
                            // checks if celldata is already in array
                            if (!_array.Arr.has(this.opts, cell_string, tf.matchCase)) {
                                this.opts.push(cell_data);
                            }
                            var filteredCol = filteredDataCol[j];
                            if (tf.refreshFilters && tf.disableExcludedOptions) {
                                if (!filteredCol) {
                                    filteredDataCol[j] = tf.GetFilteredDataCol(j);
                                }
                                if (!_array.Arr.has(filteredCol, cell_string, tf.matchCase) && !_array.Arr.has(excludedOpts, cell_string, tf.matchCase) && !tf.isFirstLoad) {
                                    excludedOpts.push(cell_data);
                                }
                            }
                        }
                    }
                }

                //Retrieves custom values
                if (this.isCustom) {
                    var customValues = tf.__getCustomValues(colIndex);
                    this.opts = customValues[0];
                    this.optsTxt = customValues[1];
                }

                if (tf.sortSlc && !this.isCustom) {
                    if (!tf.matchCase) {
                        this.opts.sort(_sort.Sort.ignoreCase);
                        if (excludedOpts) {
                            excludedOpts.sort(_sort.Sort.ignoreCase);
                        }
                    } else {
                        this.opts.sort();
                        if (excludedOpts) {
                            excludedOpts.sort();
                        }
                    }
                }
                //asc sort
                if (tf.sortNumAsc && _array.Arr.has(tf.sortNumAsc, colIndex)) {
                    try {
                        this.opts.sort(numSortAsc);
                        if (excludedOpts) {
                            excludedOpts.sort(numSortAsc);
                        }
                        if (this.isCustom) {
                            this.optsTxt.sort(numSortAsc);
                        }
                    } catch (e) {
                        this.opts.sort();
                        if (excludedOpts) {
                            excludedOpts.sort();
                        }
                        if (this.isCustom) {
                            this.optsTxt.sort();
                        }
                    } //in case there are alphanumeric values
                }
                //desc sort
                if (tf.sortNumDesc && _array.Arr.has(tf.sortNumDesc, colIndex)) {
                    try {
                        this.opts.sort(numSortDesc);
                        if (excludedOpts) {
                            excludedOpts.sort(numSortDesc);
                        }
                        if (this.isCustom) {
                            this.optsTxt.sort(numSortDesc);
                        }
                    } catch (e) {
                        this.opts.sort();
                        if (excludedOpts) {
                            excludedOpts.sort();
                        }
                        if (this.isCustom) {
                            this.optsTxt.sort();
                        }
                    } //in case there are alphanumeric values
                }

                this.addChecks(colIndex, ul, tf.separator);

                if (tf.fillSlcOnDemand) {
                    flt.innerHTML = '';
                }
                flt.appendChild(ul);
                flt.setAttribute('filled', '1');
            }
        }, {
            key: 'addChecks',

            /**
             * Add checklist options
             * @param {Number} colIndex  Column index
             * @param {Object} ul        Ul element
             * @param {String} separator Data separator
             */
            value: function addChecks(colIndex, ul, separator) {
                var _this2 = this;

                var tf = this.tf;
                var chkCt = this.addTChecks(colIndex, ul);
                var flts_values = [],
                    fltArr = []; //remember grid values
                var store = tf.Cpt.store;
                var tmpVal = store ? store.getFilterValues(tf.fltsValuesCookie)[colIndex] : null;
                if (tmpVal && _string.Str.trim(tmpVal).length > 0) {
                    if (tf.hasCustomSlcOptions && _array.Arr.has(tf.customSlcOptions.cols, colIndex)) {
                        fltArr.push(tmpVal);
                    } else {
                        fltArr = tmpVal.split(' ' + tf.orOperator + ' ');
                    }
                }

                for (var y = 0; y < this.opts.length; y++) {
                    var val = this.opts[y]; //item value
                    var lbl = this.isCustom ? this.optsTxt[y] : val; //item text
                    var li = _dom.Dom.createCheckItem(tf.fltIds[colIndex] + '_' + (y + chkCt), val, lbl);
                    li.className = this.checkListItemCssClass;
                    if (tf.refreshFilters && tf.disableExcludedOptions && _array.Arr.has(excludedOpts, _string.Str.matchCase(val, tf.matchCase), tf.matchCase)) {
                        _dom.Dom.addClass(li, this.checkListItemDisabledCssClass);
                        li.check.disabled = true;
                        li.disabled = true;
                    } else {
                        _event.Event.add(li.check, 'click', function (evt) {
                            _this2.optionClick(evt);
                        });
                    }
                    ul.appendChild(li);

                    if (val === '') {
                        //item is hidden
                        li.style.display = 'none';
                    }

                    /*** remember grid values ***/
                    if (tf.rememberGridValues) {
                        if (tf.hasCustomSlcOptions && _array.Arr.has(tf.customSlcOptions.cols, colIndex) && fltArr.toString().indexOf(val) != -1 || _array.Arr.has(fltArr, _string.Str.matchCase(val, tf.matchCase), tf.matchCase)) {
                            li.check.checked = true;
                            this.setCheckListValues(li.check);
                        }
                    }
                }
            }
        }, {
            key: 'addTChecks',

            /**
             * Add checklist header option
             * @param {Number} colIndex Column index
             * @param {Object} ul       Ul element
             */
            value: function addTChecks(colIndex, ul) {
                var _this3 = this;

                var tf = this.tf;
                var chkCt = 1;
                var li0 = _dom.Dom.createCheckItem(tf.fltIds[colIndex] + '_0', '', tf.displayAllText);
                li0.className = this.checkListItemCssClass;
                ul.appendChild(li0);

                _event.Event.add(li0.check, 'click', function (evt) {
                    _this3.optionClick(evt);
                });

                if (!this.enableCheckListResetFilter) {
                    li0.style.display = 'none';
                }

                if (tf.enableEmptyOption) {
                    var li1 = _dom.Dom.createCheckItem(tf.fltIds[colIndex] + '_1', tf.emOperator, tf.emptyText);
                    li1.className = this.checkListItemCssClass;
                    ul.appendChild(li1);
                    _event.Event.add(li1.check, 'click', function (evt) {
                        _this3.optionClick(evt);
                    });
                    chkCt++;
                }

                if (tf.enableNonEmptyOption) {
                    var li2 = _dom.Dom.createCheckItem(tf.fltIds[colIndex] + '_2', tf.nmOperator, tf.nonEmptyText);
                    li2.className = this.checkListItemCssClass;
                    ul.appendChild(li2);
                    _event.Event.add(li2.check, 'click', function (evt) {
                        _this3.optionClick(evt);
                    });
                    chkCt++;
                }
                return chkCt;
            }
        }, {
            key: 'setCheckListValues',

            /**
             * Store checked options in DOM element attribute
             * @param {Object} o checklist option DOM element
             */
            value: function setCheckListValues(o) {
                if (!o) {
                    return;
                }
                var tf = this.tf;
                var chkValue = o.value; //checked item value
                var chkIndex = parseInt(o.id.split('_')[2], 10);
                var filterTag = 'ul',
                    itemTag = 'li';
                var n = o;

                //ul tag search
                while (_string.Str.lower(n.nodeName) !== filterTag) {
                    n = n.parentNode;
                }

                var li = n.childNodes[chkIndex];
                var colIndex = n.getAttribute('colIndex');
                var fltValue = n.getAttribute('value'); //filter value (ul tag)
                var fltIndexes = n.getAttribute('indexes'); //selected items (ul tag)

                if (o.checked) {
                    //show all item
                    if (chkValue === '') {
                        if (fltIndexes && fltIndexes !== '') {
                            //items indexes
                            var indSplit = fltIndexes.split(tf.separator);
                            //checked items loop
                            for (var u = 0; u < indSplit.length; u++) {
                                //checked item
                                var cChk = _dom.Dom.id(tf.fltIds[colIndex] + '_' + indSplit[u]);
                                if (cChk) {
                                    cChk.checked = false;
                                    _dom.Dom.removeClass(n.childNodes[indSplit[u]], this.checkListSlcItemCssClass);
                                }
                            }
                        }
                        n.setAttribute('value', '');
                        n.setAttribute('indexes', '');
                    } else {
                        fltValue = fltValue ? fltValue : '';
                        chkValue = _string.Str.trim(fltValue + ' ' + chkValue + ' ' + tf.orOperator);
                        chkIndex = fltIndexes + chkIndex + tf.separator;
                        n.setAttribute('value', chkValue);
                        n.setAttribute('indexes', chkIndex);
                        //1st option unchecked
                        if (_dom.Dom.id(tf.fltIds[colIndex] + '_0')) {
                            _dom.Dom.id(tf.fltIds[colIndex] + '_0').checked = false;
                        }
                    }

                    if (_string.Str.lower(li.nodeName) === itemTag) {
                        _dom.Dom.removeClass(n.childNodes[0], this.checkListSlcItemCssClass);
                        _dom.Dom.addClass(li, this.checkListSlcItemCssClass);
                    }
                } else {
                    //removes values and indexes
                    if (chkValue !== '') {
                        var replaceValue = new RegExp(_string.Str.rgxEsc(chkValue + ' ' + tf.orOperator));
                        fltValue = fltValue.replace(replaceValue, '');
                        n.setAttribute('value', _string.Str.trim(fltValue));

                        var replaceIndex = new RegExp(_string.Str.rgxEsc(chkIndex + tf.separator));
                        fltIndexes = fltIndexes.replace(replaceIndex, '');
                        n.setAttribute('indexes', fltIndexes);
                    }
                    if (_string.Str.lower(li.nodeName) === itemTag) {
                        _dom.Dom.removeClass(li, this.checkListSlcItemCssClass);
                    }
                }
            }
        }]);

        return CheckList;
    })();

    exports.CheckList = CheckList;
});
//# sourceMappingURL=checkList.js.map