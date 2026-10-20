import AdapterSortableTable from './adapterSortabletable';
import {root} from '../../root';

if (!root.SortableTable) {
    // The vendored SortableTable script is loaded through webpack's
    // `script-loader!` syntax. The call is left unguarded by eval() so
    // webpack can resolve it statically and inline the script in the
    // bundle; the Vite build strips it and loads the script itself
    // (see injectSortableTable in vite.config.js).
    if (typeof require !== 'undefined') {
        require('script-loader!sortabletable');
    }
}

export default AdapterSortableTable;
