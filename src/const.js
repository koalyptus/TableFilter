import {DateType} from './modules/dateType';
import {Help} from './modules/help';
import {State} from './modules/state';
import {GridLayout} from './modules/gridLayout';
import {Loader} from './modules/loader';
import {HighlightKeyword} from './modules/highlightKeywords';
import {PopupFilter} from './modules/popupFilter';
import {MarkActiveColumns} from './modules/markActiveColumns';
import {RowsCounter} from './modules/rowsCounter';
import {StatusBar} from './modules/statusBar';
import {ClearButton} from './modules/clearButton';
import {AlternateRows} from './modules/alternateRows';
import {NoResults} from './modules/noResults';
import {Paging} from './modules/paging';
import {Toolbar} from './modules/toolbar';

/**
 * Filter types
 */

/**
 * Input filter type
 * @type {String}
 */
export const INPUT = 'input';
/**
 * Select filter type
 * @type {String}
 */
export const SELECT = 'select';
/**
 * Multiple select filter type
 * @type {String}
 */
export const MULTIPLE = 'multiple';
/**
 * Checklist filter type
 * @type {String}
 */
export const CHECKLIST = 'checklist';
/**
 * None filter type
 * @type {String}
 */
export const NONE = 'none';

/**
 * Key codes
 */

/**
 * Enter key code
 * @type {Number}
 */
export const ENTER_KEY = 13;
/**
 * Tab key code
 * @type {Number}
 */
export const TAB_KEY = 9;
/**
 * Escape key code
 * @type {Number}
 */
export const ESC_KEY = 27;
/**
 * Up arrow key code
 * @type {Number}
 */
export const UP_ARROW_KEY = 38;
/**
 * Down arrow key code
 * @type {Number}
 */
export const DOWN_ARROW_KEY = 40;

/**
 * HTML tags
 */

/**
 * Header cell tag
 * @type {String}
 */
export const HEADER_TAG = 'TH';
/**
 * Cell tag
 * @type {String}
 */
export const CELL_TAG = 'TD';

/**
 * Data types
 */

/**
 * String
 * @type {String}
 */
export const STRING = 'string';

/**
 * Number
 * @type {String}
 */
export const NUMBER = 'number';

/**
 * Formatted number
 * @type {String}
 */
export const FORMATTED_NUMBER = 'formatted-number';

/**
 * Date
 * @type {String}
 */
export const DATE = 'date';

/**
 * IP address
 * @type {String}
 */
export const IP_ADDRESS = 'ipaddress';

/**
 * Default values
 */

/**
 * Auto filter delay in milliseconds
 * @type {Number}
 */
export const AUTO_FILTER_DELAY = 750;

/**
 * TableFilter features definitions
 * @type {Object}
 */
export const FEATURES = {
    dateType: {
        class: DateType,
        name: 'dateType'
    },
    help: {
        class: Help,
        name: 'help',
        enforce: true
    },
    state: {
        class: State,
        name: 'state'
    },
    markActiveColumns: {
        class: MarkActiveColumns,
        name: 'markActiveColumns'
    },
    gridLayout: {
        class: GridLayout,
        name: 'gridLayout'
    },
    loader: {
        class: Loader,
        name: 'loader'
    },
    highlightKeyword: {
        class: HighlightKeyword,
        name: 'highlightKeyword',
        property: 'highlightKeywords'
    },
    popupFilter: {
        class: PopupFilter,
        name: 'popupFilter',
        property: 'popupFilters'
    },
    rowsCounter: {
        class: RowsCounter,
        name: 'rowsCounter'
    },
    statusBar: {
        class: StatusBar,
        name: 'statusBar'
    },
    clearButton: {
        class: ClearButton,
        name: 'clearButton',
        property: 'btnReset'
    },
    alternateRows: {
        class: AlternateRows,
        name: 'alternateRows'
    },
    noResults: {
        class: NoResults,
        name: 'noResults'
    },
    paging: {
        class: Paging,
        name: 'paging'
    },
    toolbar: {
        class: Toolbar,
        name: 'toolbar',
        enforce: true
    }
};
