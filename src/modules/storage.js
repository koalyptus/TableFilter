
const global = window;
const JSON = global.JSON;
const localStorage = global.localStorage;

export const hasStorage = () => {
    return 'Storage' in global;
};

export class Storage {

    constructor(state){
        this.state = state;
        this.tf = state.tf;
        this.enableLocalStorage = state.enableLocalStorage && hasStorage();
        this.enableCookie = state.enableCookie;
        this.emitter = state.emitter;

        this.prxStorage = 'store';
    }


    init(){
        this.emitter.on(['state-changed'], (tf, state) => this.save(state));
        this.emitter.on(['initialized'], () => this.sync());
    }

    // update(state){
    //     console.log(this.enableLocalStorage, this.enableCookie, state);
    // }

    save(state){
        if(this.enableLocalStorage) {
            localStorage[this.getKey()] = JSON.stringify(state);
        }
    }

    delete(){
        if(this.enableLocalStorage) {
            localStorage.removeItem(this.getKey());
        }
    }

    sync() {
        let state = JSON.parse(localStorage[this.getKey()]);
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

    getKey(){
        return `${this.tf.prfxTf}_${this.tf.id}`;
    }

    destroy(){
        this.emitter.off(['state-changed'], (tf, state) => this.save(state));
        this.emitter.off(['initialized'], () => this.sync());

        this.delete();

        this.state = null;
        this.emitter = null;
    }
}
