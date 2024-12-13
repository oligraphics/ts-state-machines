import { Behaviour } from './behaviour';

/**
 * Behaviour that calls a callback and then immediately completes
 */
export class CallbackBehaviour extends Behaviour {
  private readonly callback: () => void;

  constructor(callback: () => void) {
    super();
    this.callback = callback;
  }

  onInitialize() {
    this.callback();
    this.complete();
  }
}
