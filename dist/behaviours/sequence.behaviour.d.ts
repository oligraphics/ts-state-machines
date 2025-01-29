import { Behaviour } from './behaviour';
import { StateMachine } from '../state-machine';
/**
 * Run a sequence of behaviours in order. Aborts if any of the behaviours abort.
 */
export declare class SequenceBehaviour extends Behaviour {
    readonly stateMachine: StateMachine;
    readonly behaviours: Behaviour[];
    constructor(...behaviours: Behaviour[]);
    onInitialize(): void;
    update(deltaTime: number): void;
    onCancelled(): void;
}
//# sourceMappingURL=sequence.behaviour.d.ts.map