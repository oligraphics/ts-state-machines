import { Behaviour } from './behaviour';

/**
 * Template class to create a behaviour with a fixed duration
 */
export abstract class FixedDurationBehaviour extends Behaviour {
  private readonly _durationMs;

  private t = 0;

  protected constructor(durationMs: number) {
    super();
    this._durationMs = durationMs;
  }

  update(deltaTime: number) {
    super.update(deltaTime);
    this.t += deltaTime;
    if (this.t >= this._durationMs) {
      this.complete();
    }
  }
}
