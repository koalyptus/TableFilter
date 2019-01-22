(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/format-number/index.js":
/*!*********************************************!*\
  !*** ./node_modules/format-number/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


module.exports = formatter;
module.exports.default = formatter;

function formatter(options) {
  options = options || {};


  // *********************************************************************************************
  // Set defaults for negatives
  // options.negative, options.negativeOut, options.separator retained for backward compatibility
  // *********************************************************************************************

  // type of negative; default left
  options.negativeType = options.negativeType || (options.negative === 'R' ? 'right' : 'left')

  // negative symbols '-' or '()'
  if (typeof options.negativeLeftSymbol !== 'string') {
    switch (options.negativeType) {
      case 'left':
        options.negativeLeftSymbol = '-';
        break;
      case 'brackets':
        options.negativeLeftSymbol = '(';
        break;
      default:
        options.negativeLeftSymbol = '';
    }
  }
  if (typeof options.negativeRightSymbol !== 'string') {
    switch (options.negativeType) {
      case 'right':
        options.negativeRightSymbol = '-';
        break;
      case 'brackets':
        options.negativeRightSymbol = ')';
        break;
      default:
        options.negativeRightSymbol = '';
    }
  }

  // whether negative symbol should be inside/outside prefix and suffix

  if (typeof options.negativeLeftOut !== "boolean") {
    options.negativeLeftOut = (options.negativeOut === false ? false : true);
  }
  if (typeof options.negativeRightOut !== "boolean") {
    options.negativeRightOut = (options.negativeOut === false ? false : true);
  }

  //prefix and suffix
  options.prefix = options.prefix || '';
  options.suffix = options.suffix || '';

  //separators
  if (typeof options.integerSeparator !== 'string') {
    options.integerSeparator = (typeof options.separator === 'string' ? options.separator : ',');
  }
  options.decimalsSeparator = typeof options.decimalsSeparator === 'string' ? options.decimalsSeparator : '';
  options.decimal = options.decimal || '.';

  //padders
  options.padLeft = options.padLeft || -1 //default no padding
  options.padRight = options.padRight || -1 //default no padding

  function format(number, overrideOptions) {
    overrideOptions = overrideOptions || {};

    if (number || number === 0) {
      number = '' + number;//convert number to string if it isn't already
    } else {
      return '';
    }

    //identify a negative number and make it absolute
    var output = [];
    var negative = number.charAt(0) === '-';
    number = number.replace(/^\-/g, '');

    //Prepare output with left hand negative and/or prefix
    if (!options.negativeLeftOut && !overrideOptions.noUnits) {
      output.push(options.prefix);
    }
    if (negative) {
      output.push(options.negativeLeftSymbol);
    }
    if (options.negativeLeftOut && !overrideOptions.noUnits) {
      output.push(options.prefix);
    }

    //Format core number
    number = number.split('.');
    if (options.round != null) round(number, options.round);
    if (options.truncate != null) number[1] = truncate(number[1], options.truncate);
    if (options.padLeft > 0) number[0] = padLeft(number[0], options.padLeft);
    if (options.padRight > 0) number[1] = padRight(number[1], options.padRight);
    if (!overrideOptions.noSeparator && number[1]) number[1] = addDecimalSeparators(number[1], options.decimalsSeparator);
    if (!overrideOptions.noSeparator && number[0]) number[0] = addIntegerSeparators(number[0], options.integerSeparator);
    output.push(number[0]);
    if (number[1]) {
      output.push(options.decimal);
      output.push(number[1]);
    }

    //Prepare output with right hand negative and/or prefix
    if (options.negativeRightOut && !overrideOptions.noUnits) {
      output.push(options.suffix);
    }
    if (negative) {
      output.push(options.negativeRightSymbol);
    }
    if (!options.negativeRightOut && !overrideOptions.noUnits) {
      output.push(options.suffix);
    }

    //join output and return
    return output.join('');
  }

  format.negative = options.negative;
  format.negativeOut = options.negativeOut;
  format.negativeType = options.negativeType;
  format.negativeLeftOut = options.negativeLeftOut;
  format.negativeLeftSymbol = options.negativeLeftSymbol;
  format.negativeRightOut = options.negativeRightOut;
  format.negativeRightSymbol = options.negativeRightSymbol;
  format.prefix = options.prefix;
  format.suffix = options.suffix;
  format.separate = options.separate;
  format.integerSeparator = options.integerSeparator;
  format.decimalsSeparator = options.decimalsSeparator;
  format.decimal = options.decimal;
  format.padLeft = options.padLeft;
  format.padRight = options.padRight;
  format.truncate = options.truncate;
  format.round = options.round;

  function unformat(number, allowedSeparators) {
    allowedSeparators = allowedSeparators || [];
    if (options.allowedSeparators) {
      options.allowedSeparators.forEach(function (s) { allowedSeparators.push (s); });
    }
    allowedSeparators.push(options.integerSeparator);
    allowedSeparators.push(options.decimalsSeparator);
    number = number.replace(options.prefix, '');
    number = number.replace(options.suffix, '');
    var newNumber = number;
    do {
      number = newNumber;
      for (var i = 0; i < allowedSeparators.length; i++) {
        newNumber = newNumber.replace(allowedSeparators[i], '');
      }
    } while (newNumber != number);
    return number;
  }
  format.unformat = unformat;

  function validate(number, allowedSeparators) {
    number = unformat(number, allowedSeparators);
    number = number.split(options.decimal);
    if (number.length > 2) {
      return false;
    } else if (options.truncate != null && number[1] && number[1].length > options.truncate) {
      return false;
    }  else if (options.round != null && number[1] && number[1].length > options.round) {
      return false;
    } else {
      return /^-?\d+\.?\d*$/.test(number);
    }
  }
  return format;
}

//where x is already the integer part of the number
function addIntegerSeparators(x, separator) {
  x += '';
  if (!separator) return x;
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x)) {
    x = x.replace(rgx, '$1' + separator + '$2');
  }
  return x;
}

//where x is already the decimal part of the number
function addDecimalSeparators(x, separator) {
  x += '';
  if (!separator) return x;
  var rgx = /(\d{3})(\d+)/;
  while (rgx.test(x)) {
    x = x.replace(rgx, '$1' + separator + '$2');
  }
  return x;
}

//where x is the integer part of the number
function padLeft(x, padding) {
  x = x + '';
  var buf = [];
  while (buf.length + x.length < padding) {
    buf.push('0');
  }
  return buf.join('') + x;
}

//where x is the decimals part of the number
function padRight(x, padding) {
  if (x) {
    x += '';
  } else {
    x = '';
  }
  var buf = [];
  while (buf.length + x.length < padding) {
    buf.push('0');
  }
  return x + buf.join('');
}
function truncate(x, length) {
  if (x) {
    x += '';
  }
  if (x && x.length > length) {
    return x.substr(0, length);
  } else {
    return x;
  }
}

//where number is an array with 0th item as integer string and 1st item as decimal string (no negatives)
function round(number, places) {
  if (number[1] && places >= 0 && number[1].length > places) {
    //truncate to correct number of decimal places
    var decim = number[1].slice(0, places);
    //if next digit was >= 5 we need to round up
    if (+(number[1].substr(places, 1)) >= 5) {
      //But first count leading zeros as converting to a number will loose them
      var leadingzeros = "";
      while (decim.charAt(0)==="0") {
        leadingzeros = leadingzeros + "0";
        decim = decim.substr(1);
      }
      //Then we can change decim to a number and add 1 before replacing leading zeros
      decim = (+decim + 1) + '';
      decim = leadingzeros + decim;
      if (decim.length > places) {
        //adding one has made it longer
        number[0] = (+number[0]+ +decim.charAt(0)) + ''; //add value of firstchar to the integer part
        decim = decim.substring(1);   //ignore the 1st char at the beginning which is the carry to the integer part
      }
    }
    number[1] = decim;
  }
  return number;
}


/***/ }),

/***/ "./node_modules/raw-loader/index.js!./libs/sortabletable.js":
/*!*********************************************************!*\
  !*** ./node_modules/raw-loader!./libs/sortabletable.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*----------------------------------------------------------------------------\\\r\n|                            Sortable Table 1.12                              |\r\n|-----------------------------------------------------------------------------|\r\n|                         Created by Erik Arvidsson                           |\r\n|                  (http://webfx.eae.net/contact.html#erik)                   |\r\n|                      For WebFX (http://webfx.eae.net/)                      |\r\n|-----------------------------------------------------------------------------|\r\n| A DOM 1 based script that allows an ordinary HTML table to be sortable.     |\r\n|-----------------------------------------------------------------------------|\r\n|                  Copyright (c) 1998 - 2006 Erik Arvidsson                   |\r\n|-----------------------------------------------------------------------------|\r\n| Licensed under the Apache License, Version 2.0 (the \"License\"); you may not |\r\n| use this file except in compliance with the License.  You may obtain a copy |\r\n| of the License at http://www.apache.org/licenses/LICENSE-2.0                |\r\n| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - |\r\n| Unless  required  by  applicable law or  agreed  to  in  writing,  software |\r\n| distributed under the License is distributed on an  \"AS IS\" BASIS,  WITHOUT |\r\n| WARRANTIES OR  CONDITIONS OF ANY KIND,  either express or implied.  See the |\r\n| License  for the  specific language  governing permissions  and limitations |\r\n| under the License.                                                          |\r\n|-----------------------------------------------------------------------------|\r\n| 2003-01-10 | First version                                                  |\r\n| 2003-01-19 | Minor changes to the date parsing                              |\r\n| 2003-01-28 | JScript 5.0 fixes (no support for 'in' operator)               |\r\n| 2003-02-01 | Sloppy typo like error fixed in getInnerText                   |\r\n| 2003-07-04 | Added workaround for IE cellIndex bug.                         |\r\n| 2003-11-09 | The bDescending argument to sort was not correctly working     |\r\n|            | Using onclick DOM0 event if no support for addEventListener    |\r\n|            | or attachEvent                                                 |\r\n| 2004-01-13 | Adding addSortType and removeSortType which makes it a lot     |\r\n|            | easier to add new, custom sort types.                          |\r\n| 2004-01-27 | Switch to use descending = false as the default sort order.    |\r\n|            | Change defaultDescending to suit your needs.                   |\r\n| 2004-03-14 | Improved sort type None look and feel a bit                    |\r\n| 2004-08-26 | Made the handling of tBody and tHead more flexible. Now you    |\r\n|            | can use another tHead or no tHead, and you can chose some      |\r\n|            | other tBody.                                                   |\r\n| 2006-04-25 | Changed license to Apache Software License 2.0                 |\r\n|-----------------------------------------------------------------------------|\r\n| Created 2003-01-10 | All changes are in the log above. | Updated 2006-04-25 |\r\n\\----------------------------------------------------------------------------*/\r\n\r\n\r\nfunction SortableTable(oTable, oSortTypes) {\r\n\r\n\tthis.sortTypes = oSortTypes || [];\r\n\r\n\tthis.sortColumn = null;\r\n\tthis.descending = null;\r\n\r\n\tvar oThis = this;\r\n\tthis._headerOnclick = function (e) {\r\n\t\toThis.headerOnclick(e);\r\n\t};\r\n\r\n\tif (oTable) {\r\n\t\tthis.setTable( oTable );\r\n\t\tthis.document = oTable.ownerDocument || oTable.document;\r\n\t}\r\n\telse {\r\n\t\tthis.document = document;\r\n\t}\r\n\r\n\r\n\t// only IE needs this\r\n\tvar win = this.document.defaultView || this.document.parentWindow;\r\n\tthis._onunload = function () {\r\n\t\toThis.destroy();\r\n\t};\r\n\tif (win && typeof win.attachEvent != \"undefined\") {\r\n\t\twin.attachEvent(\"onunload\", this._onunload);\r\n\t}\r\n}\r\n\r\nSortableTable.gecko = navigator.product == \"Gecko\";\r\nSortableTable.msie = /msie/i.test(navigator.userAgent);\r\n// Mozilla is faster when doing the DOM manipulations on\r\n// an orphaned element. MSIE is not\r\nSortableTable.removeBeforeSort = SortableTable.gecko;\r\n\r\nSortableTable.prototype.onsort = function () {};\r\n\r\n// default sort order. true -> descending, false -> ascending\r\nSortableTable.prototype.defaultDescending = false;\r\n\r\n// shared between all instances. This is intentional to allow external files\r\n// to modify the prototype\r\nSortableTable.prototype._sortTypeInfo = {};\r\n\r\nSortableTable.prototype.setTable = function (oTable) {\r\n\tif ( this.tHead )\r\n\t\tthis.uninitHeader();\r\n\tthis.element = oTable;\r\n\tthis.setTHead( oTable.tHead );\r\n\tthis.setTBody( oTable.tBodies[0] );\r\n};\r\n\r\nSortableTable.prototype.setTHead = function (oTHead) {\r\n\tif (this.tHead && this.tHead != oTHead )\r\n\t\tthis.uninitHeader();\r\n\tthis.tHead = oTHead;\r\n\tthis.initHeader( this.sortTypes );\r\n};\r\n\r\nSortableTable.prototype.setTBody = function (oTBody) {\r\n\tthis.tBody = oTBody;\r\n};\r\n\r\nSortableTable.prototype.setSortTypes = function ( oSortTypes ) {\r\n\tif ( this.tHead )\r\n\t\tthis.uninitHeader();\r\n\tthis.sortTypes = oSortTypes || [];\r\n\tif ( this.tHead )\r\n\t\tthis.initHeader( this.sortTypes );\r\n};\r\n\r\n// adds arrow containers and events\r\n// also binds sort type to the header cells so that reordering columns does\r\n// not break the sort types\r\nSortableTable.prototype.initHeader = function (oSortTypes) {\r\n\tif (!this.tHead) return;\r\n\tvar cells = this.tHead.rows[0].cells;\r\n\tvar doc = this.tHead.ownerDocument || this.tHead.document;\r\n\tthis.sortTypes = oSortTypes || [];\r\n\tvar l = cells.length;\r\n\tvar img, c;\r\n\tfor (var i = 0; i < l; i++) {\r\n\t\tc = cells[i];\r\n\t\tif (this.sortTypes[i] != null && this.sortTypes[i] != \"None\") {\r\n\t\t\timg = doc.createElement(\"IMG\");\r\n\t\t\timg.src = \"images/blank.png\";\r\n\t\t\tc.appendChild(img);\r\n\t\t\tif (this.sortTypes[i] != null)\r\n\t\t\t\tc._sortType = this.sortTypes[i];\r\n\t\t\tif (typeof c.addEventListener != \"undefined\")\r\n\t\t\t\tc.addEventListener(\"click\", this._headerOnclick, false);\r\n\t\t\telse if (typeof c.attachEvent != \"undefined\")\r\n\t\t\t\tc.attachEvent(\"onclick\", this._headerOnclick);\r\n\t\t\telse\r\n\t\t\t\tc.onclick = this._headerOnclick;\r\n\t\t}\r\n\t\telse\r\n\t\t{\r\n\t\t\tc.setAttribute( \"_sortType\", oSortTypes[i] );\r\n\t\t\tc._sortType = \"None\";\r\n\t\t}\r\n\t}\r\n\tthis.updateHeaderArrows();\r\n};\r\n\r\n// remove arrows and events\r\nSortableTable.prototype.uninitHeader = function () {\r\n\tif (!this.tHead) return;\r\n\tvar cells = this.tHead.rows[0].cells;\r\n\tvar l = cells.length;\r\n\tvar c;\r\n\tfor (var i = 0; i < l; i++) {\r\n\t\tc = cells[i];\r\n\t\tif (c._sortType != null && c._sortType != \"None\") {\r\n\t\t\tc.removeChild(c.lastChild);\r\n\t\t\tif (typeof c.removeEventListener != \"undefined\")\r\n\t\t\t\tc.removeEventListener(\"click\", this._headerOnclick, false);\r\n\t\t\telse if (typeof c.detachEvent != \"undefined\")\r\n\t\t\t\tc.detachEvent(\"onclick\", this._headerOnclick);\r\n\t\t\tc._sortType = null;\r\n\t\t\tc.removeAttribute( \"_sortType\" );\r\n\t\t}\r\n\t}\r\n};\r\n\r\nSortableTable.prototype.updateHeaderArrows = function () {\r\n\tif (!this.tHead) return;\r\n\tvar cells = this.tHead.rows[0].cells;\r\n\tvar l = cells.length;\r\n\tvar img;\r\n\tfor (var i = 0; i < l; i++) {\r\n\t\tif (cells[i]._sortType != null && cells[i]._sortType != \"None\") {\r\n\t\t\timg = cells[i].lastChild;\r\n\t\t\tif (i == this.sortColumn)\r\n\t\t\t\timg.className = \"sort-arrow \" + (this.descending ? \"descending\" : \"ascending\");\r\n\t\t\telse\r\n\t\t\t\timg.className = \"sort-arrow\";\r\n\t\t}\r\n\t}\r\n};\r\n\r\nSortableTable.prototype.headerOnclick = function (e) {\r\n\t// find TD element\r\n\tvar el = e.target || e.srcElement;\r\n\twhile (el.tagName != \"TD\")\r\n\t\tel = el.parentNode;\r\n\r\n\tthis.sort(SortableTable.msie ? SortableTable.getCellIndex(el) : el.cellIndex);\r\n};\r\n\r\n// IE returns wrong cellIndex when columns are hidden\r\nSortableTable.getCellIndex = function (oTd) {\r\n\tvar cells = oTd.parentNode.childNodes\r\n\tvar l = cells.length;\r\n\tvar i;\r\n\tfor (i = 0; cells[i] != oTd && i < l; i++)\r\n\t\t;\r\n\treturn i;\r\n};\r\n\r\nSortableTable.prototype.getSortType = function (nColumn) {\r\n\treturn this.sortTypes[nColumn] || \"String\";\r\n};\r\n\r\n// only nColumn is required\r\n// if bDescending is left out the old value is taken into account\r\n// if sSortType is left out the sort type is found from the sortTypes array\r\n\r\nSortableTable.prototype.sort = function (nColumn, bDescending, sSortType) {\r\n\tif (!this.tBody) return;\r\n\tif (sSortType == null)\r\n\t\tsSortType = this.getSortType(nColumn);\r\n\r\n\t// exit if None\r\n\tif (sSortType == \"None\")\r\n\t\treturn;\r\n\r\n\tif (bDescending == null) {\r\n\t\tif (this.sortColumn != nColumn)\r\n\t\t\tthis.descending = this.defaultDescending;\r\n\t\telse\r\n\t\t\tthis.descending = !this.descending;\r\n\t}\r\n\telse\r\n\t\tthis.descending = bDescending;\r\n\r\n\tthis.sortColumn = nColumn;\r\n\r\n\tif (typeof this.onbeforesort == \"function\")\r\n\t\tthis.onbeforesort();\r\n\r\n\tvar f = this.getSortFunction(sSortType, nColumn);\r\n\tvar a = this.getCache(sSortType, nColumn);\r\n\tvar tBody = this.tBody;\r\n\r\n\ta.sort(f);\r\n\r\n\tif (this.descending)\r\n\t\ta.reverse();\r\n\r\n\tif (SortableTable.removeBeforeSort) {\r\n\t\t// remove from doc\r\n\t\tvar nextSibling = tBody.nextSibling;\r\n\t\tvar p = tBody.parentNode;\r\n\t\tp.removeChild(tBody);\r\n\t}\r\n\r\n\t// insert in the new order\r\n\tvar l = a.length;\r\n\tfor (var i = 0; i < l; i++)\r\n\t\ttBody.appendChild(a[i].element);\r\n\r\n\tif (SortableTable.removeBeforeSort) {\r\n\t\t// insert into doc\r\n\t\tp.insertBefore(tBody, nextSibling);\r\n\t}\r\n\r\n\tthis.updateHeaderArrows();\r\n\r\n\tthis.destroyCache(a);\r\n\r\n\tif (typeof this.onsort == \"function\")\r\n\t\tthis.onsort();\r\n};\r\n\r\nSortableTable.prototype.asyncSort = function (nColumn, bDescending, sSortType) {\r\n\tvar oThis = this;\r\n\tthis._asyncsort = function () {\r\n\t\toThis.sort(nColumn, bDescending, sSortType);\r\n\t};\r\n\twindow.setTimeout(this._asyncsort, 1);\r\n};\r\n\r\nSortableTable.prototype.getCache = function (sType, nColumn) {\r\n\tif (!this.tBody) return [];\r\n\tvar rows = this.tBody.rows;\r\n\tvar l = rows.length;\r\n\tvar a = new Array(l);\r\n\tvar r;\r\n\tfor (var i = 0; i < l; i++) {\r\n\t\tr = rows[i];\r\n\t\ta[i] = {\r\n\t\t\tvalue:\t\tthis.getRowValue(r, sType, nColumn),\r\n\t\t\telement:\tr\r\n\t\t};\r\n\t};\r\n\treturn a;\r\n};\r\n\r\nSortableTable.prototype.destroyCache = function (oArray) {\r\n\tvar l = oArray.length;\r\n\tfor (var i = 0; i < l; i++) {\r\n\t\toArray[i].value = null;\r\n\t\toArray[i].element = null;\r\n\t\toArray[i] = null;\r\n\t}\r\n};\r\n\r\nSortableTable.prototype.getRowValue = function (oRow, sType, nColumn) {\r\n\t// if we have defined a custom getRowValue use that\r\n\tif (this._sortTypeInfo[sType] && this._sortTypeInfo[sType].getRowValue)\r\n\t\treturn this._sortTypeInfo[sType].getRowValue(oRow, nColumn);\r\n\r\n\tvar s;\r\n\tvar c = oRow.cells[nColumn];\r\n\tif (typeof c.innerText != \"undefined\")\r\n\t\ts = c.innerText;\r\n\telse\r\n\t\ts = SortableTable.getInnerText(c);\r\n\treturn this.getValueFromString(s, sType);\r\n};\r\n\r\nSortableTable.getInnerText = function (oNode) {\r\n\tvar s = \"\";\r\n\tvar cs = oNode.childNodes;\r\n\tvar l = cs.length;\r\n\tfor (var i = 0; i < l; i++) {\r\n\t\tswitch (cs[i].nodeType) {\r\n\t\t\tcase 1: //ELEMENT_NODE\r\n\t\t\t\ts += SortableTable.getInnerText(cs[i]);\r\n\t\t\t\tbreak;\r\n\t\t\tcase 3:\t//TEXT_NODE\r\n\t\t\t\ts += cs[i].nodeValue;\r\n\t\t\t\tbreak;\r\n\t\t}\r\n\t}\r\n\treturn s;\r\n};\r\n\r\nSortableTable.prototype.getValueFromString = function (sText, sType) {\r\n\tif (this._sortTypeInfo[sType])\r\n\t\treturn this._sortTypeInfo[sType].getValueFromString( sText );\r\n\treturn sText;\r\n\t/*\r\n\tswitch (sType) {\r\n\t\tcase \"Number\":\r\n\t\t\treturn Number(sText);\r\n\t\tcase \"CaseInsensitiveString\":\r\n\t\t\treturn sText.toUpperCase();\r\n\t\tcase \"Date\":\r\n\t\t\tvar parts = sText.split(\"-\");\r\n\t\t\tvar d = new Date(0);\r\n\t\t\td.setFullYear(parts[0]);\r\n\t\t\td.setDate(parts[2]);\r\n\t\t\td.setMonth(parts[1] - 1);\r\n\t\t\treturn d.valueOf();\r\n\t}\r\n\treturn sText;\r\n\t*/\r\n\t};\r\n\r\nSortableTable.prototype.getSortFunction = function (sType, nColumn) {\r\n\tif (this._sortTypeInfo[sType])\r\n\t\treturn this._sortTypeInfo[sType].compare;\r\n\treturn SortableTable.basicCompare;\r\n};\r\n\r\nSortableTable.prototype.destroy = function () {\r\n\tthis.uninitHeader();\r\n\tvar win = this.document.parentWindow;\r\n\tif (win && typeof win.detachEvent != \"undefined\") {\t// only IE needs this\r\n\t\twin.detachEvent(\"onunload\", this._onunload);\r\n\t}\r\n\tthis._onunload = null;\r\n\tthis.element = null;\r\n\tthis.tHead = null;\r\n\tthis.tBody = null;\r\n\tthis.document = null;\r\n\tthis._headerOnclick = null;\r\n\tthis.sortTypes = null;\r\n\tthis._asyncsort = null;\r\n\tthis.onsort = null;\r\n};\r\n\r\n// Adds a sort type to all instance of SortableTable\r\n// sType : String - the identifier of the sort type\r\n// fGetValueFromString : function ( s : string ) : T - A function that takes a\r\n//    string and casts it to a desired format. If left out the string is just\r\n//    returned\r\n// fCompareFunction : function ( n1 : T, n2 : T ) : Number - A normal JS sort\r\n//    compare function. Takes two values and compares them. If left out less than,\r\n//    <, compare is used\r\n// fGetRowValue : function( oRow : HTMLTRElement, nColumn : int ) : T - A function\r\n//    that takes the row and the column index and returns the value used to compare.\r\n//    If left out then the innerText is first taken for the cell and then the\r\n//    fGetValueFromString is used to convert that string the desired value and type\r\n\r\nSortableTable.prototype.addSortType = function (sType, fGetValueFromString, fCompareFunction, fGetRowValue) {\r\n\tthis._sortTypeInfo[sType] = {\r\n\t\ttype:\t\t\t\tsType,\r\n\t\tgetValueFromString:\tfGetValueFromString || SortableTable.idFunction,\r\n\t\tcompare:\t\t\tfCompareFunction || SortableTable.basicCompare,\r\n\t\tgetRowValue:\t\tfGetRowValue\r\n\t};\r\n};\r\n\r\n// this removes the sort type from all instances of SortableTable\r\nSortableTable.prototype.removeSortType = function (sType) {\r\n\tdelete this._sortTypeInfo[sType];\r\n};\r\n\r\nSortableTable.basicCompare = function compare(n1, n2) {\r\n\tif (n1.value < n2.value)\r\n\t\treturn -1;\r\n\tif (n2.value < n1.value)\r\n\t\treturn 1;\r\n\treturn 0;\r\n};\r\n\r\nSortableTable.idFunction = function (x) {\r\n\treturn x;\r\n};\r\n\r\nSortableTable.toUpperCase = function (s) {\r\n\treturn s.toUpperCase();\r\n};\r\n\r\nSortableTable.toDate = function (s) {\r\n\tvar parts = s.split(\"-\");\r\n\tvar d = new Date(0);\r\n\td.setFullYear(parts[0]);\r\n\td.setDate(parts[2]);\r\n\td.setMonth(parts[1] - 1);\r\n\treturn d.valueOf();\r\n};\r\n\r\n\r\n// add sort types\r\nSortableTable.prototype.addSortType(\"Number\", Number);\r\nSortableTable.prototype.addSortType(\"CaseInsensitiveString\", SortableTable.toUpperCase);\r\nSortableTable.prototype.addSortType(\"Date\", SortableTable.toDate);\r\nSortableTable.prototype.addSortType(\"String\");\r\n// None is a special case\r\n"

/***/ }),

/***/ "./node_modules/script-loader/addScript.js":
/*!*************************************************!*\
  !*** ./node_modules/script-loader/addScript.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(src) {
	function log(error) {
		(typeof console !== "undefined")
		&& (console.error || console.log)("[Script Loader]", error);
	}

	// Check for IE =< 8
	function isIE() {
		return typeof attachEvent !== "undefined" && typeof addEventListener === "undefined";
	}

	try {
		if (typeof execScript !== "undefined" && isIE()) {
			execScript(src);
		} else if (typeof eval !== "undefined") {
			eval.call(null, src);
		} else {
			log("EvalError: No eval function available");
		}
	} catch (error) {
		log(error);
	}
}


/***/ }),

/***/ "./node_modules/script-loader/index.js!./libs/sortabletable.js":
/*!************************************************************!*\
  !*** ./node_modules/script-loader!./libs/sortabletable.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! !./node_modules/script-loader/addScript.js */ "./node_modules/script-loader/addScript.js")(__webpack_require__(/*! !./node_modules/raw-loader!./libs/sortabletable.js */ "./node_modules/raw-loader/index.js!./libs/sortabletable.js")+"\n\n// SCRIPT-LOADER FOOTER\n//# sourceURL=script:///C:/projects/dev/github/TableFilter/libs/sortabletable.js")

/***/ }),

/***/ "./src sync recursive ^\\.\\/.*$":
/*!***************************!*\
  !*** ./src sync ^\.\/.*$ ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./array": "./src/array.js",
	"./array.js": "./src/array.js",
	"./const": "./src/const.js",
	"./const.js": "./src/const.js",
	"./cookie": "./src/cookie.js",
	"./cookie.js": "./src/cookie.js",
	"./dom": "./src/dom.js",
	"./dom.js": "./src/dom.js",
	"./emitter": "./src/emitter.js",
	"./emitter.js": "./src/emitter.js",
	"./event": "./src/event.js",
	"./event.js": "./src/event.js",
	"./extensions/advancedGrid/adapterEzEditTable": "./src/extensions/advancedGrid/adapterEzEditTable.js",
	"./extensions/advancedGrid/adapterEzEditTable.js": "./src/extensions/advancedGrid/adapterEzEditTable.js",
	"./extensions/advancedGrid/advancedGrid": "./src/extensions/advancedGrid/advancedGrid.js",
	"./extensions/advancedGrid/advancedGrid.js": "./src/extensions/advancedGrid/advancedGrid.js",
	"./extensions/colOps/colOps": "./src/extensions/colOps/colOps.js",
	"./extensions/colOps/colOps.js": "./src/extensions/colOps/colOps.js",
	"./extensions/colsVisibility/colsVisibility": "./src/extensions/colsVisibility/colsVisibility.js",
	"./extensions/colsVisibility/colsVisibility.js": "./src/extensions/colsVisibility/colsVisibility.js",
	"./extensions/filtersVisibility/filtersVisibility": "./src/extensions/filtersVisibility/filtersVisibility.js",
	"./extensions/filtersVisibility/filtersVisibility.js": "./src/extensions/filtersVisibility/filtersVisibility.js",
	"./extensions/sort/adapterSortabletable": "./src/extensions/sort/adapterSortabletable.js",
	"./extensions/sort/adapterSortabletable.js": "./src/extensions/sort/adapterSortabletable.js",
	"./extensions/sort/sort": "./src/extensions/sort/sort.js",
	"./extensions/sort/sort.js": "./src/extensions/sort/sort.js",
	"./feature": "./src/feature.js",
	"./feature.js": "./src/feature.js",
	"./modules/alternateRows": "./src/modules/alternateRows.js",
	"./modules/alternateRows.js": "./src/modules/alternateRows.js",
	"./modules/baseDropdown": "./src/modules/baseDropdown.js",
	"./modules/baseDropdown.js": "./src/modules/baseDropdown.js",
	"./modules/checkList": "./src/modules/checkList.js",
	"./modules/checkList.js": "./src/modules/checkList.js",
	"./modules/clearButton": "./src/modules/clearButton.js",
	"./modules/clearButton.js": "./src/modules/clearButton.js",
	"./modules/dateType": "./src/modules/dateType.js",
	"./modules/dateType.js": "./src/modules/dateType.js",
	"./modules/dropdown": "./src/modules/dropdown.js",
	"./modules/dropdown.js": "./src/modules/dropdown.js",
	"./modules/gridLayout": "./src/modules/gridLayout.js",
	"./modules/gridLayout.js": "./src/modules/gridLayout.js",
	"./modules/hash": "./src/modules/hash.js",
	"./modules/hash.js": "./src/modules/hash.js",
	"./modules/help": "./src/modules/help.js",
	"./modules/help.js": "./src/modules/help.js",
	"./modules/highlightKeywords": "./src/modules/highlightKeywords.js",
	"./modules/highlightKeywords.js": "./src/modules/highlightKeywords.js",
	"./modules/loader": "./src/modules/loader.js",
	"./modules/loader.js": "./src/modules/loader.js",
	"./modules/markActiveColumns": "./src/modules/markActiveColumns.js",
	"./modules/markActiveColumns.js": "./src/modules/markActiveColumns.js",
	"./modules/noResults": "./src/modules/noResults.js",
	"./modules/noResults.js": "./src/modules/noResults.js",
	"./modules/paging": "./src/modules/paging.js",
	"./modules/paging.js": "./src/modules/paging.js",
	"./modules/popupFilter": "./src/modules/popupFilter.js",
	"./modules/popupFilter.js": "./src/modules/popupFilter.js",
	"./modules/rowsCounter": "./src/modules/rowsCounter.js",
	"./modules/rowsCounter.js": "./src/modules/rowsCounter.js",
	"./modules/state": "./src/modules/state.js",
	"./modules/state.js": "./src/modules/state.js",
	"./modules/statusBar": "./src/modules/statusBar.js",
	"./modules/statusBar.js": "./src/modules/statusBar.js",
	"./modules/storage": "./src/modules/storage.js",
	"./modules/storage.js": "./src/modules/storage.js",
	"./modules/toolbar": "./src/modules/toolbar.js",
	"./modules/toolbar.js": "./src/modules/toolbar.js",
	"./number": "./src/number.js",
	"./number.js": "./src/number.js",
	"./register": "./src/register.js",
	"./register.js": "./src/register.js",
	"./root": "./src/root.js",
	"./root.js": "./src/root.js",
	"./settings": "./src/settings.js",
	"./settings.js": "./src/settings.js",
	"./sort": "./src/sort.js",
	"./sort.js": "./src/sort.js",
	"./string": "./src/string.js",
	"./string.js": "./src/string.js",
	"./tablefilter": "./src/tablefilter.js",
	"./tablefilter.js": "./src/tablefilter.js",
	"./types": "./src/types.js",
	"./types.js": "./src/types.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	var module = __webpack_require__(id);
	return module;
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./src/extensions/advancedGrid/adapterEzEditTable.js":
/*!***********************************************************!*\
  !*** ./src/extensions/advancedGrid/adapterEzEditTable.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AdapterEzEditTable; });
/* harmony import */ var _feature__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../feature */ "./src/feature.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dom */ "./src/dom.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../const */ "./src/const.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../settings */ "./src/settings.js");
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../root */ "./src/root.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var INSTANTIATION_ERROR = "Failed to instantiate EditTable object.\n    \n\"ezEditTable\" dependency not found.";
/**
 * Adapter module for ezEditTable, an external library providing advanced
 * grid features (selection and edition):
 * http://codecanyon.net/item/ezedittable-enhance-html-tables/2425123?ref=koalyptus
 */

var AdapterEzEditTable =
/*#__PURE__*/
function (_Feature) {
  _inherits(AdapterEzEditTable, _Feature);

  /**
   * Creates an instance of AdapterEzEditTable
   *
   * @param {TableFilter} tf TableFilter instance
   * @param {Object} cfg Configuration options for ezEditTable library
   */
  function AdapterEzEditTable(tf, cfg) {
    var _this;

    _classCallCheck(this, AdapterEzEditTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AdapterEzEditTable).call(this, tf, cfg.name));
    /**
     * Module description
     * @type {String}
     */

    _this.desc = Object(_settings__WEBPACK_IMPORTED_MODULE_3__["defaultsStr"])(cfg.description, 'ezEditTable adapter');
    /**
     * Filename of ezEditTable library
     * @type {String}
     */

    _this.filename = Object(_settings__WEBPACK_IMPORTED_MODULE_3__["defaultsStr"])(cfg.filename, 'ezEditTable.js');
    /**
     * Path to ezEditTable library
     * @type {String}
     */

    _this.vendorPath = cfg.vendor_path;
    /**
     * Load ezEditTable stylesheet
     * @type {Boolean}
     */

    _this.loadStylesheet = Boolean(cfg.load_stylesheet);
    /**
     * Path to ezEditTable stylesheet
     * @type {String}
     */

    _this.stylesheet = Object(_settings__WEBPACK_IMPORTED_MODULE_3__["defaultsStr"])(cfg.stylesheet, _this.vendorPath + 'ezEditTable.css');
    /**
     * Name of ezEditTable stylesheet
     * @type {String}
     */

    _this.stylesheetName = Object(_settings__WEBPACK_IMPORTED_MODULE_3__["defaultsStr"])(cfg.stylesheet_name, 'ezEditTableCss'); // Enable the ezEditTable's scroll into view behaviour if grid layout on

    cfg.scroll_into_view = cfg.scroll_into_view === false ? false : tf.gridLayout;
    /**
     * ezEditTable instance
     * @type {EditTable}
     * @private
     */

    _this._ezEditTable = null;
    /**
     * ezEditTable configuration
     * @private
     */

    _this.cfg = cfg;

    _this.enable();

    return _this;
  }
  /**
   * Conditionally load ezEditTable library and set advanced grid
   */


  _createClass(AdapterEzEditTable, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      if (this.initialized) {
        return;
      }

      var tf = this.tf;

      if (_root__WEBPACK_IMPORTED_MODULE_4__["root"].EditTable) {
        this._setAdvancedGrid();
      } else {
        var path = this.vendorPath + this.filename;
        tf.import(this.filename, path, function () {
          return _this2._setAdvancedGrid();
        });
      }

      if (this.loadStylesheet && !tf.isImported(this.stylesheet, 'link')) {
        tf.import(this.stylesheetName, this.stylesheet, null, 'link');
      } // TODO: hack to prevent ezEditTable enter key event hijaking.
      // Needs to be fixed in the vendor's library


      this.emitter.on(['filter-focus', 'filter-blur'], function () {
        return _this2._toggleForInputFilter();
      });
      /**
       * @inherited
       */

      this.initialized = true;
    }
    /**
     * Instantiate ezEditTable component for advanced grid features
     * @private
     */

  }, {
    key: "_setAdvancedGrid",
    value: function _setAdvancedGrid() {
      var tf = this.tf; //start row for EditTable constructor needs to be calculated

      var startRow,
          cfg = this.cfg,
          thead = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["tag"])(tf.dom(), 'thead'); //if thead exists and startRow not specified, startRow is calculated
      //automatically by EditTable

      if (thead.length > 0 && !cfg.startRow) {
        startRow = undefined;
      } //otherwise startRow config property if any or TableFilter refRow
      else {
          startRow = cfg.startRow || tf.refRow;
        }

      cfg.base_path = cfg.base_path || tf.basePath + 'ezEditTable/';
      var editable = cfg.editable;
      var selectable = cfg.selection;

      if (selectable) {
        cfg.default_selection = cfg.default_selection || 'row';
      } //CSS Styles


      cfg.active_cell_css = cfg.active_cell_css || 'ezETSelectedCell';
      var _lastValidRowIndex = 0;
      var _lastRowIndex = 0;

      if (selectable) {
        //Row navigation needs to be calculated according to TableFilter's
        //validRowsIndex array
        var onAfterSelection = function onAfterSelection(et, selectedElm, e) {
          var slc = et.Selection; //Next valid filtered row needs to be selected

          var doSelect = function doSelect(nextRowIndex) {
            if (et.defaultSelection === 'row') {
              /* eslint-disable */
              slc.SelectRowByIndex(nextRowIndex);
              /* eslint-enable */
            } else {
              /* eslint-disable */
              et.ClearSelections();
              /* eslint-enable */

              var cellIndex = selectedElm.cellIndex,
                  _row = tf.dom().rows[nextRowIndex];

              if (et.defaultSelection === 'both') {
                /* eslint-disable */
                slc.SelectRowByIndex(nextRowIndex);
                /* eslint-enable */
              }

              if (_row) {
                /* eslint-disable */
                slc.SelectCell(_row.cells[cellIndex]);
                /* eslint-enable */
              }
            } //Table is filtered


            if (tf.validRowsIndex.length !== tf.getRowsNb()) {
              var r = tf.dom().rows[nextRowIndex];

              if (r) {
                r.scrollIntoView(false);
              }

              if (cell) {
                if (cell.cellIndex === tf.getCellsNb() - 1 && tf.gridLayout) {
                  tf.tblCont.scrollLeft = 100000000;
                } else if (cell.cellIndex === 0 && tf.gridLayout) {
                  tf.tblCont.scrollLeft = 0;
                } else {
                  cell.scrollIntoView(false);
                }
              }
            }
          }; //table is not filtered


          if (!tf.validRowsIndex) {
            return;
          }

          var validIndexes = tf.validRowsIndex,
              validIdxLen = validIndexes.length,
              row = et.defaultSelection !== 'row' ? selectedElm.parentNode : selectedElm,
              //cell for default_selection = 'both' or 'cell'
          cell = selectedElm.nodeName === 'TD' ? selectedElm : null,

          /* eslint-disable */
          keyCode = e !== undefined ? et.Event.GetKey(e) : 0,

          /* eslint-enable */
          isRowValid = validIndexes.indexOf(row.rowIndex) !== -1,
              nextRowIndex,
              paging = tf.feature('paging'),
              //pgup/pgdown keys
          d = keyCode === 34 || keyCode === 33 ? paging && paging.pageLength || et.nbRowsPerPage : 1; //If next row is not valid, next valid filtered row needs to be
          //calculated

          if (!isRowValid) {
            //Selection direction up/down
            if (row.rowIndex > _lastRowIndex) {
              //last row
              if (row.rowIndex >= validIndexes[validIdxLen - 1]) {
                nextRowIndex = validIndexes[validIdxLen - 1];
              } else {
                var calcRowIndex = _lastValidRowIndex + d;

                if (calcRowIndex > validIdxLen - 1) {
                  nextRowIndex = validIndexes[validIdxLen - 1];
                } else {
                  nextRowIndex = validIndexes[calcRowIndex];
                }
              }
            } else {
              //first row
              if (row.rowIndex <= validIndexes[0]) {
                nextRowIndex = validIndexes[0];
              } else {
                var v = validIndexes[_lastValidRowIndex - d];
                nextRowIndex = v ? v : validIndexes[0];
              }
            }

            _lastRowIndex = row.rowIndex;
            doSelect(nextRowIndex);
          } else {
            //If filtered row is valid, special calculation for
            //pgup/pgdown keys
            if (keyCode !== 34 && keyCode !== 33) {
              _lastValidRowIndex = validIndexes.indexOf(row.rowIndex);
              _lastRowIndex = row.rowIndex;
            } else {
              if (keyCode === 34) {
                //pgdown
                //last row
                if (_lastValidRowIndex + d <= validIdxLen - 1) {
                  nextRowIndex = validIndexes[_lastValidRowIndex + d];
                } else {
                  nextRowIndex = [validIdxLen - 1];
                }
              } else {
                //pgup
                //first row
                if (_lastValidRowIndex - d <= validIndexes[0]) {
                  nextRowIndex = validIndexes[0];
                } else {
                  nextRowIndex = validIndexes[_lastValidRowIndex - d];
                }
              }

              _lastRowIndex = nextRowIndex;
              _lastValidRowIndex = validIndexes.indexOf(nextRowIndex);
              doSelect(nextRowIndex);
            }
          }
        }; //Page navigation has to be enforced whenever selected row is out of
        //the current page range


        var onBeforeSelection = function onBeforeSelection(et, selectedElm) {
          var row = et.defaultSelection !== 'row' ? selectedElm.parentNode : selectedElm;

          if (tf.paging) {
            if (tf.feature('paging').nbPages > 1) {
              var paging = tf.feature('paging'); //page length is re-assigned in case it has changed

              et.nbRowsPerPage = paging.pageLength;
              var validIndexes = tf.validRowsIndex,
                  validIdxLen = validIndexes.length,
                  pagingEndRow = parseInt(paging.startPagingRow, 10) + parseInt(paging.pageLength, 10);
              var rowIndex = row.rowIndex;

              if (rowIndex === validIndexes[validIdxLen - 1] && paging.currentPageNb !== paging.nbPages) {
                paging.setPage('last');
              } else if (rowIndex === validIndexes[0] && paging.currentPageNb !== 1) {
                paging.setPage('first');
              } else if (rowIndex > validIndexes[pagingEndRow - 1] && rowIndex < validIndexes[validIdxLen - 1]) {
                paging.setPage('next');
              } else if (rowIndex < validIndexes[paging.startPagingRow] && rowIndex > validIndexes[0]) {
                paging.setPage('previous');
              }
            }
          }
        }; //Selected row needs to be visible when paging is activated


        if (tf.paging) {
          tf.feature('paging').onAfterChangePage = function (paging) {
            var advGrid = paging.tf.extension('advancedGrid');
            var et = advGrid._ezEditTable;
            var slc = et.Selection;
            /* eslint-disable */

            var row = slc.GetActiveRow();
            /* eslint-enable */

            if (row) {
              row.scrollIntoView(false);
            }
            /* eslint-disable */


            var cell = slc.GetActiveCell();
            /* eslint-enable */

            if (cell) {
              cell.scrollIntoView(false);
            }
          };
        } //Rows navigation when rows are filtered is performed with the
        //EditTable row selection callback events


        if (cfg.default_selection === 'row') {
          var fnB = cfg.on_before_selected_row;

          cfg.on_before_selected_row = function () {
            var args = arguments;
            onBeforeSelection(args[0], args[1], args[2]);

            if (fnB) {
              fnB.call(null, args[0], args[1], args[2]);
            }
          };

          var fnA = cfg.on_after_selected_row;

          cfg.on_after_selected_row = function () {
            var args = arguments;
            onAfterSelection(args[0], args[1], args[2]);

            if (fnA) {
              fnA.call(null, args[0], args[1], args[2]);
            }
          };
        } else {
          var fnD = cfg.on_before_selected_cell;

          cfg.on_before_selected_cell = function () {
            var args = arguments;
            onBeforeSelection(args[0], args[1], args[2]);

            if (fnD) {
              fnD.call(null, args[0], args[1], args[2]);
            }
          };

          var fnC = cfg.on_after_selected_cell;

          cfg.on_after_selected_cell = function () {
            var args = arguments;
            onAfterSelection(args[0], args[1], args[2]);

            if (fnC) {
              fnC.call(null, args[0], args[1], args[2]);
            }
          };
        }
      }

      if (editable) {
        //Added or removed rows, TF rows number needs to be re-calculated
        var fnE = cfg.on_added_dom_row;

        cfg.on_added_dom_row = function () {
          var args = arguments;
          tf.nbFilterableRows++;

          if (!tf.paging) {
            tf.emitter.emit('rows-changed', tf, this);
          } else {
            tf.nbFilterableRows++;
            tf.paging = false;
            tf.feature('paging').destroy();
            tf.feature('paging').reset();
          }

          if (tf.alternateRows) {
            tf.feature('alternateRows').init();
          }

          if (fnE) {
            fnE.call(null, args[0], args[1], args[2]);
          }
        };

        if (cfg.actions && cfg.actions['delete']) {
          var fnF = cfg.actions['delete'].on_after_submit;

          cfg.actions['delete'].on_after_submit = function () {
            var args = arguments;
            tf.nbFilterableRows--;

            if (!tf.paging) {
              tf.emitter.emit('rows-changed', tf, this);
            } else {
              tf.nbFilterableRows--;
              tf.paging = false;
              tf.feature('paging').destroy();
              tf.feature('paging').reset(false);
            }

            if (tf.alternateRows) {
              tf.feature('alternateRows').init();
            }

            if (fnF) {
              fnF.call(null, args[0], args[1]);
            }
          };
        }
      }

      try {
        /* eslint-disable */
        this._ezEditTable = new EditTable(tf.id, cfg, startRow);

        this._ezEditTable.Init();
        /* eslint-enable */

      } catch (e) {
        throw new Error(INSTANTIATION_ERROR);
      }

      this.initialized = true;
    }
    /**
     * Reset advanced grid when previously removed
     */

  }, {
    key: "reset",
    value: function reset() {
      var ezEditTable = this._ezEditTable;

      if (ezEditTable) {
        if (this.cfg.selection) {
          /* eslint-disable */
          ezEditTable.Selection.Set();
          /* eslint-enable */
        }

        if (this.cfg.editable) {
          /* eslint-disable */
          ezEditTable.Editable.Set();
          /* eslint-enable */
        }
      }
    }
    /**
     * Toggle behaviour
     */

  }, {
    key: "toggle",
    value: function toggle() {
      var ezEditTable = this._ezEditTable;

      if (ezEditTable.editable) {
        /* eslint-disable */
        ezEditTable.Editable.Remove();
        /* eslint-enable */
      } else {
        /* eslint-disable */
        ezEditTable.Editable.Set();
        /* eslint-enable */
      }

      if (ezEditTable.selection) {
        /* eslint-disable */
        ezEditTable.Selection.Remove();
        /* eslint-enable */
      } else {
        /* eslint-disable */
        ezEditTable.Selection.Set();
        /* eslint-enable */
      }
    }
  }, {
    key: "_toggleForInputFilter",
    value: function _toggleForInputFilter() {
      var tf = this.tf;

      if (!tf.getActiveFilterId()) {
        return;
      }

      var colIndex = tf.getColumnIndexFromFilterId(tf.getActiveFilterId());
      var filterType = tf.getFilterType(colIndex);

      if (filterType === _const__WEBPACK_IMPORTED_MODULE_2__["INPUT"]) {
        this.toggle();
      }
    }
    /**
     * Remove advanced grid
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this3 = this;

      if (!this.initialized) {
        return;
      }

      var ezEditTable = this._ezEditTable;

      if (ezEditTable) {
        if (this.cfg.selection) {
          /* eslint-disable */
          ezEditTable.Selection.ClearSelections();
          ezEditTable.Selection.Remove();
          /* eslint-enable */
        }

        if (this.cfg.editable) {
          /* eslint-disable */
          ezEditTable.Editable.Remove();
          /* eslint-enable */
        }
      }

      this.emitter.off(['filter-focus', 'filter-blur'], function () {
        return _this3._toggleForInputFilter();
      });
      this.initialized = false;
    }
  }]);

  return AdapterEzEditTable;
}(_feature__WEBPACK_IMPORTED_MODULE_0__["Feature"]);



/***/ }),

/***/ "./src/extensions/advancedGrid/advancedGrid.js":
/*!*****************************************************!*\
  !*** ./src/extensions/advancedGrid/advancedGrid.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adapterEzEditTable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adapterEzEditTable */ "./src/extensions/advancedGrid/adapterEzEditTable.js");

/* harmony default export */ __webpack_exports__["default"] = (_adapterEzEditTable__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/extensions/colOps/colOps.js":
/*!*****************************************!*\
  !*** ./src/extensions/colOps/colOps.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ColOps; });
/* harmony import */ var _feature__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../feature */ "./src/feature.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dom */ "./src/dom.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../types */ "./src/types.js");
/* harmony import */ var _sort__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../sort */ "./src/sort.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../const */ "./src/const.js");
/* harmony import */ var format_number__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! format-number */ "./node_modules/format-number/index.js");
/* harmony import */ var format_number__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(format_number__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../settings */ "./src/settings.js");
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../event */ "./src/event.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









var EVENTS = ['after-filtering', 'after-page-change', 'after-page-length-change'];
var SUM = 'sum';
var MEAN = 'mean';
var MIN = 'min';
var MAX = 'max';
var MEDIAN = 'median';
var Q1 = 'q1';
var Q3 = 'q3';
/**
 * Column calculations extension
 */

var ColOps =
/*#__PURE__*/
function (_Feature) {
  _inherits(ColOps, _Feature);

  /**
   * Creates an instance of ColOps
   *
   * @param {TableFilter} tf TableFilter instance
   * @param {Object} opts Configuration object
   */
  function ColOps(tf, opts) {
    var _this;

    _classCallCheck(this, ColOps);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ColOps).call(this, tf, opts.name));
    /**
     * Callback fired before columns operations start
     * @type {Function}
     */

    _this.onBeforeOperation = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsFn"])(opts.on_before_operation, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]);
    /**
     * Callback fired after columns operations are completed
     * @type {Function}
     */

    _this.onAfterOperation = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsFn"])(opts.on_after_operation, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]);
    /**
     * Configuration options
     * @type {Object}
     */

    _this.opts = opts;
    /**
     * List of DOM element IDs containing column's calculation result
     * @type {Array}
     */

    _this.labelIds = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsArr"])(opts.id, []);
    /**
     * List of columns' indexes for calculations
     * @type {Array}
     */

    _this.colIndexes = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsArr"])(opts.col, []);
    /**
     * List of operations - possible values: 'sum', 'mean', 'min', 'max',
     * 'median', 'q1', 'q3'
     * @type {Array}
     */

    _this.operations = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsArr"])(opts.operation, []);
    /**
     * List of write methods used to write the result - possible values:
     * 'innerHTML', 'setValue', 'createTextNode'
     * @type {Array}
     */

    _this.outputTypes = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsArr"])(opts.write_method, []);
    /**
     * List of format objects used for formatting the result -
     * refer to https://github.com/componitable/format-number to check
     * configuration options
     * @type {Array}
     */

    _this.formatResults = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsArr"])(opts.format_result, []);
    /**
     * List of row indexes displaying the results
     * @type {Array}
     */

    _this.totRowIndexes = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsArr"])(opts.tot_row_index, []);
    /**
     * List of row indexes excluded from calculations
     * @type {Array}
     */

    _this.excludeRows = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsArr"])(opts.exclude_row, []);
    /**
     * List of decimal precision for calculation results
     * @type {Array}
     */

    _this.decimalPrecisions = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsArr"])(opts.decimal_precision, 2);

    _this.enable();

    return _this;
  }
  /**
   * Initializes ColOps instance
   */


  _createClass(ColOps, [{
    key: "init",
    value: function init() {
      if (this.initialized) {
        return;
      } // subscribe to events


      this.emitter.on(EVENTS, Object(_event__WEBPACK_IMPORTED_MODULE_7__["bound"])(this.calcAll, this));
      this.calcAll();
      /** @inherited */

      this.initialized = true;
    }
    /**
     * Calculates columns' values
     * Configuration options are stored in 'opts' property
     * - 'id' contains ids of elements showing result (array)
     * - 'col' contains the columns' indexes (array)
     * - 'operation' contains operation type (array, values: 'sum', 'mean',
     *   'min', 'max', 'median', 'q1', 'q3')
     * - 'write_method' array defines which method to use for displaying the
     *    result (innerHTML, setValue, createTextNode) - default: 'innerHTML'
     * - 'tot_row_index' defines in which row results are displayed
     *   (integers array)
     *
     * - changes made by Nuovella:
     * (1) optimized the routine (now it will only process each column once),
     * (2) added calculations for the median, lower and upper quartile.
     */

  }, {
    key: "calcAll",
    value: function calcAll() {
      var tf = this.tf;

      if (!tf.isInitialized()) {
        return;
      }

      this.onBeforeOperation(tf, this);
      this.emitter.emit('before-column-operation', tf, this);
      var colIndexes = this.colIndexes,
          colOperations = this.operations,
          outputTypes = this.outputTypes,
          totRowIndexes = this.totRowIndexes,
          excludeRows = this.excludeRows,
          formatResults = this.formatResults,
          decimalPrecisions = this.decimalPrecisions; //nuovella: determine unique list of columns to operate on

      var uIndexes = [];
      colIndexes.forEach(function (val) {
        if (uIndexes.indexOf(val) === -1) {
          uIndexes.push(val);
        }
      });
      var nbCols = uIndexes.length,
          rows = tf.dom().rows,
          colValues = [];

      for (var u = 0; u < nbCols; u++) {
        //this retrieves col values
        //use uIndexes because we only want to pass through this loop
        //once for each column get the values in this unique column
        colValues.push(tf.getVisibleColumnData(uIndexes[u], false, excludeRows));
        var curValues = colValues[u]; //next: calculate all operations for this column

        var result = 0,
            operations = [],
            precisions = [],
            labels = [],
            writeType = void 0,
            formatResult = [],
            idx = 0;

        for (var k = 0; k < colIndexes.length; k++) {
          if (colIndexes[k] !== uIndexes[u]) {
            continue;
          }

          operations[idx] = (colOperations[k] || 'sum').toLowerCase();
          precisions[idx] = decimalPrecisions[k];
          labels[idx] = this.labelIds[k];
          writeType = Object(_types__WEBPACK_IMPORTED_MODULE_2__["isArray"])(outputTypes) ? outputTypes[k] : null;
          formatResult[idx] = this.configureFormat(uIndexes[u], formatResults[k]);
          idx++;
        }

        for (var i = 0; i < idx; i++) {
          // emit values before column calculation
          this.emitter.emit('before-column-calc', tf, this, uIndexes[u], curValues, operations[i], precisions[i]);
          result = Number(this.calc(curValues, operations[i], null)); // emit column calculation result

          this.emitter.emit('column-calc', tf, this, uIndexes[u], result, operations[i], precisions[i]); // write result in expected DOM element

          this.writeResult(result, labels[i], writeType, precisions[i], formatResult[i]);
        } //for i
        // row(s) with result are always visible


        var totRow = totRowIndexes && totRowIndexes[u] ? rows[totRowIndexes[u]] : null;

        if (totRow) {
          totRow.style.display = '';
        }
      } //for u


      this.onAfterOperation(tf, this);
      this.emitter.emit('after-column-operation', tf, this);
    }
    /**
     * Make desired calculation on specified column.
     * @param {Number} colIndex Column index
     * @param {String} [operation=SUM] Operation type
     * @param {Number} precision Decimal precision
     * @returns {Number}
     */

  }, {
    key: "columnCalc",
    value: function columnCalc(colIndex) {
      var operation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SUM;
      var precision = arguments.length > 2 ? arguments[2] : undefined;
      var excludeRows = this.excludeRows || [];
      var colValues = tf.getVisibleColumnData(colIndex, false, excludeRows);
      return Number(this.calc(colValues, operation, precision));
    }
    /**
     * Make calculation on passed values.
     * @param {Array} values List of values
     * @param {String} [operation=SUM] Optional operation type
     * @param {Number} precision Optional result precision
     * @returns {Number}
     * @private
     */

  }, {
    key: "calc",
    value: function calc(colValues) {
      var operation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SUM;
      var precision = arguments.length > 2 ? arguments[2] : undefined;
      var result = 0;

      if (operation === Q1 || operation === Q3 || operation === MEDIAN) {
        colValues = this.sortColumnValues(colValues, _sort__WEBPACK_IMPORTED_MODULE_3__["numSortAsc"]);
      }

      switch (operation) {
        case MEAN:
          result = this.calcMean(colValues);
          break;

        case SUM:
          result = this.calcSum(colValues);
          break;

        case MIN:
          result = this.calcMin(colValues);
          break;

        case MAX:
          result = this.calcMax(colValues);
          break;

        case MEDIAN:
          result = this.calcMedian(colValues);
          break;

        case Q1:
          result = this.calcQ1(colValues);
          break;

        case Q3:
          result = this.calcQ3(colValues);
          break;
      }

      return Object(_types__WEBPACK_IMPORTED_MODULE_2__["isEmpty"])(precision) ? result : result.toFixed(precision);
    }
    /**
     * Calculate the sum of passed values.
     * @param {Array} [values=[]] List of values
     * @returns {Number}
     */

  }, {
    key: "calcSum",
    value: function calcSum() {
      var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (Object(_types__WEBPACK_IMPORTED_MODULE_2__["isEmpty"])(values)) {
        return 0;
      }

      var result = values.reduce(function (x, y) {
        return Number(x) + Number(y);
      });
      return result;
    }
    /**
     * Calculate the mean of passed values.
     * @param {Array} [values=[]] List of values
     * @returns {Number}
     */

  }, {
    key: "calcMean",
    value: function calcMean() {
      var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var result = this.calcSum(values) / values.length;
      return Number(result);
    }
    /**
     * Calculate the max value of passed values.
     * @param {Array} [values=[]] List of values
     * @returns {Number}
     */

  }, {
    key: "calcMax",
    value: function calcMax() {
      var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return Math.max.apply(null, values);
    }
    /**
     * Calculate the min value of passed values.
     * @param {Array} [values=[]] List of values
     * @returns {Number}
     */

  }, {
    key: "calcMin",
    value: function calcMin() {
      var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return Math.min.apply(null, values);
    }
    /**
     * Calculate the median of passed values.
     * @param {Array} [values=[]] List of values
     * @returns {Number}
     */

  }, {
    key: "calcMedian",
    value: function calcMedian() {
      var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var nbValues = values.length;
      var aux = 0;

      if (nbValues % 2 === 1) {
        aux = Math.floor(nbValues / 2);
        return Number(values[aux]);
      }

      return (Number(values[nbValues / 2]) + Number(values[nbValues / 2 - 1])) / 2;
    }
    /**
     * Calculate the lower quartile of passed values.
     * @param {Array} [values=[]] List of values
     * @returns {Number}
     */

  }, {
    key: "calcQ1",
    value: function calcQ1() {
      var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var nbValues = values.length;
      var posa = 0.0;
      posa = Math.floor(nbValues / 4);

      if (4 * posa === nbValues) {
        return (Number(values[posa - 1]) + Number(values[posa])) / 2;
      }

      return Number(values[posa]);
    }
    /**
     * Calculate the upper quartile of passed values.
     * @param {Array} [values=[]] List of values
     * @returns {Number}
     */

  }, {
    key: "calcQ3",
    value: function calcQ3() {
      var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var nbValues = values.length;
      var posa = 0.0;
      var posb = 0.0;
      posa = Math.floor(nbValues / 4);

      if (4 * posa === nbValues) {
        posb = 3 * posa;
        return (Number(values[posb]) + Number(values[posb - 1])) / 2;
      }

      return Number(values[nbValues - posa - 1]);
    }
    /**
     * Sort passed values with supplied sorter function.
     * @param {Array} [values=[]] List of values to be sorted
     * @param {Function} sorter Sorter function
     * @returns {Array}
     */

  }, {
    key: "sortColumnValues",
    value: function sortColumnValues() {
      var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var sorter = arguments.length > 1 ? arguments[1] : undefined;
      return values.sort(sorter);
    }
    /**
     * Write calculation result in passed DOM element with supplied write method
     * and decimal precision.
     * @param {Number} [result=0] Calculation result
     * @param {DOMElement} label DOM element
     * @param {String} [writeType='innerhtml'] Write method
     * @param {Number} [precision=2] Applied decimal precision
     * @private
     */

  }, {
    key: "writeResult",
    value: function writeResult() {
      var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var label = arguments.length > 1 ? arguments[1] : undefined;
      var writeType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'innerhtml';
      var precision = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
      var format = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var labelElm = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])(label);

      if (!labelElm) {
        return;
      }

      result = result.toFixed(precision);

      if (isNaN(result) || !isFinite(result)) {
        result = '';
      } else {
        result = format_number__WEBPACK_IMPORTED_MODULE_5___default()(format)(result);
      }

      switch (writeType.toLowerCase()) {
        case 'innerhtml':
          labelElm.innerHTML = result;
          break;

        case 'setvalue':
          labelElm.value = result;
          break;

        case 'createtextnode':
          var oldNode = labelElm.firstChild;
          var txtNode = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createText"])(result);
          labelElm.replaceChild(txtNode, oldNode);
          break;
      }
    }
    /**
     * Configure the format options used to format the operation result based
     * on column type.
     * @param {Number} colIndex Column index
     * @param {Object} [format={}] Format object
     * @returns {Object}
     * @private
     */

  }, {
    key: "configureFormat",
    value: function configureFormat(colIndex) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var tf = this.tf;

      if (tf.hasType(colIndex, [_const__WEBPACK_IMPORTED_MODULE_4__["FORMATTED_NUMBER"]])) {
        var colType = tf.colTypes[colIndex];

        if (colType.decimal && !format.decimal) {
          format.decimal = colType.decimal;
        }

        if (colType.thousands && !format.integerSeparator) {
          format.integerSeparator = colType.thousands;
        }
      } else {
        format.decimal = format.decimal || '';
        format.integerSeparator = format.integerSeparator || '';
      }

      return format;
    }
    /** Remove extension */

  }, {
    key: "destroy",
    value: function destroy() {
      if (!this.initialized) {
        return;
      } // unsubscribe to events


      this.emitter.off(EVENTS, Object(_event__WEBPACK_IMPORTED_MODULE_7__["bound"])(this.calcAll, this));
      this.initialized = false;
    }
  }]);

  return ColOps;
}(_feature__WEBPACK_IMPORTED_MODULE_0__["Feature"]);



/***/ }),

/***/ "./src/extensions/colsVisibility/colsVisibility.js":
/*!*********************************************************!*\
  !*** ./src/extensions/colsVisibility/colsVisibility.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ColsVisibility; });
/* harmony import */ var _feature__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../feature */ "./src/feature.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dom */ "./src/dom.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../types */ "./src/types.js");
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../event */ "./src/event.js");
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../root */ "./src/root.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../const */ "./src/const.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../settings */ "./src/settings.js");
/* harmony import */ var _modules_toolbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../modules/toolbar */ "./src/modules/toolbar.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









/**
 * Columns Visibility extension
 */

var ColsVisibility =
/*#__PURE__*/
function (_Feature) {
  _inherits(ColsVisibility, _Feature);

  /**
   * Creates an instance of ColsVisibility
   * @param {TableFilter} tf TableFilter instance
   * @param {Object} Configuration object
   */
  function ColsVisibility(tf, f) {
    var _this;

    _classCallCheck(this, ColsVisibility);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ColsVisibility).call(this, tf, f.name)); // Configuration object

    var cfg = _this.config;
    /**
     * Module name
     * @type {String}
     */

    _this.name = f.name;
    /**
     * Module description
     * @type {String}
     */

    _this.desc = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.description, 'Columns visibility manager');
    /**
     * show/hide columns container element
     * @private
     */

    _this.spanEl = null;
    /**
     * show/hide columns button element
     * @private
     */

    _this.btnEl = null;
    /**
     * show/hide columns main container element
     * @private
     */

    _this.contEl = null;
    /**
     * Enable tick to hide a column, defaults to true
     * @type {Boolean}
     */

    _this.tickToHide = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsBool"])(f.tick_to_hide, true);
    /**
     * Enable columns manager UI, defaults to true
     * @type {Boolean}
     */

    _this.manager = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsBool"])(f.manager, true);
    /**
     * Headers HTML table reference only if headers are external
     * @type {DOMElement}
     */

    _this.headersTbl = f.headers_table || null;
    /**
     * Headers row index only if headers are external
     * @type {Number}
     */

    _this.headersIndex = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsNb"])(f.headers_index, 1);
    /**
     * ID of main container element
     * @type {String}
     */

    _this.contElTgtId = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.container_target_id, null);
    /**
     * Alternative text for column headers in column manager UI
     * @type {Array}
     */

    _this.headersText = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsArr"])(f.headers_text, []);
    /**
     * ID of button's container element
     * @type {String}
     */

    _this.btnTgtId = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.btn_target_id, null);
    /**
     * Button's text, defaults to Columns&#9660;
     * @type {String}
     */

    _this.btnText = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.btn_text, 'Columns&#9660;');
    /**
     * Button's inner HTML
     * @type {String}
     */

    _this.btnHtml = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.btn_html, null);
    /**
     * Css class for button
     * @type {String}
     */

    _this.btnCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.btn_css_class, 'colVis');
    /**
     * Columns manager UI close link text, defaults to 'Close'
     * @type {String}
     */

    _this.btnCloseText = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.btn_close_text, 'Close');
    /**
     * Columns manager UI close link HTML
     * @type {String}
     */

    _this.btnCloseHtml = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.btn_close_html, null);
    /**
     * Css for columns manager UI close link
     * @type {String}
     */

    _this.btnCloseCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.btn_close_css_class, _this.btnCssClass);
    /**
     * Extension's stylesheet filename
     * @type {String}
     */

    _this.stylesheet = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.stylesheet, 'colsVisibility.css');
    /**
     * Css for columns manager UI span
     * @type {String}
     */

    _this.spanCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.span_css_class, 'colVisSpan');
    /**
     * Css for columns manager UI main container
     * @type {String}
     */

    _this.contCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.cont_css_class, 'colVisCont');
    /**
     * Css for columns manager UI checklist (ul)
     * @type {String}
     */

    _this.listCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(cfg.list_css_class, 'cols_checklist');
    /**
     * Css for columns manager UI checklist item (li)
     * @type {String}
     */

    _this.listItemCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(cfg.checklist_item_css_class, 'cols_checklist_item');
    /**
     * Css for columns manager UI checklist item selected state (li)
     * @type {String}
     */

    _this.listSlcItemCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(cfg.checklist_selected_item_css_class, 'cols_checklist_slc_item');
    /**
     * Text preceding the columns list, defaults to 'Hide' or 'Show'
     * depending on tick mode (tick_to_hide option)
     * @type {String}
     */

    _this.text = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.text, _this.tickToHide ? 'Hide: ' : 'Show: ');
    /**
     * List of columns indexes to be hidden at initialization
     * @type {Array}
     */

    _this.atStart = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsArr"])(f.at_start, []);
    /**
     * Enable hover behaviour on columns manager button/link
     * @type {Boolean}
     */

    _this.enableHover = Boolean(f.enable_hover);
    /**
     * Enable select all option, disabled by default
     * @type {Boolean}
     */

    _this.enableTickAll = Boolean(f.enable_tick_all);
    /**
     * Text for select all option, defaults to 'Select all:'
     * @type {String}
     */

    _this.tickAllText = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.tick_all_text, 'Select all:');
    /**
     * Default position in toolbar ('left'|'center'|'right')
     * @type {String}
     */

    _this.toolbarPosition = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.toolbar_position, _modules_toolbar__WEBPACK_IMPORTED_MODULE_7__["RIGHT"]);
    /**
     * List of indexes of hidden columns
     * @private
     */

    _this.hiddenCols = [];
    /**
     * Bound mouseup wrapper
     * @private
     */

    _this.boundMouseup = null;
    /**
     * Callback fired when the extension is initialized
     * @type {Function}
     */

    _this.onLoaded = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsFn"])(f.on_loaded, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]);
    /**
     * Callback fired before the columns manager is opened
     * @type {Function}
     */

    _this.onBeforeOpen = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsFn"])(f.on_before_open, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]);
    /**
     * Callback fired after the columns manager is opened
     * @type {Function}
     */

    _this.onAfterOpen = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsFn"])(f.on_after_open, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]);
    /**
     * Callback fired before the columns manager is closed
     * @type {Function}
     */

    _this.onBeforeClose = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsFn"])(f.on_before_close, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]);
    /**
     * Callback fired after the columns manager is closed
     * @type {Function}
     */

    _this.onAfterClose = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsFn"])(f.on_after_close, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]);
    /**
     * Callback fired before a column is hidden
     * @type {Function}
     */

    _this.onBeforeColHidden = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsFn"])(f.on_before_col_hidden, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]);
    /**
     * Callback fired after a column is hidden
     * @type {Function}
     */

    _this.onAfterColHidden = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsFn"])(f.on_after_col_hidden, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]);
    /**
     * Callback fired before a column is displayed
     * @type {Function}
     */

    _this.onBeforeColDisplayed = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsFn"])(f.on_before_col_displayed, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]);
    /**
     * Callback fired after a column is displayed
     * @type {Function}
     */

    _this.onAfterColDisplayed = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsFn"])(f.on_after_col_displayed, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]); //Grid layout support

    if (tf.gridLayout) {
      _this.headersTbl = tf.feature('gridLayout').headTbl; //headers table

      _this.headersIndex = 0; //headers index
    } //Loads extension stylesheet


    tf.import(f.name + 'Style', tf.getStylePath() + _this.stylesheet, null, 'link');

    _this.enable();

    return _this;
  }
  /**
   * Mouse-up event handler handling popup auto-close behaviour
   * @private
   */


  _createClass(ColsVisibility, [{
    key: "onMouseup",
    value: function onMouseup(evt) {
      var targetElm = Object(_event__WEBPACK_IMPORTED_MODULE_3__["targetEvt"])(evt);

      while (targetElm && targetElm !== this.contEl && targetElm !== this.btnEl) {
        targetElm = targetElm.parentNode;
      }

      if (targetElm !== this.contEl && targetElm !== this.btnEl) {
        this.toggle();
      }

      return;
    }
    /**
     * Toggle columns manager UI
     */

  }, {
    key: "toggle",
    value: function toggle() {
      // ensure mouseup event handler is removed
      Object(_event__WEBPACK_IMPORTED_MODULE_3__["removeEvt"])(_root__WEBPACK_IMPORTED_MODULE_4__["root"], 'mouseup', this.boundMouseup);
      var contDisplay = this.contEl.style.display;

      if (contDisplay !== 'inline') {
        this.onBeforeOpen(this);
      }

      if (contDisplay === 'inline') {
        this.onBeforeClose(this);
      }

      this.contEl.style.display = contDisplay === 'inline' ? _const__WEBPACK_IMPORTED_MODULE_5__["NONE"] : 'inline';

      if (contDisplay !== 'inline') {
        this.onAfterOpen(this);
        Object(_event__WEBPACK_IMPORTED_MODULE_3__["addEvt"])(_root__WEBPACK_IMPORTED_MODULE_4__["root"], 'mouseup', this.boundMouseup);
      }

      if (contDisplay === 'inline') {
        this.onAfterClose(this);
      }
    }
    /**
     * Check an item in columns manager UI
     * @private
     */

  }, {
    key: "checkItem",
    value: function checkItem(lbl) {
      var li = lbl.parentNode;

      if (!li || !lbl) {
        return;
      }

      var isChecked = lbl.firstChild.checked;
      var colIndex = lbl.firstChild.getAttribute('id').split('_')[1];
      colIndex = parseInt(colIndex, 10);

      if (isChecked) {
        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["addClass"])(li, this.listSlcItemCssClass);
      } else {
        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeClass"])(li, this.listSlcItemCssClass);
      }

      var hide = false;

      if (this.tickToHide && isChecked || !this.tickToHide && !isChecked) {
        hide = true;
      }

      this.setHidden(colIndex, hide);
    }
    /**
     * Initializes ColsVisibility instance
     */

  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      if (this.initialized || !this.manager) {
        return;
      }

      this.emitter.emit('initializing-extension', this, !Object(_types__WEBPACK_IMPORTED_MODULE_2__["isNull"])(this.btnTgtId));
      this.emitter.on(['hide-column'], function (tf, colIndex) {
        return _this2.hideCol(colIndex);
      });
      this.buildBtn();
      this.buildManager();
      /** @inherited */

      this.initialized = true;
      this.boundMouseup = this.onMouseup.bind(this);
      this.emitter.emit('columns-visibility-initialized', this.tf, this);
      this.emitter.emit('extension-initialized', this); // Hide columns at start at very end of initialization, do not move
      // as order is important

      this._hideAtStart();
    }
    /**
     * Build main button UI
     */

  }, {
    key: "buildBtn",
    value: function buildBtn() {
      var _this3 = this;

      if (this.btnEl) {
        return;
      }

      var tf = this.tf;
      var span = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('span');
      span.className = this.spanCssClass; // Container element (rdiv or custom element)

      var targetEl = !this.btnTgtId ? tf.feature('toolbar').container(this.toolbarPosition) : Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])(this.btnTgtId);

      if (!this.btnTgtId) {
        var firstChild = targetEl.firstChild;
        firstChild.parentNode.insertBefore(span, firstChild);
      } else {
        targetEl.appendChild(span);
      }

      if (!this.btnHtml) {
        var btn = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('a', ['href', 'javascript:;']);
        btn.className = this.btnCssClass;
        btn.title = this.desc;
        btn.innerHTML = this.btnText;
        span.appendChild(btn);

        if (!this.enableHover) {
          Object(_event__WEBPACK_IMPORTED_MODULE_3__["addEvt"])(btn, 'click', function (evt) {
            return _this3.toggle(evt);
          });
        } else {
          Object(_event__WEBPACK_IMPORTED_MODULE_3__["addEvt"])(btn, 'mouseover', function (evt) {
            return _this3.toggle(evt);
          });
        }
      } else {
        // Custom html
        span.innerHTML = this.btnHtml;
        var colVisEl = span.firstChild;

        if (!this.enableHover) {
          Object(_event__WEBPACK_IMPORTED_MODULE_3__["addEvt"])(colVisEl, 'click', function (evt) {
            return _this3.toggle(evt);
          });
        } else {
          Object(_event__WEBPACK_IMPORTED_MODULE_3__["addEvt"])(colVisEl, 'mouseover', function (evt) {
            return _this3.toggle(evt);
          });
        }
      }

      this.spanEl = span;
      this.btnEl = this.spanEl.firstChild;
      this.onLoaded(this);
    }
    /**
     * Build columns manager UI
     */

  }, {
    key: "buildManager",
    value: function buildManager() {
      var _this4 = this;

      var tf = this.tf;
      var container = !this.contElTgtId ? Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('div') : Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])(this.contElTgtId);
      container.className = this.contCssClass; //Extension description

      var extNameLabel = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('p');
      extNameLabel.innerHTML = this.text;
      container.appendChild(extNameLabel); //Headers list

      var ul = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('ul');
      ul.className = this.listCssClass;
      var tbl = this.headersTbl || tf.dom();
      var headerIndex = this.headersTbl ? this.headersIndex : tf.getHeadersRowIndex();
      var headerRow = tbl.rows[headerIndex]; //Tick all option

      if (this.enableTickAll) {
        var li = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createCheckItem"])('col__' + tf.id, this.tickAllText, this.tickAllText);
        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["addClass"])(li, this.listItemCssClass);
        ul.appendChild(li);
        li.check.checked = !this.tickToHide;
        Object(_event__WEBPACK_IMPORTED_MODULE_3__["addEvt"])(li.check, 'click', function () {
          for (var h = 0; h < headerRow.cells.length; h++) {
            var itm = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])('col_' + h + '_' + tf.id);

            if (itm && li.check.checked !== itm.checked) {
              itm.click();
              itm.checked = li.check.checked;
            }
          }
        });
      }

      for (var i = 0; i < headerRow.cells.length; i++) {
        var cell = headerRow.cells[i];

        var cellText = this.headersText[i] || this._getHeaderText(cell);

        var liElm = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createCheckItem"])('col_' + i + '_' + tf.id, cellText, cellText);
        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["addClass"])(liElm, this.listItemCssClass);

        if (!this.tickToHide) {
          Object(_dom__WEBPACK_IMPORTED_MODULE_1__["addClass"])(liElm, this.listSlcItemCssClass);
        }

        ul.appendChild(liElm);

        if (!this.tickToHide) {
          liElm.check.checked = true;
        }

        Object(_event__WEBPACK_IMPORTED_MODULE_3__["addEvt"])(liElm.check, 'click', function (evt) {
          var elm = Object(_event__WEBPACK_IMPORTED_MODULE_3__["targetEvt"])(evt);
          var lbl = elm.parentNode;

          _this4.checkItem(lbl);
        });
      } //separator


      var p = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('p', ['align', 'center']);
      var btn; //Close link

      if (!this.btnCloseHtml) {
        btn = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('a', ['href', 'javascript:;']);
        btn.className = this.btnCloseCssClass;
        btn.innerHTML = this.btnCloseText;
        Object(_event__WEBPACK_IMPORTED_MODULE_3__["addEvt"])(btn, 'click', function (evt) {
          return _this4.toggle(evt);
        });
        p.appendChild(btn);
      } else {
        p.innerHTML = this.btnCloseHtml;
        btn = p.firstChild;
        Object(_event__WEBPACK_IMPORTED_MODULE_3__["addEvt"])(btn, 'click', function (evt) {
          return _this4.toggle(evt);
        });
      }

      container.appendChild(ul);
      container.appendChild(p);
      this.btnEl.parentNode.insertBefore(container, this.btnEl);
      this.contEl = container;
    }
    /**
     * Hide or show specified columns
     * @param {Number} colIndex Column index
     * @param {Boolean} hide    Hide column if true or show if false
     */

  }, {
    key: "setHidden",
    value: function setHidden(colIndex, hide) {
      var tf = this.tf;
      var tbl = tf.dom();

      if (hide) {
        this.onBeforeColHidden(this, colIndex);
      } else {
        this.onBeforeColDisplayed(this, colIndex);
      }

      this._hideElements(tbl, colIndex, hide);

      if (this.headersTbl) {
        this._hideElements(this.headersTbl, colIndex, hide);
      }

      var hiddenCols = this.hiddenCols;
      var itemIndex = hiddenCols.indexOf(colIndex);

      if (hide) {
        if (itemIndex === -1) {
          this.hiddenCols.push(colIndex);
        }
      } else {
        if (itemIndex !== -1) {
          this.hiddenCols.splice(itemIndex, 1);
        }
      }

      if (hide) {
        this.onAfterColHidden(this, colIndex);
        this.emitter.emit('column-hidden', tf, this, colIndex, this.hiddenCols);
      } else {
        this.onAfterColDisplayed(this, colIndex);
        this.emitter.emit('column-shown', tf, this, colIndex, this.hiddenCols);
      }
    }
    /**
     * Show specified column
     * @param  {Number} colIndex Column index
     */

  }, {
    key: "showCol",
    value: function showCol(colIndex) {
      if (Object(_types__WEBPACK_IMPORTED_MODULE_2__["isUndef"])(colIndex) || !this.isColHidden(colIndex)) {
        return;
      }

      if (this.manager && this.contEl) {
        var itm = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])('col_' + colIndex + '_' + this.tf.id);

        if (itm) {
          itm.click();
        }
      } else {
        this.setHidden(colIndex, false);
      }
    }
    /**
     * Hide specified column
     * @param  {Number} colIndex Column index
     */

  }, {
    key: "hideCol",
    value: function hideCol(colIndex) {
      if (Object(_types__WEBPACK_IMPORTED_MODULE_2__["isUndef"])(colIndex) || this.isColHidden(colIndex)) {
        return;
      }

      if (this.manager && this.contEl) {
        var itm = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])('col_' + colIndex + '_' + this.tf.id);

        if (itm) {
          itm.click();
        }
      } else {
        this.setHidden(colIndex, true);
      }
    }
    /**
     * Determine if specified column is hidden
     * @param  {Number} colIndex Column index
     */

  }, {
    key: "isColHidden",
    value: function isColHidden(colIndex) {
      if (this.hiddenCols.indexOf(colIndex) !== -1) {
        return true;
      }

      return false;
    }
    /**
     * Toggle visibility of specified column
     * @param  {Number} colIndex Column index
     */

  }, {
    key: "toggleCol",
    value: function toggleCol(colIndex) {
      if (Object(_types__WEBPACK_IMPORTED_MODULE_2__["isUndef"])(colIndex) || this.isColHidden(colIndex)) {
        this.showCol(colIndex);
      } else {
        this.hideCol(colIndex);
      }
    }
    /**
     * Return the indexes of the columns currently hidden
     * @return {Array} column indexes
     */

  }, {
    key: "getHiddenCols",
    value: function getHiddenCols() {
      return this.hiddenCols;
    }
    /**
     * Remove the columns manager
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this5 = this;

      if (!this.initialized) {
        return;
      }

      if (Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])(this.contElTgtId)) {
        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])(this.contElTgtId).innerHTML = '';
      } else {
        this.contEl.innerHTML = '';
        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(this.contEl);
        this.contEl = null;
      }

      this.btnEl.innerHTML = '';
      Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(this.btnEl);
      this.btnEl = null;
      this.emitter.off(['hide-column'], function (tf, colIndex) {
        return _this5.hideCol(colIndex);
      });
      this.boundMouseup = null;
      this.initialized = false;
    }
  }, {
    key: "_getHeaderText",
    value: function _getHeaderText(cell) {
      if (!cell.hasChildNodes) {
        return '';
      }

      for (var i = 0; i < cell.childNodes.length; i++) {
        var n = cell.childNodes[i];

        if (n.nodeType === 3) {
          return n.nodeValue;
        } else if (n.nodeType === 1) {
          if (n.id && n.id.indexOf('popUp') !== -1) {
            continue;
          } else {
            return Object(_dom__WEBPACK_IMPORTED_MODULE_1__["getText"])(n);
          }
        }

        continue;
      }

      return '';
    }
  }, {
    key: "_hideElements",
    value: function _hideElements(tbl, colIdx, hide) {
      this._hideCells(tbl, colIdx, hide);

      this._hideCol(tbl, colIdx, hide);
    }
  }, {
    key: "_hideCells",
    value: function _hideCells(tbl, colIdx, hide) {
      for (var i = 0; i < tbl.rows.length; i++) {
        var row = tbl.rows[i];
        var cell = row.cells[colIdx];

        if (cell) {
          cell.style.display = hide ? _const__WEBPACK_IMPORTED_MODULE_5__["NONE"] : '';
        }
      }
    }
  }, {
    key: "_hideCol",
    value: function _hideCol(tbl, colIdx, hide) {
      var colElms = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["tag"])(tbl, 'col');

      if (colElms.length === 0) {
        return;
      }

      colElms[colIdx].style.display = hide ? _const__WEBPACK_IMPORTED_MODULE_5__["NONE"] : '';
    }
  }, {
    key: "_hideAtStart",
    value: function _hideAtStart() {
      var _this6 = this;

      this.atStart.forEach(function (colIdx) {
        _this6.hideCol(colIdx);
      });
    }
  }]);

  return ColsVisibility;
}(_feature__WEBPACK_IMPORTED_MODULE_0__["Feature"]);



/***/ }),

/***/ "./src/extensions/filtersVisibility/filtersVisibility.js":
/*!***************************************************************!*\
  !*** ./src/extensions/filtersVisibility/filtersVisibility.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FiltersVisibility; });
/* harmony import */ var _feature__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../feature */ "./src/feature.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dom */ "./src/dom.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../types */ "./src/types.js");
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../event */ "./src/event.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../settings */ "./src/settings.js");
/* harmony import */ var _modules_toolbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/toolbar */ "./src/modules/toolbar.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







/**
 * Filters Visibility extension
 */

var FiltersVisibility =
/*#__PURE__*/
function (_Feature) {
  _inherits(FiltersVisibility, _Feature);

  /**
   * Creates an instance of FiltersVisibility
   * @param {TableFilter} tf TableFilter instance
   * @param {Object} Configuration object
   */
  function FiltersVisibility(tf, f) {
    var _this;

    _classCallCheck(this, FiltersVisibility);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FiltersVisibility).call(this, tf, f.name));
    /**
     * Module name
     * @type {String}
     */

    _this.name = f.name;
    /**
     * Module description
     * @type {String}
     */

    _this.desc = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.description, 'Filters row visibility manager');
    /**
     * Extension's stylesheet filename
     * @type {String}
     */

    _this.stylesheet = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.stylesheet, 'filtersVisibility.css');
    /**
     * Expand icon filename
     * @type {String}
     */

    _this.icnExpand = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.expand_icon_name, 'icn_exp.png');
    /**
     * Collapse icon filename
     * @type {String}
     */

    _this.icnCollapse = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.collapse_icon_name, 'icn_clp.png');
    /**
     * Main container element
     * @private
     */

    _this.contEl = null;
    /**
     * Button element
     * @private
     */

    _this.btnEl = null;
    /**
     * Expand icon HTML
     * @private
     */

    _this.icnExpandHtml = '<img src="' + tf.themesPath + _this.icnExpand + '" alt="Expand filters" >';
    /**
     * Collapse icon HTML
     * @private
     */

    _this.icnCollapseHtml = '<img src="' + tf.themesPath + _this.icnCollapse + '" alt="Collapse filters" >';
    /**
     * Default text
     * @private
     */

    _this.defaultText = 'Toggle filters';
    /**
     * ID of main container element
     * @type {String}
     */

    _this.targetId = f.target_id || null;
    /**
     * Enable expand/collapse icon, defaults to true
     * @type {Boolean}
     */

    _this.enableIcon = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsBool"])(f.enable_icon, true);
    /**
     * Custom text for button
     * @type {String}
     */

    _this.btnText = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.btn_text, '');
    /**
     * Collapse button HTML
     * @private
     */

    _this.collapseBtnHtml = _this.enableIcon ? _this.icnCollapseHtml + _this.btnText : _this.btnText || _this.defaultText;
    /**
     * Expand button HTML
     * @private
     */

    _this.expandBtnHtml = _this.enableIcon ? _this.icnExpandHtml + _this.btnText : _this.btnText || _this.defaultText;
    /**
     * Button's custom HTML
     * @type {String}
     */

    _this.btnHtml = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.btn_html, null);
    /**
     * Css class for expand/collapse filters button
     * @type {String}
     */

    _this.btnCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.btn_css_class, 'btnExpClpFlt');
    /**
     * Css class for main container
     * @type {String}
     */

    _this.contCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.cont_css_class, 'expClpFlt');
    /**
     * Filters row index
     * @type {Number}
     */

    _this.filtersRowIndex = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsNb"])(f.filters_row_index, tf.getFiltersRowIndex());
    /**
     * Make filters visible at initialization, defaults to true
     * @type {Boolean}
     */

    _this.visibleAtStart = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsNb"])(f.visible_at_start, true);
    /**
     * Default position in toolbar ('left'|'center'|'right')
     * @type {String}
     */

    _this.toolbarPosition = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.toolbar_position, _modules_toolbar__WEBPACK_IMPORTED_MODULE_5__["RIGHT"]);
    /**
     * Callback fired before filters row is shown
     * @type {Function}
     */

    _this.onBeforeShow = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsFn"])(f.on_before_show, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]);
    /**
     * Callback fired after filters row is shown
     * @type {Function}
     */

    _this.onAfterShow = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsFn"])(f.on_after_show, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]);
    /**
     * Callback fired before filters row is hidden
     * @type {Function}
     */

    _this.onBeforeHide = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsFn"])(f.on_before_hide, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]);
    /**
     * Callback fired after filters row is hidden
     * @type {Function}
     */

    _this.onAfterHide = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsFn"])(f.on_after_hide, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]); //Import extension's stylesheet

    tf.import(f.name + 'Style', tf.getStylePath() + _this.stylesheet, null, 'link');

    _this.enable();

    return _this;
  }
  /**
   * Initialise extension
   */


  _createClass(FiltersVisibility, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      if (this.initialized) {
        return;
      }

      this.emitter.emit('initializing-extension', this, !Object(_types__WEBPACK_IMPORTED_MODULE_2__["isNull"])(this.targetId));
      this.buildUI();
      /** @inherited */

      this.initialized = true;
      this.emitter.on(['show-filters'], function (tf, visible) {
        return _this2.show(visible);
      });
      this.emitter.emit('filters-visibility-initialized', this.tf, this);
      this.emitter.emit('extension-initialized', this);
    }
    /**
     * Build UI elements
     */

  }, {
    key: "buildUI",
    value: function buildUI() {
      var _this3 = this;

      var tf = this.tf;
      var span = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('span');
      span.className = this.contCssClass; // Container element (rdiv or custom element)

      var targetEl = !this.targetId ? tf.feature('toolbar').container(this.toolbarPosition) : Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])(this.targetId);

      if (!this.targetId) {
        var firstChild = targetEl.firstChild;
        firstChild.parentNode.insertBefore(span, firstChild);
      } else {
        targetEl.appendChild(span);
      }

      var btn;

      if (!this.btnHtml) {
        btn = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('a', ['href', 'javascript:void(0);']);
        btn.className = this.btnCssClass;
        btn.title = this.btnText || this.defaultText;
        btn.innerHTML = this.collapseBtnHtml;
        span.appendChild(btn);
      } else {
        // Custom html
        span.innerHTML = this.btnHtml;
        btn = span.firstChild;
      }

      Object(_event__WEBPACK_IMPORTED_MODULE_3__["addEvt"])(btn, 'click', function () {
        return _this3.toggle();
      });
      this.contEl = span;
      this.btnEl = btn;

      if (!this.visibleAtStart) {
        this.toggle();
      }
    }
    /**
     * Toggle filters visibility
     */

  }, {
    key: "toggle",
    value: function toggle() {
      var tf = this.tf;
      var tbl = tf.gridLayout ? tf.feature('gridLayout').headTbl : tf.dom();
      var fltRow = tbl.rows[this.filtersRowIndex];
      var isDisplayed = fltRow.style.display === '';
      this.show(!isDisplayed);
    }
    /**
     * Show or hide filters
     *
     * @param {boolean} [visible=true] Visibility flag
     */

  }, {
    key: "show",
    value: function show() {
      var visible = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var tf = this.tf;
      var tbl = tf.gridLayout ? tf.feature('gridLayout').headTbl : tf.dom();
      var fltRow = tbl.rows[this.filtersRowIndex];

      if (visible) {
        this.onBeforeShow(this);
      }

      if (!visible) {
        this.onBeforeHide(this);
      }

      fltRow.style.display = visible ? '' : 'none';

      if (this.enableIcon && !this.btnHtml) {
        this.btnEl.innerHTML = visible ? this.collapseBtnHtml : this.expandBtnHtml;
      }

      if (visible) {
        this.onAfterShow(this);
      }

      if (!visible) {
        this.onAfterHide(this);
      }

      this.emitter.emit('filters-toggled', tf, this, visible);
    }
    /**
     * Destroy the UI
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this4 = this;

      if (!this.initialized) {
        return;
      }

      this.emitter.off(['show-filters'], function (tf, visible) {
        return _this4.show(visible);
      });
      this.btnEl.innerHTML = '';
      Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(this.btnEl);
      this.btnEl = null;
      this.contEl.innerHTML = '';
      Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(this.contEl);
      this.contEl = null;
      this.initialized = false;
    }
  }]);

  return FiltersVisibility;
}(_feature__WEBPACK_IMPORTED_MODULE_0__["Feature"]);



/***/ }),

/***/ "./src/extensions/sort/adapterSortabletable.js":
/*!*****************************************************!*\
  !*** ./src/extensions/sort/adapterSortabletable.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AdapterSortableTable; });
/* harmony import */ var _feature__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../feature */ "./src/feature.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../types */ "./src/types.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../dom */ "./src/dom.js");
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../event */ "./src/event.js");
/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../number */ "./src/number.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../const */ "./src/const.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../settings */ "./src/settings.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








/**
 * SortableTable Adapter module
 */

var AdapterSortableTable =
/*#__PURE__*/
function (_Feature) {
  _inherits(AdapterSortableTable, _Feature);

  /**
   * Creates an instance of AdapterSortableTable
   * @param {TableFilter} tf TableFilter instance
   * @param {Object} opts Configuration object
   */
  function AdapterSortableTable(tf, opts) {
    var _this;

    _classCallCheck(this, AdapterSortableTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AdapterSortableTable).call(this, tf, opts.name));
    /**
     * Module name
     * @type {String}
     */

    _this.name = opts.name;
    /**
     * Module description
     * @type {String}
     */

    _this.desc = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(opts.description, 'Sortable table');
    /**
     * Indicate whether table previously sorted
     * @type {Boolean}
     * @private
     */

    _this.sorted = false;
    /**
     * List of sort type per column basis
     * @type {Array}
     */

    _this.sortTypes = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsArr"])(opts.types, tf.colTypes);
    /**
     * Column to be sorted at initialization, ie:
     * sort_col_at_start: [1, true]
     * @type {Array}
     */

    _this.sortColAtStart = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsArr"])(opts.sort_col_at_start, null);
    /**
     * Enable asynchronous sort, if triggers are external
     * @type {Boolean}
     */

    _this.asyncSort = Boolean(opts.async_sort);
    /**
     * List of element IDs triggering sort on a per column basis
     * @type {Array}
     */

    _this.triggerIds = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsArr"])(opts.trigger_ids, []); // edit .sort-arrow.descending / .sort-arrow.ascending in
    // tablefilter.css to reflect any path change

    /**
     * Path to images
     * @type {String}
     */

    _this.imgPath = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(opts.images_path, tf.themesPath);
    /**
     * Blank image file name
     * @type {String}
     */

    _this.imgBlank = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(opts.image_blank, 'blank.png');
    /**
     * Css class for sort indicator image
     * @type {String}
     */

    _this.imgClassName = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(opts.image_class_name, 'sort-arrow');
    /**
     * Css class for ascending sort indicator image
     * @type {String}
     */

    _this.imgAscClassName = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(opts.image_asc_class_name, 'ascending');
    /**
     * Css class for descending sort indicator image
     * @type {String}
     */

    _this.imgDescClassName = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(opts.image_desc_class_name, 'descending');
    /**
     * Cell attribute key storing custom value used for sorting
     * @type {String}
     */

    _this.customKey = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(opts.custom_key, 'data-tf-sortKey');
    /**
     * Callback fired when sort extension is instanciated
     * @type {Function}
     */

    _this.onSortLoaded = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsFn"])(opts.on_sort_loaded, _types__WEBPACK_IMPORTED_MODULE_1__["EMPTY_FN"]);
    /**
     * Callback fired before a table column is sorted
     * @type {Function}
     */

    _this.onBeforeSort = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsFn"])(opts.on_before_sort, _types__WEBPACK_IMPORTED_MODULE_1__["EMPTY_FN"]);
    /**
     * Callback fired after a table column is sorted
     * @type {Function}
     */

    _this.onAfterSort = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsFn"])(opts.on_after_sort, _types__WEBPACK_IMPORTED_MODULE_1__["EMPTY_FN"]);
    /**
     * SortableTable instance
     * @private
     */

    _this.stt = null;

    _this.enable();

    return _this;
  }
  /**
   * Initializes AdapterSortableTable instance
   */


  _createClass(AdapterSortableTable, [{
    key: "init",
    value: function init() {
      if (this.initialized) {
        return;
      }

      var tf = this.tf;
      var adpt = this; // SortableTable class sanity check (sortabletable.js)

      if (Object(_types__WEBPACK_IMPORTED_MODULE_1__["isUndef"])(SortableTable)) {
        throw new Error('SortableTable class not found.');
      } // Add any date format if needed


      this.emitter.emit('add-date-type-formats', this.tf, this.sortTypes);
      this.overrideSortableTable();
      this.setSortTypes();
      this.onSortLoaded(tf, this);
      /*** SortableTable callbacks ***/

      this.stt.onbeforesort = function () {
        adpt.onBeforeSort(tf, adpt.stt.sortColumn);
        /*** sort behaviour for paging ***/

        if (tf.paging) {
          tf.feature('paging').disable();
        }
      };

      this.stt.onsort = function () {
        adpt.sorted = true; //sort behaviour for paging

        if (tf.paging) {
          var paginator = tf.feature('paging'); // recalculate valid rows index as sorting may have change it

          tf.getValidRows(true);
          paginator.enable();
          paginator.setPage(paginator.getPage());
        }

        adpt.onAfterSort(tf, adpt.stt.sortColumn, adpt.stt.descending);
        adpt.emitter.emit('column-sorted', tf, adpt.stt.sortColumn, adpt.stt.descending);
      }; // Column sort at start


      var sortColAtStart = adpt.sortColAtStart;

      if (sortColAtStart) {
        this.stt.sort(sortColAtStart[0], sortColAtStart[1]);
      }

      this.emitter.on(['sort'], Object(_event__WEBPACK_IMPORTED_MODULE_3__["bound"])(this.sortByColumnIndexHandler, this));
      /** @inherited */

      this.initialized = true;
      this.emitter.emit('sort-initialized', tf, this);
    }
    /**
     * Sort specified column
     * @param {Number} colIdx Column index
     * @param {Boolean} desc Optional: descending manner
     */

  }, {
    key: "sortByColumnIndex",
    value: function sortByColumnIndex(colIdx, desc) {
      this.stt.sort(colIdx, desc);
    }
    /** @private */

  }, {
    key: "sortByColumnIndexHandler",
    value: function sortByColumnIndexHandler(tf, colIdx, desc) {
      this.sortByColumnIndex(colIdx, desc);
    }
    /**
     * Set SortableTable overrides for TableFilter integration
     */

  }, {
    key: "overrideSortableTable",
    value: function overrideSortableTable() {
      var adpt = this,
          tf = this.tf;
      /**
       * Overrides headerOnclick method in order to handle th event
       * @param  {Object} e [description]
       */

      SortableTable.prototype.headerOnclick = function (evt) {
        if (!adpt.initialized) {
          return;
        } // find Header element


        var el = evt.target || evt.srcElement;

        while (el.tagName !== _const__WEBPACK_IMPORTED_MODULE_5__["CELL_TAG"] && el.tagName !== _const__WEBPACK_IMPORTED_MODULE_5__["HEADER_TAG"]) {
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

        for (i = 0; cells[i] !== oTd && i < l; i++) {}

        return i;
      };
      /**
       * Overrides initHeader in order to handle filters row position
       * @param  {Array} oSortTypes
       */


      SortableTable.prototype.initHeader = function (oSortTypes) {
        var stt = this;

        if (!stt.tHead) {
          if (tf.gridLayout) {
            stt.tHead = tf.feature('gridLayout').headTbl.tHead;
          } else {
            return;
          }
        }

        stt.headersRow = tf.headersRow;
        var cells = stt.tHead.rows[stt.headersRow].cells;
        stt.sortTypes = oSortTypes || [];
        var l = cells.length;
        var img, c;

        for (var i = 0; i < l; i++) {
          c = cells[i];

          if (stt.sortTypes[i] !== null && stt.sortTypes[i] !== 'None') {
            c.style.cursor = 'pointer';
            img = Object(_dom__WEBPACK_IMPORTED_MODULE_2__["createElm"])('img', ['src', adpt.imgPath + adpt.imgBlank]);
            c.appendChild(img);

            if (stt.sortTypes[i] !== null) {
              c.setAttribute('_sortType', stt.sortTypes[i]);
            }

            Object(_event__WEBPACK_IMPORTED_MODULE_3__["addEvt"])(c, 'click', stt._headerOnclick);
          } else {
            c.setAttribute('_sortType', oSortTypes[i]);
            c._sortType = 'None';
          }
        }

        stt.updateHeaderArrows();
      };
      /**
       * Overrides updateHeaderArrows in order to handle arrows indicators
       */


      SortableTable.prototype.updateHeaderArrows = function () {
        var stt = this;
        var cells, l, img; // external headers

        if (adpt.asyncSort && adpt.triggerIds.length > 0) {
          var triggers = adpt.triggerIds;
          cells = [];
          l = triggers.length;

          for (var j = 0; j < l; j++) {
            cells.push(Object(_dom__WEBPACK_IMPORTED_MODULE_2__["elm"])(triggers[j]));
          }
        } else {
          if (!this.tHead) {
            return;
          }

          cells = stt.tHead.rows[stt.headersRow].cells;
          l = cells.length;
        }

        for (var i = 0; i < l; i++) {
          var cell = cells[i];

          if (!cell) {
            continue;
          }

          var cellAttr = cell.getAttribute('_sortType');

          if (cellAttr !== null && cellAttr !== 'None') {
            img = cell.lastChild || cell;

            if (img.nodeName.toLowerCase() !== 'img') {
              img = Object(_dom__WEBPACK_IMPORTED_MODULE_2__["createElm"])('img', ['src', adpt.imgPath + adpt.imgBlank]);
              cell.appendChild(img);
            }

            if (i === stt.sortColumn) {
              img.className = adpt.imgClassName + ' ' + (this.descending ? adpt.imgDescClassName : adpt.imgAscClassName);
            } else {
              img.className = adpt.imgClassName;
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
        var stt = this; // if we have defined a custom getRowValue use that

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
       * @param  {Object} cell DOM element
       * @return {String}       DOM element inner text
       */


      SortableTable.getInnerText = function (cell) {
        if (!cell) {
          return;
        }

        if (cell.getAttribute(adpt.customKey)) {
          return cell.getAttribute(adpt.customKey);
        } else {
          return tf.getCellValue(cell);
        }
      };
    }
    /**
     * Adds a sort type
     */

  }, {
    key: "addSortType",
    value: function addSortType() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // Extract the arguments
      var id = args[0],
          caster = args[1],
          sorter = args[2],
          getRowValue = args[3];
      SortableTable.prototype.addSortType(id, caster, sorter, getRowValue);
    }
    /**
     * Sets the sort types on a column basis
     * @private
     */

  }, {
    key: "setSortTypes",
    value: function setSortTypes() {
      var _this2 = this;

      var tf = this.tf,
          sortTypes = this.sortTypes,
          _sortTypes = [];
      tf.eachCol(function (i) {
        var colType;

        if (sortTypes[i]) {
          colType = sortTypes[i];

          if (Object(_types__WEBPACK_IMPORTED_MODULE_1__["isObj"])(colType)) {
            if (colType.type === _const__WEBPACK_IMPORTED_MODULE_5__["DATE"]) {
              colType = _this2._addDateType(i, sortTypes);
            } else if (colType.type === _const__WEBPACK_IMPORTED_MODULE_5__["FORMATTED_NUMBER"]) {
              var decimal = colType.decimal || tf.decimalSeparator;
              colType = _this2._addNumberType(i, decimal);
            }
          } else {
            colType = colType.toLowerCase();

            if (colType === _const__WEBPACK_IMPORTED_MODULE_5__["DATE"]) {
              colType = _this2._addDateType(i, sortTypes);
            } else if (colType === _const__WEBPACK_IMPORTED_MODULE_5__["FORMATTED_NUMBER"] || colType === _const__WEBPACK_IMPORTED_MODULE_5__["NUMBER"]) {
              colType = _this2._addNumberType(i, tf.decimalSeparator);
            } else if (colType === _const__WEBPACK_IMPORTED_MODULE_5__["NONE"]) {
              // TODO: normalise 'none' vs 'None'
              colType = 'None';
            }
          }
        } else {
          colType = _const__WEBPACK_IMPORTED_MODULE_5__["STRING"];
        }

        _sortTypes.push(colType);
      }); //Public TF method to add sort type
      //Custom sort types

      this.addSortType('caseinsensitivestring', SortableTable.toUpperCase);
      this.addSortType(_const__WEBPACK_IMPORTED_MODULE_5__["STRING"]);
      this.addSortType(_const__WEBPACK_IMPORTED_MODULE_5__["IP_ADDRESS"], ipAddress, sortIP);
      this.stt = new SortableTable(tf.dom(), _sortTypes);
      /*** external table headers adapter ***/

      if (this.asyncSort && this.triggerIds.length > 0) {
        (function () {
          var triggers = _this2.triggerIds;

          for (var j = 0; j < triggers.length; j++) {
            if (triggers[j] === null) {
              continue;
            }

            var trigger = Object(_dom__WEBPACK_IMPORTED_MODULE_2__["elm"])(triggers[j]);

            if (trigger) {
              trigger.style.cursor = 'pointer';
              Object(_event__WEBPACK_IMPORTED_MODULE_3__["addEvt"])(trigger, 'click', function (evt) {
                var elm = evt.target;

                if (!_this2.tf.sort) {
                  return;
                }

                _this2.stt.asyncSort(triggers.indexOf(elm.id));
              });
              trigger.setAttribute('_sortType', _sortTypes[j]);
            }
          }
        })();
      }
    }
  }, {
    key: "_addDateType",
    value: function _addDateType(colIndex, types) {
      var tf = this.tf;
      var dateType = tf.feature('dateType');
      var locale = dateType.getOptions(colIndex, types).locale || tf.locale;
      var colType = "".concat(_const__WEBPACK_IMPORTED_MODULE_5__["DATE"], "-").concat(locale);
      this.addSortType(colType, function (value) {
        var parsedDate = dateType.parse(value, locale); // Invalid date defaults to Wed Feb 04 -768 11:00:00

        return isNaN(+parsedDate) ? new Date(-86400000000000) : parsedDate;
      });
      return colType;
    }
  }, {
    key: "_addNumberType",
    value: function _addNumberType(colIndex, decimal) {
      var colType = "".concat(_const__WEBPACK_IMPORTED_MODULE_5__["FORMATTED_NUMBER"]).concat(decimal === '.' ? '' : '-custom');
      this.addSortType(colType, function (value) {
        return Object(_number__WEBPACK_IMPORTED_MODULE_4__["parse"])(value, decimal);
      });
      return colType;
    }
    /**
     * Remove extension
     */

  }, {
    key: "destroy",
    value: function destroy() {
      if (!this.initialized) {
        return;
      }

      var tf = this.tf;
      this.emitter.off(['sort'], Object(_event__WEBPACK_IMPORTED_MODULE_3__["bound"])(this.sortByColumnIndexHandler, this));
      this.sorted = false;
      this.stt.destroy();
      var ids = tf.getFiltersId();

      for (var idx = 0; idx < ids.length; idx++) {
        var header = tf.getHeaderElement(idx);
        var img = Object(_dom__WEBPACK_IMPORTED_MODULE_2__["tag"])(header, 'img');

        if (img.length === 1) {
          header.removeChild(img[0]);
        }
      }

      this.initialized = false;
    }
  }]);

  return AdapterSortableTable;
}(_feature__WEBPACK_IMPORTED_MODULE_0__["Feature"]); //Converters




function ipAddress(value) {
  var vals = value.split('.');

  for (var x in vals) {
    var val = vals[x];

    while (3 > val.length) {
      val = '0' + val;
    }

    vals[x] = val;
  }

  return vals.join('.');
}

function sortIP(a, b) {
  var aa = ipAddress(a.value.toLowerCase());
  var bb = ipAddress(b.value.toLowerCase());

  if (aa === bb) {
    return 0;
  } else if (aa < bb) {
    return -1;
  } else {
    return 1;
  }
}

/***/ }),

/***/ "./src/extensions/sort/sort.js":
/*!*************************************!*\
  !*** ./src/extensions/sort/sort.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adapterSortabletable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adapterSortabletable */ "./src/extensions/sort/adapterSortabletable.js");
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../root */ "./src/root.js");



if (!_root__WEBPACK_IMPORTED_MODULE_1__["root"].SortableTable) {
  __webpack_require__(/*! script-loader!sortabletable */ "./node_modules/script-loader/index.js!./libs/sortabletable.js");
}

/* harmony default export */ __webpack_exports__["default"] = (_adapterSortabletable__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/register.js":
/*!*************************!*\
  !*** ./src/register.js ***!
  \*************************/
/*! exports provided: Register */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Register", function() { return Register; });
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ "./src/settings.js");
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./string */ "./src/string.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Register = function Register(tf) {
  var cls = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  _classCallCheck(this, Register);

  console.log(tf, cls);
  /**
   * TableFilter instance
   * @type {TableFilter}
   */

  this.tf = tf;
  /**
   * Feature name, retrieved from alternate class name if found or from
   * camelised class name
   * @type {String}
   */

  this.feature = Object(_settings__WEBPACK_IMPORTED_MODULE_0__["defaultsStr"])(cls.altName, Object(_string__WEBPACK_IMPORTED_MODULE_1__["toCamelCase"])(cls.name));
  this.tf._mod_[this.feature] = cls; // this.instantiate(cls, this.feature);
} // instantiate(cls, name) {
//     let Cls = cls;
//     console.log(Boolean(this.tf[name]),
//         Boolean(Cls.alwaysInstantiate));
//     if (!this.tf.hasConfig || Boolean(this.tf[name])
//         || Boolean(cls.alwaysInstantiate)) {
//         this.tf.Mod[name] = this.tf.Mod[name] || new Cls(tf);
//     }
// }
;

/***/ })

}]);
//# sourceMappingURL=tf-0-ff3c2103b4f98d8cf876.js.map