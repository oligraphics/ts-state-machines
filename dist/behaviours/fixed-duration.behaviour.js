"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixedDurationBehaviour = void 0;
const behaviour_1 = require("./behaviour");
/**
 * Template class to create a behaviour with a fixed duration
 */
class FixedDurationBehaviour extends behaviour_1.Behaviour {
    _durationMs;
    t = 0;
    constructor(durationMs) {
        super();
        this._durationMs = durationMs;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.t += deltaTime;
        if (this.t >= this._durationMs) {
            this.complete();
        }
    }
}
exports.FixedDurationBehaviour = FixedDurationBehaviour;
//# sourceMappingURL=fixed-duration.behaviour.js.map