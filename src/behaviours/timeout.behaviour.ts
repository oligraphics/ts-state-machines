import { FixedDurationBehaviour } from './fixed-duration.behaviour';

/**
 * Waits for a fixed amount of time and then completes without doing anything
 * else
 */
export class TimeoutBehaviour extends FixedDurationBehaviour {
  constructor(timeoutMs: number) {
    super(timeoutMs);
  }
}
