# React

React builds interfaces from components whose output is derived from props, state, and context. Data normally flows down; events communicate user intent upward.

## State placement

Keep state close to the components that use it. Lift it to the nearest shared owner when siblings must coordinate. Context can avoid repeatedly forwarding cross-cutting values, but it creates an implicit dependency and broad updates if its value changes frequently.

Modern function components use hooks:

- `useState` for local state;
- `useReducer` for related state transitions;
- `useEffect` to synchronize with external systems;
- `useContext` to consume context;
- `useRef` for mutable values that do not drive rendering or for DOM references;
- `useMemo` and `useCallback` for measured memoization needs.

Class lifecycle methods such as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` remain relevant to legacy code. `getInitialState` belongs to the pre-ES6 create-class API, not modern class components.

## Effects and asynchronous work

An effect should describe setup and cleanup for an external synchronization. Abort in-flight requests when they are no longer relevant, and guard against stale responses winning a race. Cleanup matters for correctness and resource use even when React does not report a warning.

Do not use effects to calculate values that can be derived during render. Event-driven work usually belongs in the event handler that caused it.

## Composition and reuse

Prefer composition over deeply configurable components. Render props and children-as-functions can inject rendering behavior; custom hooks usually provide a clearer way to reuse stateful logic. A custom hook shares logic, not state, unless it connects to a shared external store.

State libraries such as Redux or Zustand can help when independent areas coordinate through complex state. Start with React's built-in tools and introduce a store for a demonstrated boundary.

## Rendering performance

Measure before optimizing. Common tools include:

- route- or component-level lazy loading and code splitting;
- list virtualization for very large collections;
- stable keys derived from identity;
- `memo` for components that often receive unchanged props;
- `useMemo` for expensive derived values;
- `useCallback` when function identity affects a memoized consumer;
- debouncing or deferred updates for expensive high-frequency interactions.

Memoization has comparison and maintenance costs. It cannot repair incorrect state ownership or an effect that updates continuously. Current React tooling may optimize some computations automatically, but application architecture and measurement still matter.

## Component exercise themes

Useful practice includes grouping users into unique city tabs, building circular carousels, conditionally creating elements from a counter, avoiding prop drilling, implementing countdown render props, handling cancellable requests, and typing reusable fetch hooks. Each exercise should include keyboard behavior, semantic HTML, loading and error states, and deterministic tests—not only the happy-path code.

Further reading: [React documentation](https://react.dev/learn) and [React performance tools](https://react.dev/reference/react/Profiler).
