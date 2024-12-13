import { Behaviour } from './behaviours/behaviour';

export class StateMachine {
  private _state: Behaviour | undefined = undefined;

  get state(): Behaviour | undefined {
    return this._state;
  }

  set state(state: Behaviour | undefined) {
    if (state) {
      this.setState(state);
    } else if (this._state && !this._state.finished) {
      const state = this._state;
      this._state = undefined;
      state.cancel();
    }
  }

  setState(state: Behaviour) {
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

  update(deltaTime: number) {
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
