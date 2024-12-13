"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrapperBehaviour = void 0;
const behaviour_1 = require("./behaviour");
/**
 * Wrapper behaviour to create shorthands for the construction of other
 * behaviours with preset parameters
 */
class WrapperBehaviour extends behaviour_1.Behaviour {
    behaviour;
    constructor(behaviour) {
        super();
        this.behaviour = behaviour;
    }
    initialize() {
        this.behaviour.bus.on('complete', () => this.complete());
        this.behaviour.bus.on('cancel', () => {
            if (!this.cancelled) {
                this.cancel();
            }
        });
        this.behaviour.initialize();
    }
    update(deltaTime) {
        this.behaviour.update(deltaTime);
    }
    cancel() {
        if (!this.behaviour.cancelled) {
            this.behaviour.cancel();
        }
    }
}
exports.WrapperBehaviour = WrapperBehaviour;
//# sourceMappingURL=wrapper.behaviour.js.map