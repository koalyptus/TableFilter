
const NOTIMPLEMENTED = 'Not implemented.';

export class Feature {
    constructor(tf, feature) {
        this.tf = tf;
        this.feature = feature;
        this.enabled = tf[feature];
        this.config = tf.config();
        this.initialized = false;
    }

    init() {
        throw new Error(NOTIMPLEMENTED);
    }

    reset() {
        if(!this.tf.hasGrid()){
            return;
        }
        this.enable();
        this.init();
    }

    destroy() {
        throw new Error(NOTIMPLEMENTED);
    }

    enable() {
        this.enabled = true;
        this.tf[this.feature] = this.enabled;
    }

    disable() {
        this.enabled = false;
        this.tf[this.feature] = this.enabled;
    }

    isEnabled() {
        return this.enabled;
    }
}
