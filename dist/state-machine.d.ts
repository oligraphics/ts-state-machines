import { Behaviour } from './behaviours/behaviour';
export declare class StateMachine {
    private _state;
    private _paused;
    get state(): Behaviour | undefined;
    /**
     * Assign a state and clear the entire paused stack
     */
    set state(state: Behaviour | undefined);
    get pausedStates(): Behaviour[];
    /**
     * Assign a state and clear the entire paused stack
     */
    setState(state: Behaviour): void;
    /**
     * Replace the current state with the provided state, putting the current
     * state in a paused state. It resumes after the provided state finishes,
     * unless the entire stack is cancelled by another direct assignment with
     * <code>setState()</code>
     */
    insertState(state: Behaviour): void;
    update(deltaTime: number): void;
    cancel(): void;
}
//# sourceMappingURL=state-machine.d.ts.map