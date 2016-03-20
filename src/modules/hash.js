import Event from '../event';

const global = window;
const JSON = global.JSON;
const location = global.location;

export const hasHashChange = () => {
    var docMode = global.documentMode;
    return ('onhashchange' in global) && (docMode === undefined || docMode > 7);
};

export class Hash {

    constructor(state){
        this.state = state;
        this.lastHash = null;
        this.emitter = state.emitter;
    }

    init() {
        if(!hasHashChange()){
            return;
        }

        this.lastHash = location.hash;

        this.emitter.on(['state-changed'], (tf, state) => this.update(state));
        this.emitter.on(['initialized'], () => this.sync());
        Event.add(global, 'hashchange', () => this.sync());
    }

    update(state) {
        let hash = `#${JSON.stringify(state)}`;
        console.log(hash, this.lastHash, this.lastHash === hash);
        if (this.lastHash === hash) {
            return;
        }

        location.hash = hash;
        this.lastHash = hash;
    }

    parse(hash) {
        if (hash.indexOf('#') === -1) {
            return null;
        }
        hash = hash.substr(1);
        return JSON.parse(hash);
    }

    sync(){
        let state = this.parse(location.hash);
        if(!state){
            return;
        }

        this.state.disable();
        this.state.override(state);
        this.state.sync();
        this.state.enable();
    }

    destroy() {
        this.state = null;
        this.lastHash = null;
        this.emitter = null;

        this.emitter.off(['state-changed'], (tf, state) => this.update(state));
        this.emitter.off(['initialized'], () => this.sync());
        Event.remove(global, 'hashchange', () => this.sync());
    }
}
