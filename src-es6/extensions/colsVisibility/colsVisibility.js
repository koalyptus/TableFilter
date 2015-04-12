
export class ColsVisibility{

    /**
     * SortableTable Adapter module
     * @param {Object} tf TableFilter instance
     */
    constructor(tf, ext){
        // Configuration object
        var f = tf.config();

        this.colsVisibility = f.cols_visibility;

        this.showHideColsExtLoaded = false;
        this.showHideColsExtName = ext.name;
        this.showHideColsExtDesc = ext.description;

        //show/hide cols span element
        this.showHideColsSpanEl = null;
        //show/hide cols button element
        this.btnShowHideColsEl = null;
        //show/hide cols container div element
        this.showHideColsContEl = null;
    }
}
