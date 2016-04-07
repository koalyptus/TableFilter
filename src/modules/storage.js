
const global = window;
// const JSON = global.JSON;

export const hasStorage = () => {
    return 'Storage' in global;
};

export class Storage {

    constructor(state){
        this.state = state;
        this.enableLocalStorage = state.enableLocalStorage && hasStorage();
        this.enableCookie = state.enableCookie;
        this.emitter = state.emitter;
    }


    init(){
        this.emitter.on(['state-changed'], (tf, state) => this.update(state));
        // this.emitter.on(['initialized'], () => this.sync());
    }

    update(state){
        console.log(this.enableLocalStorage, this.enableCookie, state);
    }

    // save(state){

    // }
}
