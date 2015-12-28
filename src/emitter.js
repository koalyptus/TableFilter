export class Emitter {
    constructor() {
        this.events = {};
    }

    on(evt, fn) {
        this.events[evt] = this.events[evt] || [];
        this.events[evt].push(fn);
    }

    off(evt, fn) {
        if(evt in this.events) {
            this.events[evt].splice(this.events[evt].indexOf(fn), 1);
        }
    }

    emit(evt /*, args...*/) {
        if(evt in this.events === false) {
            return;
        }
        for(var i = 0; i < this.events[evt].length; i++) {
            this.events[evt][i].apply(this, [].slice.call(arguments, 1));
        }
    }
}
