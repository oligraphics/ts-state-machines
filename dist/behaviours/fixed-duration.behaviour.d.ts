import { Behaviour } from './behaviour';
/**
 * Template class to create a behaviour with a fixed duration
 */
export declare abstract class FixedDurationBehaviour extends Behaviour {
    private readonly _durationMs;
    private t;
    protected constructor(durationMs: number);
    update(deltaTime: number): void;
}
//# sourceMappingURL=fixed-duration.behaviour.d.ts.map