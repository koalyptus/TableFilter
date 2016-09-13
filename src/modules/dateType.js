import {Date as SuDate} from 'sugar-date';
import 'sugar-date/locales';
import {isObj} from '../types';

export class DateType {

    constructor(tf) {
        this.tf = tf;
        this.locale = tf.locale;
        this.suDate = SuDate;
        this.emitter = tf.emitter;

        // Global locale
        this.suDate.setLocale(this.locale);
    }

    init() {
        // let locale = this.suDate.getLocale(this.locale);

        // Add formats from column types configuration
        this._addConfigFormats();
        // locale.addFormat('{dd}/{MM}/{yyyy}');
        // locale.addFormat('{MM}/{dd}/{yyyy}');
        // locale.addFormat('{dd}-{months}-{yyyy|yy}');
        // locale.addFormat('{dd}-{MM}-{yyyy|yy}');
    }

    parse(dateStr, localeCode) {console.log('parse', localeCode);
        return this.suDate.create(dateStr, localeCode);
    }

    isValid(dateStr, localeCode) {
        console.log(dateStr, localeCode, this.parse(dateStr, localeCode),
            this.suDate.isValid(this.parse(dateStr, localeCode)));
        return this.suDate.isValid(this.parse(dateStr, localeCode));
    }

    getOptions(colIndex) {
        let colType = this.tf.colTypes[colIndex];
        return isObj(colType) ? colType : {};
    }

    _addConfigFormats() {
        this.tf.colTypes.forEach((type, idx) => {
            let options = this.getOptions(idx);
            if (options.hasOwnProperty('format')) {
                let locale = this.suDate.getLocale(
                    options.locale || this.locale
                );
                console.log(options.format);
                locale.addFormat(options.format);
            }
        });
    }
}
