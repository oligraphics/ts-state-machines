"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMachine = void 0;
class StateMachine {
    _state = undefined;
    get state() {
        return this._state;
    }
    set state(state) {
        if (state) {
            this.setState(state);
        }
        else if (this._state && !this._state.finished) {
            const state = this._state;
            this._state = undefined;
            state.cancel();
        }
    }
    setState(state) {
        const previous = this._state;
        if (previous && !previous.finished) {
            previous.cancel();
        }
        state.bus.on('finish', () => {
            if (this._state === state) {
                this._state = undefined;
            }
        });
        this._state = state;
        state.initialize();
    }
    update(deltaTime) {
        this._state?.update(deltaTime);
        if (this._state?.finished) {
            this._state = undefined;
        }
    }
    cancel() {
        this._state?.cancel();
        this._state = undefined;
    }
}
exports.StateMachine = StateMachine;
//# sourceMappingURL=state-machine.js.map