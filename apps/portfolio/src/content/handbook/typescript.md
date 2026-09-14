# TypeScript

TypeScript adds static analysis to JavaScript. Its type system helps document contracts, improve editor tooling, and catch invalid combinations before runtime; it does not validate untrusted runtime data by itself.

## Core tools

- Type aliases can describe primitives, unions, intersections, tuples, objects, and functions.
- Interfaces primarily describe object shapes and support declaration merging.
- Type inference avoids annotations when the compiler already has enough information.
- Union types model alternatives; intersections combine requirements.
- Generics preserve relationships between input and output types without falling back to `any`.
- Type assertions override the compiler and should follow runtime evidence, not replace it.
- `readonly` prevents assignment through a given type but is not deep runtime immutability.
- `Partial<T>` makes an object's properties optional; other mapped and conditional types support more precise transformations.

```ts
type TemperatureUnit = 'celsius' | 'fahrenheit'

function convertTemperature(value: number, unit: TemperatureUnit): number {
  return unit === 'celsius' ? (value * 9) / 5 + 32 : ((value - 32) * 5) / 9
}
```

Enable strict null checking and narrow `null` and `undefined` before use. Prefer `unknown` for untrusted values, then validate or narrow them. Use discriminated unions when state variants have different required fields.

## Interfaces, classes, and modules

Interfaces can define contracts implemented by classes. Abstract classes may contain shared implementation and cannot be instantiated directly. Enums are available, but string unions and `as const` objects are often simpler at module boundaries.

ECMAScript modules use `import` and `export`; TypeScript namespaces are mainly relevant to older non-module code. Decorators follow current JavaScript and TypeScript semantics, so confirm compiler configuration and library expectations before using them.

## Practical guidance

- Model valid states instead of adding casts after the fact.
- Keep runtime parsing at system boundaries such as APIs, storage, and form submissions.
- Give custom hooks generic result types so consumers retain autocomplete and safety.
- Avoid broad `any`, repeated assertions, and types that duplicate rather than derive from the source of truth.
- Treat type errors as design feedback, not obstacles to suppress.

Further reading: [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html).
