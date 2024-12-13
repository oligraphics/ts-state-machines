"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallbackBehaviour = void 0;
const behaviour_1 = require("./behaviour");
/**
 * Behaviour that calls a callback and then immediately completes
 */
class CallbackBehaviour extends behaviour_1.Behaviour {
    callback;
    constructor(callback) {
        super();
        this.callback = callback;
    }
    onInitialize() {
        this.callback();
        this.complete();
    }
}
exports.CallbackBehaviour = CallbackBehaviour;
//# sourceMappingURL=callback.behaviour.js.map