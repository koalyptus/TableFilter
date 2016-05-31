import AdapterSortableTable from './adapterSortabletable';
import {root} from '../../root';

if (!root.SortableTable) {
    require('script!sortabletable');
}

export default AdapterSortableTable;
