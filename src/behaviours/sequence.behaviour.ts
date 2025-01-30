import { Behaviour } from './behaviour';
import { StateMachine } from '../state-machine';

/**
 * Run a sequence of behaviours in order. Aborts if any of the behaviours abort.
 */
export class SequenceBehaviour extends Behaviour {
  readonly stateMachine: StateMachine;
  readonly behaviours: Behaviour[];

  constructor(...behaviours: Behaviour[]) {
    super();
    this.stateMachine = new StateMachine();
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
      this.behaviours[i].bus.on('complete', () =>
        this.stateMachine.setState(this.behaviours[nextIndex]),
      );
      this.behaviours[i].bus.on('cancel', cancelHandler);
    }
    this.behaviours[this.behaviours.length - 1].bus.on('complete', () =>
      this.complete(),
    );
    this.behaviours[this.behaviours.length - 1].bus.on('cancel', cancelHandler);
    this.stateMachine.setState(this.behaviours[0]);
  }

  update(deltaTime: number) {
    this.stateMachine.update(deltaTime);
  }

  onCancelled() {
    this.stateMachine.cancel();
  }
}
