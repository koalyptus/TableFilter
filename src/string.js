/**
 * String utilities
 */

export default {

    lower(text){
        return text.toLowerCase();
    },

    upper(text){
        return text.toUpperCase();
    },

    trim(text){
        if (text.trim){
            return text.trim();
        }
        return text.replace(/^\s*|\s*$/g, '');
    },

    isEmpty(text){
        return this.trim(text) === '';
    },

    rgxEsc(text){
        let chars = /[-\/\\^$*+?.()|[\]{}]/g;
        let escMatch = '\\$&';
        return String(text).replace(chars, escMatch);
    },

    matchCase(text, caseSensitive){
        if(!caseSensitive){
            return this.lower(text);
        }
        return text;
    },

    /**
     * Checks if passed data contains the searched term
     * @param  {String} term           Searched term
     * @param  {String} data           Data string
     * @param  {Boolean} exactMatch    Exact match
     * @param  {Boolean} caseSensitive Case sensitive
     * @return {Boolean}
     */
    contains(term, data, exactMatch=false, caseSensitive=false){
        // Improved by Cedric Wartel (cwl) automatic exact match for selects and
        // special characters are now filtered
        let regexp,
            modifier = caseSensitive ? 'g' : 'gi';
        if(exactMatch){
            regexp = new RegExp(
                '(^\\s*)'+ this.rgxEsc(term) +'(\\s*$)', modifier);
        } else {
            regexp = new RegExp(this.rgxEsc(term), modifier);
        }
        return regexp.test(data);
    }

};
