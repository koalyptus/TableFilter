// import Str from '../string';
import Event from '../event';
// import Types from '../types';

const global = window;
const JSON = global.JSON;
const location = global.location;
const hasHashChange = () => {
    var docMode = global.documentMode;
    return ('onhashchange' in global) && (docMode === undefined || docMode > 7);
};

export class Hash {

    constructor(state){
        this.state = state;
        this.lastHash = location.hash;
        this.emitter = state.emitter;
    }

    init() {
        if(!hasHashChange()){
            return;
        }
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
        let hash = this.parse(location.hash);
        if(!hash){
            return;
        }
        this.state.state = hash;
        this.state.sync();
    }

    destroy() {
        this.emitter.off(['state-changed'], (tf, state) => this.update(state));
        this.emitter.off(['initialized'], () => this.sync());
        Event.aremove(global, 'hashchange', () => this.sync());
    }
}
