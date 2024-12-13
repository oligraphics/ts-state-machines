import { Behaviour } from './behaviour';
/**
 * Behaviour that calls a callback and then immediately completes
 */
export declare class CallbackBehaviour extends Behaviour {
    private readonly callback;
    constructor(callback: () => void);
    onInitialize(): void;
}
//# sourceMappingURL=callback.behaviour.d.ts.map