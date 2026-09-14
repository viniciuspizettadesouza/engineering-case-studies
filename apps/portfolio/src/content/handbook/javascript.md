# JavaScript Foundations

JavaScript is a high-level, garbage-collected language used in browsers, servers, and other runtimes. It supports functional, prototype-based, and object-oriented styles.

## Values and declarations

Primitive values are `string`, `number`, `bigint`, `boolean`, `symbol`, `undefined`, and `null`. Objects—including arrays and functions—are reference values.

- `let` and `const` are block-scoped and have a temporal dead zone before initialization.
- `var` is function-scoped; its declaration is hoisted and initialized to `undefined`.
- `const` prevents rebinding, not mutation of the referenced object.
- `===` compares without coercing operand types. Prefer it unless coercion is deliberate.
- `null` is an explicit absence; `undefined` commonly represents a missing or uninitialized value.

JavaScript engines primarily reclaim unreachable objects with tracing garbage collectors. Do not rely on a particular collection time.

## Scope, closures, and `this`

A closure is a function paired with the lexical environment where it was created. Closures enable private state, callbacks, and factories.

```js
function createCounter() {
  let count = 0
  return () => ++count
}
```

For a normal function, `this` depends on how the function is called. Arrow functions do not define their own `this`; they capture it lexically. `call` and `apply` invoke a function with an explicit receiver, while `bind` returns a new bound function. Arrow functions cannot be used as constructors.

Objects delegate through prototype chains. A constructor's `prototype` is used by instances created with `new`; the legacy `__proto__` accessor exposes an object's internal prototype and should generally be replaced by `Object.getPrototypeOf` or `Object.create`.

## Asynchronous execution

Promises represent eventual fulfillment or rejection. `async` functions always return promises; `await` pauses that function, not the JavaScript thread.

After the current stack completes, runtimes drain promise jobs (microtasks) before taking the next timer task. `Promise.all` rejects when one input rejects. `Promise.allSettled` waits for every input and reports each outcome.

Use `AbortController` when an operation should be cancellable. Handle errors at a boundary that can recover, retry, or present useful feedback.

## Events and scheduling

DOM events travel through capture, target, and bubble phases. Event delegation attaches a listener to a stable ancestor and identifies matching descendants from the event target. It is useful for dynamic collections, but selectors, nested interactive elements, and propagation rules require care.

Debouncing delays work until calls stop for a period. Throttling limits how frequently work may run. Both are appropriate for controlling expensive reactions to frequent input; neither replaces cancellation or concurrency control.

## Collections and copying

- `Map` accepts arbitrary keys; `WeakMap` accepts object or non-registered-symbol keys without preventing their collection.
- `Set` stores unique values.
- `every` requires all elements to pass; `some` requires at least one.
- `push` and `pop` operate at an array's end; `shift` and `unshift` operate at its start.
- Object spread and `Object.assign` make shallow copies.
- `structuredClone` handles many deep-copy cases, but not functions or every host object. JSON serialization is a lossy data conversion, not a general cloning algorithm.

Generators declared with `function*` can pause at `yield` and resume later. Modules use `export` and `import` to define explicit dependencies.

## Useful patterns

Memoization caches results for repeat inputs. Immutability can be encouraged with non-mutating updates and `Object.freeze`, although freezing is shallow unless nested values are also frozen. Small exercises such as counting characters, finding a maximum, checking palindromes, reversing strings, and building nested objects are useful ways to practice these fundamentals.

Further reading: [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) and [JavaScript execution model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop).
