// ex1 how call stack works
function main() {
  console.log('Hello World!');
  console.log('I am Tung');
}

main();

// ex2 how call stack works
function func1() {
  func2();
}

function func2() {
  func3();
}

function func3() {
  console.log('End');
}

function main() {
  console.log('Hello World!');
  func1();
}

main();

// ex3 how async tasks are passed to Web APIs
function func1() {}

function func2() {}

function main() {
  func1();

  setTimeout(function () {
    console.log('setTimeout callback');
  }, 8000);

  func2();
}

main();

// ex4
function func1() {}

function func2() {}

$.on('button', 'click', function onClick() {
  console.log('You clicked the button!');
});

function main() {
  func1();

  setTimeout(function setTimeoutCallback() {
    console.log('setTimeout callback');
  }, 8000);

  func2();
}

main();

// ex5
$.on('button', 'click', function onClick() {
  console.log('You clicked the button!');
});

// click
setTimeout(function setTimeoutCallback() {
  console.log('setTimeout callback');
}, 10000);

// click
setTimeout(function setTimeoutCallback() {
  console.log('setTimeout callback');
}, 20000);

// ex6
setTimeout(function time1() {}, 1000);
setTimeout(function time2() {}, 0);

Promise.resolve().then(function promise1() {});
Promise.resolve().then(function promise2() {});

// ex6
setTimeout(function time1() {}, 0);

setTimeout(function time2() {
  Promise.resolve().then(function promise3() {});
  Promise.resolve().then(function promise4() {});
}, 0);

setTimeout(function time3() {}, 0);

Promise.resolve().then(function promise1() {});
Promise.resolve().then(function promise2() {});
