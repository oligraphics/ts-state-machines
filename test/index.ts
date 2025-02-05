// Create state machine
import { CallbackBehaviour, StateMachine, TimeoutBehaviour } from '../src';

// Dummy request animation frame for testing purposes
const requestAnimationFrame = (callback: () => void) => {
  setTimeout(callback, 100);
};

const stateMachine = new StateMachine();

// Create an update loop
let lastUpdate = Date.now();
const tick = () => {
  if (!stateMachine.state) {
    // Test is over
    return;
  }
  const now = Date.now();
  const delta = now - lastUpdate;
  stateMachine.update(delta);
  lastUpdate = now;
  requestAnimationFrame(tick);
};

// Start the update loop
requestAnimationFrame(tick);

// Assign a behaviour
stateMachine.state = new TimeoutBehaviour(1000)
  .addEventListener('pause', ()=>console.log("Timeout got paused"))
  .addEventListener('resume', ()=>console.log("Timeout got resumed"))
  .addEventListener('complete', () => console.log('This will be called 1000 ms after the Hello World'))
  .addEventListener('cancel', () =>
    console.log('Optionally add event hooks as you like'),
  );

// Assign another behaviour while one is already active and
// the previous one will be cancelled (if it is still ongoing)
stateMachine.insertState(new CallbackBehaviour(() => console.log('Hello World!')));
