import {defaultsStr} from './settings';
import {toCamelCase} from './string';
import {FEATURES} from './const';

export class Register {
    constructor(tf, cls = {}) {
        cls.meta = cls.meta || {};

        /**
         * TableFilter instance
         * @type {TableFilter}
         */
        this.tf = tf;

        /**
         * Feature name, retrieved from alternate class name if found or from
         * camelised class name as per TableFilter convention
         * @type {String}
         */
        this.feature = defaultsStr(cls.meta.altName, toCamelCase(cls.name));

        cls.meta.name = this.feature;

        FEATURES[this.feature] = cls;

    }
}