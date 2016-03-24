import Event from '../event';

const global = window;
const JSON = global.JSON;
const location = global.location;
const decodeURIComponent = global.decodeURIComponent;

export const hasHashChange = () => {
    var docMode = global.documentMode;
    return ('onhashchange' in global) && (docMode === undefined || docMode > 7);
};

/**
 * Manages the URL hash reflecting the features state to be persisted
 *
 * @export
 * @class Hash
 */
export class Hash {

    /**
     * Creates an instance of Hash
     *
     * @param {State} state Instance of State
     */
    constructor(state) {
        this.state = state;
        this.lastHash = null;
        this.emitter = state.emitter;
    }

    /**
     * Initializes the Hash object
     */
    init() {
        if (!hasHashChange()) {
            return;
        }

        this.lastHash = location.hash;

        this.emitter.on(['state-changed'], (tf, state) => this.update(state));
        this.emitter.on(['initialized'], () => this.sync());
        Event.add(global, 'hashchange', () => this.sync());
    }

    /**
     * Updates the URL hash based on a state change
     *
     * @param {State} state Instance of State
     */
    update(state) {
        let hash = `#${JSON.stringify(state)}`;
        if (this.lastHash === hash) {
            return;
        }

        location.hash = hash;
        this.lastHash = hash;
    }

    /**
     * Converts a URL hash into a state JSON object
     *
     * @param {String} hash URL hash fragment
     * @returns {Object} JSON object
     */
    parse(hash) {
        if (hash.indexOf('#') === -1) {
            return null;
        }
        hash = hash.substr(1);
        return JSON.parse(decodeURIComponent(hash));
    }

    /**
     * Applies current hash state to features
     */
    sync() {
        let state = this.parse(location.hash);
        if (!state) {
            return;
        }

        // To prevent state to react to features changes, state is temporarily
        // disabled
        this.state.disable();
        // State is overriden with hash state object
        this.state.override(state);
        // New hash state is applied to features
        this.state.sync();
        // State is re-enabled
        this.state.enable();
    }

    /**
     * Destroy Hash instance
     */
    destroy() {
        this.emitter.off(['state-changed'], (tf, state) => this.update(state));
        this.emitter.off(['initialized'], () => this.sync());
        Event.remove(global, 'hashchange', () => this.sync());

        this.state = null;
        this.lastHash = null;
        this.emitter = null;
    }
}
