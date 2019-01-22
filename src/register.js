import {defaultsStr} from './settings';
import {toCamelCase} from './string';

export class Register {
    constructor(tf, cls = {}) {
        console.log(tf, cls);
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

        this.tf._mod_[this.feature] = cls;

        // this.instantiate(cls, this.feature);
    }

    // instantiate(cls, name) {
    //     let Cls = cls;
    //     console.log(Boolean(this.tf[name]),
    //         Boolean(Cls.alwaysInstantiate));
    //     if (!this.tf.hasConfig || Boolean(this.tf[name])
    //         || Boolean(cls.alwaysInstantiate)) {
    //         this.tf.Mod[name] = this.tf.Mod[name] || new Cls(tf);
    //     }
    // }
}