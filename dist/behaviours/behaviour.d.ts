import { EventBus } from 'ts-event-bus';
/**
 * The most basic template to create a behaviour
 */
export declare abstract class Behaviour {
    readonly bus: EventBus;
    initialized: boolean;
    paused: boolean;
    completed: boolean;
    cancelled: boolean;
    finished: boolean;
    /**
     * Called exactly once when the behaviour begins running
     */
    initialize(): void;
    /**
     * Called every frame
     * @param deltaTime Time in milliseconds since the last update call
     */
    update(deltaTime: number): void;
    pause(): void;
    resume(): void;
    /**
     * Called when the behaviour successfully finishes
     */
    complete(): void;
    /**
     * Called when the behaviour aborts
     */
    cancel(): void;
    addEventListener(event: string, callback: () => void): this;
    removeEventListener(event: string, callback: () => void): this;
    /**
     * Run just before the initialization event
     */
    onInitialize(): void;
    /**
     Run just after the initialization event
     */
    onInitialized(): void;
    /**
     * Run every frame
     * @param _deltaTime Time in milliseconds since the last update call
     */
    onUpdate(_deltaTime: number): void;
    /**
     * Run just before the pause event
     */
    onPause(): void;
    /**
     * Run just after the pause event
     */
    onPaused(): void;
    /**
     * Run just before the resume event
     */
    onResume(): void;
    /**
     * Run just after the resume event
     */
    onResumed(): void;
    /**
     * Run just before the completion event
     */
    onComplete(): void;
    /**
     * Run just after the completion event
     */
    onCompleted(): void;
    /**
     * Run just before the cancellation event
     */
    onCancel(): void;
    /**
     * Run just after the cancellation event
     */
    onCancelled(): void;
    /**
     * Run just before the finish event
     */
    onFinish(): void;
    /**
     * Run just after the finish event
     */
    onFinished(): void;
}
//# sourceMappingURL=behaviour.d.ts.map