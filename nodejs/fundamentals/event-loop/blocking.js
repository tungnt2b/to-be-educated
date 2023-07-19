const logBtn = document.querySelector('#log');
const loopBtn = document.querySelector('#loop');

logBtn.addEventListener('click', () => {
  log();
});

loopBtn.addEventListener('click', () => {
  loop(5_000_000_000);
});

const log = () => {
  console.log('log log log');
};

const loop = (n) => {
  console.time('looping');

  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum++;
  }

  console.timeEnd('looping');
};
