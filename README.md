# ts-state-machines
Simple state machine to execute arbitrary behaviours

```ts
// Create state machine
const stateMachine = new StateMachine();

// Create an update loop
let lastUpdate = Date.now()
const tick = () => {
  const now = Date.now();
  const delta = now - lastUpdate;
  stateMachine.update(delta);
  lastUpdate = now;
  requestAnimationFrame(tick);
}

// Start the update loop
requestAnimationFrame(tick);

// Assign a behaviour
stateMachine.state = (new TimeoutBehaviour(1000))
  .addEventListener('complete', () => console.log('This will not be called'))
  .addEventListener('cancel', () =>
    console.log('Optionally add event hooks as you like'),
  );

// Assign another behaviour while one is already active and 
// the previous one will be cancelled (if it is still ongoing)
stateMachine.state = new CallbackBehaviour(() => console.log('Hello World!'));
```