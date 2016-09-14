import {Date as SugarDate} from 'sugar-date';
import 'sugar-date/locales';
import {isObj, isArray} from '../types';

export class DateType {

    constructor(tf) {
        this.tf = tf;
        this.locale = tf.locale;
        this.datetime = SugarDate;
        this.emitter = tf.emitter;
    }

    init() {
        if (this.initialized) {
            return;
        }

        // Global locale
        this.datetime.setLocale(this.locale);

        // let locale = this.datetime.getLocale(this.locale);

        // Add formats from column types configuration if any
        this._addConfigFormats();
        // locale.addFormat('{dd}/{MM}/{yyyy}');
        // locale.addFormat('{MM}/{dd}/{yyyy}');
        // locale.addFormat('{dd}-{months}-{yyyy|yy}');
        // locale.addFormat('{dd}-{MM}-{yyyy|yy}');

        this.initialized = true;

        this.emitter.emit('date-type-initialized', this.tf, this);
    }

    parse(dateStr, localeCode) {
        // console.log('parse', dateStr, localeCode,
        //     this.datetime.create(dateStr, localeCode));
        return this.datetime.create(dateStr, localeCode);
    }

    isValid(dateStr, localeCode) {
        // console.log(dateStr, localeCode, this.parse(dateStr, localeCode),
        //     this.datetime.isValid(this.parse(dateStr, localeCode)));
        return this.datetime.isValid(this.parse(dateStr, localeCode));
    }

    getOptions(colIndex) {
        let colType = this.tf.colTypes[colIndex];
        return isObj(colType) ? colType : {};
    }

    _addConfigFormats() {
        this.tf.colTypes.forEach((type, idx) => {
            let options = this.getOptions(idx);
            if (options.hasOwnProperty('format')) {
                let locale = this.datetime.getLocale(
                    options.locale || this.locale
                );
                if (isArray(options.format)) {
                    options.format.forEach((format) => {
                        locale.addFormat(format);
                    });
                } else {
                    locale.addFormat(options.format);
                }
            }
        });
    }

    destroy() {
        this.initialized = false;
    }
}
