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

        //cookie storing filter values
        this.fltsValuesCookie = tf.prfxCookieFltsValues + tf.id;
        //cookie storing page nb
        this.pgNbCookie = tf.prfxCookiePageNb + tf.id;
        //cookie storing page length
        this.pgLenCookie = tf.prfxCookiePageLen + tf.id;

        this.duration = !isNaN(f.set_cookie_duration) ?
            parseInt(f.set_cookie_duration, 10) : 100000;

        this.tf = tf;
        this.emitter = tf.emitter;
    }

    init(){
        this.emitter.on(['after-filtering'], ()=> this.saveFilterValues());
        this.emitter.on(['after-clearing-filters'], ()=> this.clearCookies());
        this.emitter.on(['after-changing-page'],
            (tf, index)=> this.savePageNb(index));
        this.emitter.on(['after-changing-results-per-page'],
            (tf, index)=> this.savePageLength(index));
    }

    /**
     * Store filters' values in cookie
     */
    saveFilterValues(){
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
            this.fltsValuesCookie,
            fltValues.join(tf.separator),
            this.duration
        );
    }

    /**
     * Retrieve filters' values from cookie
     * @return {Array}
     */
    getFilterValues(){
        let flts = Cookie.read(this.fltsValuesCookie);
        let rgx = new RegExp(this.tf.separator, 'g');
        // filters' values array
        return flts.split(rgx);
    }

    /**
     * Store page number in cookie
     * @param {Number} index page index to persist
     */
    savePageNb(index){
        if(!this.tf.rememberPageNb){
            return;
        }
        Cookie.write(
            this.pgNbCookie,
            (index+1),
            this.duration
        );
    }

    /**
     * Retrieve page number from cookie
     * @return {String}
     */
    getPageNb(){
        return Cookie.read(this.pgNbCookie);
    }

    /**
     * Store page length in cookie
     * @param {Number} index page length index to persist
     */
    savePageLength(index){
        if(!this.tf.rememberPageLen){
            return;
        }
        Cookie.write(
            this.pgLenCookie,
            index,
            this.duration
        );
    }

    /**
     * Retrieve page length from cookie
     * @return {String}
     */
    getPageLength(){
        return Cookie.read(this.pgLenCookie);
    }

    /**
     * Remove all cookies
     */
    clearCookies(){
        Cookie.remove(this.fltsValuesCookie);
        Cookie.remove(this.pgLenCookie);
        Cookie.remove(this.pgNbCookie);
    }

    destroy(){
        this.emitter.off(['after-filtering'], ()=> this.saveFilterValues());
        this.emitter.off(['after-clearing-filters'], ()=> this.clearCookies());
        this.emitter.off(['after-changing-page'],
            (tf, index)=> this.savePageNb(index));
        this.emitter.off(['after-changing-results-per-page'],
            (tf, index)=> this.savePageLength(index));
    }
}
