import { EventBus } from 'ts-event-bus';

/**
 * The most basic template to create a behaviour
 */
export abstract class Behaviour {
  readonly bus = new EventBus();
  completed = false;
  cancelled = false;
  finished = false;

  /**
   * Called exactly once when the behaviour begins running
   */
  initialize() {
    this.onInitialize();
    this.bus.trigger('initialize');
    this.onInitialized();
  }

  /**
   * Called every frame
   * @param deltaTime Time in milliseconds since the last update call
   */
  update(deltaTime: number) {
    this.onUpdate(deltaTime);
  }

  /**
   * Called when the behaviour successfully finishes
   */
  complete() {
    if (this.finished) {
      return;
    }
    this.completed = true;
    this.finished = true;
    this.onComplete();
    this.bus.trigger('complete');
    this.onCompleted();
    this.onFinish();
    this.bus.trigger('finish');
    this.onFinished();
  }

  /**
   * Called when the behaviour aborts
   */
  cancel() {
    if (this.finished) {
      return;
    }
    this.cancelled = true;
    this.finished = true;
    this.onCancel();
    this.bus.trigger('cancel');
    this.onCancelled();
    this.onFinish();
    this.bus.trigger('finish');
    this.onFinished();
  }

  addEventListener(event: string, callback: () => void): this {
    this.bus.on(event, callback);
    return this;
  }

  removeEventListener(event: string, callback: () => void): this {
    this.bus.off(event, callback);
    return this;
  }

  /**
   * Run just before the initialization event
   */
  onInitialize() {
    // Overriding is optional
  }

  /**
   Run just after the initialization event
   */
  onInitialized() {
    // Overriding is optional
  }

  /**
   * Run every frame
   * @param _deltaTime Time in milliseconds since the last update call
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onUpdate(_deltaTime: number) {
    // Overriding is optional
  }

  /**
   * Run just before the completion event
   */
  onComplete() {
    // Overriding is optional
  }

  /**
   * Run just after the completion event
   */
  onCompleted() {
    // Overriding is optional
  }

  /**
   * Run just before the cancellation event
   */
  onCancel() {
    // Overriding is optional
  }

  /**
   * Run just after the cancellation event
   */
  onCancelled() {
    // Overriding is optional
  }

  /**
   * Run just before the finish event
   */
  onFinish() {
    // Overriding is optional
  }

  /**
   * Run just after the finish event
   */
  onFinished() {
    // Overriding is optional
  }
}
