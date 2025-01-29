import { Behaviour } from './behaviour';
/**
 * Wrapper behaviour to create shorthands for the construction of other
 * behaviours with preset parameters
 */
export declare abstract class WrapperBehaviour extends Behaviour {
    private readonly behaviour;
    protected constructor(behaviour: Behaviour);
    onInitialize(): void;
    update(deltaTime: number): void;
    cancel(): void;
}
//# sourceMappingURL=wrapper.behaviour.d.ts.map