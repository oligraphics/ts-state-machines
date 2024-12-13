import { Behaviour } from './behaviour';

/**
 * Wrapper behaviour to create shorthands for the construction of other
 * behaviours with preset parameters
 */
export abstract class WrapperBehaviour extends Behaviour {
  private readonly behaviour: Behaviour;

  protected constructor(behaviour: Behaviour) {
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

  update(deltaTime: number) {
    this.behaviour.update(deltaTime);
  }

  cancel() {
    if (!this.behaviour.cancelled) {
      this.behaviour.cancel();
    }
  }
}
