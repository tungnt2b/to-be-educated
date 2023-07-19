const loop = (n) => {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum++;
  }
};

const delay = (n) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, n);
  });
};

const main = async () => {
  console.time('main');

  await Promise.all(
    [1, 2].map(async () => {
      loop(5_000_000_000);
      await delay(1000);
    })
  );

  console.timeEnd('main');
};

main();
