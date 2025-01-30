import { Behaviour } from './behaviours/behaviour';

export class StateMachine {
  private _state: Behaviour | undefined = undefined;
  private _paused: Behaviour[] = [];

  get state(): Behaviour | undefined {
    return this._state;
  }

  /**
   * Assign a state and clear the entire paused stack
   */
  set state(state: Behaviour | undefined) {
    if (state) {
      this.setState(state);
    } else if (this._state && !this._state.finished) {
      const state = this._state;
      this._state = undefined;
      state.cancel();
    }
  }

  get pausedStates(): Behaviour[] {
    return [...this._paused];
  }

  /**
   * Assign a state and clear the entire paused stack
   */
  setState(state: Behaviour) {
    const previous = this._state;
    if (previous && !previous.finished) {
      previous.cancel();
    }
    for (const state of this._paused) {
      state.cancel();
    }
    this._paused.splice(0);

    state.bus.on('finish', () => {
      if (this._state === state) {
        this._state = undefined;
      }
    });
    this._state = state;
    state.initialize();
    if (!state.initialized) {
      throw new Error(
        `Avoid overriding initialize() on ${state.constructor.name} and hook into onInitialize() or onInitialized() instead.`,
      );
    }
  }

  /**
   * Replace the current state with the provided state, putting the current
   * state in a paused state. It resumes after the provided state finishes,
   * unless the entire stack is cancelled by another direct assignment with
   * <code>setState()</code>
   */
  insertState(state: Behaviour) {
    const pausedState = this._state;
    if (pausedState) {
      this._paused.push(pausedState);
      pausedState.pause();
    }
    state.bus.on('complete', () => {
      if (this._state === state || this._state === undefined) {
        this._state = this._paused.splice(0, 1).find(() => true);
        if (this._state) {
          this._state.resume();
        }
      }
    });
    this._state = state;
    state.initialize();
    if (!state.initialized) {
      throw new Error(
        `Avoid overriding initialize() on ${state.constructor.name} and hook into onInitialize() or onInitialized() instead.`,
      );
    }
  }

  update(deltaTime: number) {
    if (this._state === undefined && this._paused.length > 0) {
      this._state = this._paused.splice(0, 1).find(() => true);
      this._state?.resume();
    }
    this._state?.update(deltaTime);
    if (this._state?.finished) {
      this._state = undefined;
    }
  }

  cancel() {
    this._state?.cancel();
    for (const state of this._paused) {
      state.cancel();
    }
    this._state = undefined;
  }
}
