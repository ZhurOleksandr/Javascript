/**
 * @template T, U
 * @param {T[]} array
 * @param {(item: T, index: number, arr: T[]) => U} callback
 * @returns {U[]}
 */
function myMap(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}

/**
 * @template T
 * @param {T[]} array
 * @param {(item: T, index: number, arr: T[]) => boolean} callback
 * @returns {T[]}
 */
function myFilter(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) result.push(array[i]);
  }
  return result;
}

/**
 * @template T, U
 * @param {T[]} array
 * @param {(acc: U, item: T, index: number, arr: T[]) => U} callback
 * @param {U} initialValue
 * @returns {U}
 */
function myReduce(array, callback, initialValue) {
  let accumulator = initialValue;
  for (let i = 0; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }
  return accumulator;
}

/**
 * @param {...Function} fns
 * @returns {Function}
 */
function pipe(...fns) {
  return input => myReduce(fns, (value, fn) => fn(value), input);
}

/**
 * @param {...Function} fns
 * @returns {Function}
 */
function compose(...fns) {
  return input => myReduce([...fns].reverse(), (value, fn) => fn(value), input);
}

/**
 * @param {Function} fn
 * @returns {Function}
 */
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...nextArgs) => curried(...args, ...nextArgs);
  };
}

/**
 * @param {Function} fn
 * @param {...any} presetArgs
 * @returns {Function}
 */
function partial(fn, ...presetArgs) {
  return (...laterArgs) => fn(...presetArgs, ...laterArgs);
}

/**
 * @template T
 * @param {(…args: any[]) => T} fn
 * @returns {(…args: any[]) => T}
 */
function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

/**
 * @template T
 * @param {T[]} array
 */
function chain(array) {
  let current = [...array];
  return {
    map(fn) {
      current = myMap(current, fn);
      return this;
    },
    filter(fn) {
      current = myFilter(current, fn);
      return this;
    },
    reduce(fn, initialValue) {
      return myReduce(current, fn, initialValue);
    },
    value() {
      return [...current];
    }
  };
}

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const toUpper = s => String(s).toUpperCase();
const trim = s => String(s).trim();
const exclaim = s => `${s}!`;
const double = n => n * 2;
const isEven = n => n % 2 === 0;

const formatUser = pipe(
  user => user.name,
  trim,
  toUpper,
  exclaim
);

const reverseFormatUser = compose(
  exclaim,
  toUpper,
  trim,
  user => user.name
);

const curriedAdd = curry(add);
const partialMultiplyBy10 = partial(multiply, 10);

const slowSquare = memoize(n => {
  let sum = 0;
  for (let i = 0; i < 10000000; i++) sum += 0;
  return n * n;
});

const output = document.getElementById('output');

document.getElementById('btnArray').addEventListener('click', () => {
  const data = [1, 2, 3, 4, 5, 6];
  const mapped = myMap(data, double);
  const filtered = myFilter(data, isEven);
  const reduced = myReduce(data, (acc, n) => acc + n, 0);
  const chained = chain(data).map(double).filter(n => n > 5).value();

  output.textContent = JSON.stringify({
    original: data,
    myMap: mapped,
    myFilter: filtered,
    myReduce: reduced,
    chainable: chained
  }, null, 2);
});

document.getElementById('btnStrings').addEventListener('click', () => {
  const user = { name: '  Test Testovich  ' };
  const pipeResult = formatUser(user);
  const composeResult = reverseFormatUser(user);
  const curryResult = curriedAdd(5)(7);
  const partialResult = partialMultiplyBy10(3);

  output.textContent = JSON.stringify({
    pipeResult,
    composeResult,
    curryResult,
    partialResult
  }, null, 2);
});

document.getElementById('btnMemo').addEventListener('click', () => {
  const a = slowSquare(25);
  const b = slowSquare(25);

  output.textContent = JSON.stringify({
    firstCall: a,
    secondCall: b,
    note: 'Другий виклик бере значення з кешу'
  }, null, 2);
});

document.getElementById('btnChain').addEventListener('click', () => {
  const result = chain([1, 2, 3, 4, 5, 6, 7, 8])
    .map(n => n * 3)
    .filter(n => n % 2 === 0)
    .map(n => n + 1)
    .value();

  output.textContent = JSON.stringify({ result }, null, 2);
});

window.myMap = myMap;
window.myFilter = myFilter;
window.myReduce = myReduce;
window.pipe = pipe;
window.compose = compose;
window.curry = curry;
window.partial = partial;
window.memoize = memoize;
window.chain = chain;