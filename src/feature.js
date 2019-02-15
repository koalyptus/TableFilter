import {toCamelCase} from './string';

const NOT_IMPLEMENTED = 'Not implemented.';

/**
 * Base class defining the interface of a TableFilter feature
 */
export class Feature {
    /**
     * Creates an instance of Feature
     * @param {Object} tf TableFilter instance
     * @param {Class} feature Feature class for TableFilter registration
     */
    constructor(tf, cls) {
        cls.meta = cls.meta || {};

        /**
         * TableFilter instance
         * @type {TableFilter}
         */
        this.tf = tf;

        /**
         * Feature name is the camelised class name as per TableFilter's
         * convention
         * @type {String}
         */
        this.feature = cls.meta.altName || cls.meta.name
            || toCamelCase(cls.name);

        /**
         * TableFilter feature setting
         * @type {Boolean}
         */
        this.enabled = tf[this.feature];

        /**
         * TableFilter configuration
         * @type {Object}
         */
        this.config = tf.config();

        /**
         * TableFilter emitter instance
         * @type {Emitter}
         */
        this.emitter = tf.emitter;

        /**
         * Field indicating whether Feature is initialized
         * @type {Boolean}
         */
        this.initialized = false;

        /** Subscribe to destroy event */
        this.emitter.on(['destroy'], () => this.destroy());
    }

    /**
     * Initialize the feature
     */
    init() {
        throw new Error(NOT_IMPLEMENTED);
    }

    /**
     * Reset the feature after being disabled
     */
    reset() {
        this.enable();
        this.init();
    }

    /**
     * Destroy the feature
     */
    destroy() {
        throw new Error(NOT_IMPLEMENTED);
    }

    /**
     * Enable the feature
     */
    enable() {
        this.enabled = true;
    }

    /**
     * Disable the feature
     */
    disable() {
        this.enabled = false;
    }

    /**
     * Indicate whether the feature is enabled or not
     * @returns {Boolean}
     */
    isEnabled() {
        return this.enabled === true;
    }
}
