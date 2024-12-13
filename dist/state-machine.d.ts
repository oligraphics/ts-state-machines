import { Behaviour } from './behaviours/behaviour';
export declare class StateMachine {
    private _state;
    get state(): Behaviour | undefined;
    set state(state: Behaviour | undefined);
    setState(state: Behaviour): void;
    update(deltaTime: number): void;
    cancel(): void;
}
//# sourceMappingURL=state-machine.d.ts.map