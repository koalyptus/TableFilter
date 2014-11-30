import {Cookie} from '../cookie';

export class Store{

    constructor(tf) {
        var f = tf.fObj;

        this.duration = !isNaN(f.set_cookie_duration) ?
            parseInt(f.set_cookie_duration, 10) : 100000;

        this.tf = tf;
    }

    saveFilterValues(name){
        var tf = this.tf;
        var flt_values = [];
        //store filters' values
        for(var i=0; i<tf.fltIds.length; i++){
            var value = tf.GetFilterValue(i);
            if (value === ''){
                value = ' ';
            }
            flt_values.push(value);
        }
        //adds array size
        flt_values.push(tf.fltIds.length);
        //writes cookie
        Cookie.write(
            name,
            flt_values.join(tf.separator),
            this.duration
        );
    }

}