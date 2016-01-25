import Cookie from '../cookie';
import Types from '../types';

export class Store{

    /**
     * Store, persistence manager
     * @param {Object} tf TableFilter instance
     *
     * TODO: use localStorage and fallback to cookie persistence
     */
    constructor(tf){
        let f = tf.config();

        this.duration = !isNaN(f.set_cookie_duration) ?
            parseInt(f.set_cookie_duration, 10) : 100000;

        this.tf = tf;
        this.emitter = tf.emitter;
    }

    init(){
        this.emitter.on(['after-filtering'],
            ()=> this.saveFilterValues(this.tf.fltsValuesCookie));
        this.emitter.on(['after-clearing-filters'], ()=> this.clearCookies());
    }

    /**
     * Store filters' values in cookie
     * @param {String} cookie name
     */
    saveFilterValues(name){
        let tf = this.tf;
        let fltValues = [];

        if(!tf.rememberGridValues){
            return;
        }

        //store filters' values
        for(let i=0; i<tf.fltIds.length; i++){
            let value = tf.getFilterValue(i);
            //convert array to a || separated values
            if(Types.isArray(value)){
                let rgx = new RegExp(tf.separator, 'g');
                value = value.toString()
                    .replace(rgx, ' ' + tf.orOperator + ' ');
            }
            if (value === ''){
                value = ' ';
            }
            fltValues.push(value);
        }

        //write cookie
        Cookie.write(
            name,
            fltValues.join(tf.separator),
            this.duration
        );
    }

    /**
     * Retrieve filters' values from cookie
     * @param {String} cookie name
     * @return {Array}
     */
    getFilterValues(name){
        let flts = Cookie.read(name);
        let rgx = new RegExp(this.tf.separator, 'g');
        // filters' values array
        return flts.split(rgx);
    }

    /**
     * Store page number in cookie
     * @param {String} cookie name
     */
    savePageNb(name){
        if(!this.tf.rememberPageNb){
            return;
        }
        Cookie.write(
            name,
            this.tf.feature('paging').currentPageNb,
            this.duration
        );
    }

    /**
     * Retrieve page number from cookie
     * @param {String} cookie name
     * @return {String}
     */
    getPageNb(name){
        return Cookie.read(name);
    }

    /**
     * Store page length in cookie
     * @param {String} cookie name
     */
    savePageLength(name){
        if(!this.tf.rememberPageLen){
            return;
        }
        Cookie.write(
            name,
            this.tf.feature('paging').resultsPerPageSlc.selectedIndex,
            this.duration
        );
    }

    /**
     * Retrieve page length from cookie
     * @param {String} cookie name
     * @return {String}
     */
    getPageLength(name){
        return Cookie.read(name);
    }

    /**
     * Remove all cookies
     */
    clearCookies(){
        Cookie.remove(this.tf.fltsValuesCookie);
        Cookie.remove(this.tf.pgLenCookie);
        Cookie.remove(this.tf.pgNbCookie);
    }

    destroy(){
        this.emitter.off(['after-filtering'],
            ()=> this.saveFilterValues(this.tf.fltsValuesCookie));
        this.emitter.off(['after-clearing-filters'], ()=> this.clearCookies());
    }
}
