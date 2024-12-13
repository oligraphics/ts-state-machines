"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeoutBehaviour = void 0;
const fixed_duration_behaviour_1 = require("./fixed-duration.behaviour");
/**
 * Waits for a fixed amount of time and then completes without doing anything
 * else
 */
class TimeoutBehaviour extends fixed_duration_behaviour_1.FixedDurationBehaviour {
    constructor(timeoutMs) {
        super(timeoutMs);
    }
}
exports.TimeoutBehaviour = TimeoutBehaviour;
//# sourceMappingURL=timeout.behaviour.js.map