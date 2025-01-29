"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceBehaviour = void 0;
const behaviour_1 = require("./behaviour");
const state_machine_1 = require("../state-machine");
/**
 * Run a sequence of behaviours in order. Aborts if any of the behaviours abort.
 */
class SequenceBehaviour extends behaviour_1.Behaviour {
    stateMachine;
    behaviours;
    constructor(...behaviours) {
        super();
        this.stateMachine = new state_machine_1.StateMachine();
        this.behaviours = behaviours;
    }
    onInitialize() {
        if (this.behaviours.length === 0) {
            this.complete();
            return;
        }
        const cancelHandler = () => {
            if (this.cancelled) {
                return;
            }
            this.cancel();
        };
        for (let i = 0; i < this.behaviours.length - 1; i += 1) {
            const nextIndex = i + 1;
            this.behaviours[i].bus.on('complete', () => this.stateMachine.setState(this.behaviours[nextIndex]));
            this.behaviours[i].bus.on('cancel', cancelHandler);
        }
        this.behaviours[this.behaviours.length - 1].bus.on('complete', () => this.complete());
        this.stateMachine.setState(this.behaviours[0]);
    }
    update(deltaTime) {
        this.stateMachine.update(deltaTime);
    }
    onCancelled() {
        this.stateMachine.cancel();
    }
}
exports.SequenceBehaviour = SequenceBehaviour;
//# sourceMappingURL=sequence.behaviour.js.map