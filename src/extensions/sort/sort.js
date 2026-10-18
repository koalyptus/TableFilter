import AdapterSortableTable from './adapterSortabletable';
import {root} from '../../root';

if (!root.SortableTable) {
    if (typeof require !== 'undefined') {
        eval("require('script-loader!sortabletable')");
    }
}

export default AdapterSortableTable;
