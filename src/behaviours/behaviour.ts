import { EventBus } from 'ts-event-bus';

/**
 * The most basic template to create a behaviour
 */
export abstract class Behaviour {
  readonly bus = new EventBus();
  initialized = false;
  paused = false;
  completed = false;
  cancelled = false;
  finished = false;

  /**
   * Called exactly once when the behaviour begins running
   */
  initialize() {
    if (this.initialized) {
      throw new Error(
        'Trying to reinitialize the behaviour ' +
          this.constructor.name +
          '! This is illegal!',
      );
    }
    this.initialized = true;
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

  pause() {
    this.paused = true;
    this.onPause();
    this.bus.trigger('pause');
    this.onPaused();
  }

  resume() {
    this.paused = false;
    this.onResume();
    this.bus.trigger('resume');
    this.onResumed();
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
   * Run just before the pause event
   */
  onPause() {
    // Overriding is optional
  }

  /**
   * Run just after the pause event
   */
  onPaused() {
    // Overriding is optional
  }

  /**
   * Run just before the resume event
   */
  onResume() {
    // Overriding is optional
  }

  /**
   * Run just after the resume event
   */
  onResumed() {
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
