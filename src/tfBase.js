import {defaultsStr} from './settings';
import {toCamelCase} from './string';

export class TfBase {
    constructor(tf, cls = {}) {
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
        this.feature = defaultsStr(cls.altName, toCamelCase(cls.name));

        this.tf._mod_.push(this.feature);
    }
}