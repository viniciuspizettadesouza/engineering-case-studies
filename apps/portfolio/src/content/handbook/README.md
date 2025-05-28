# 1. Perguntas Estratégicas de Soft Skills, Cultura e Avaliação em Entrevistas

Guia de estudos para entrevistas FE

Nao posso sair da entrevista sem fazer essas perguntas:

1. 🥇 Quais os maiores desafios da equipe ou do projeto hoje?
2. 🥈 Como vocês avaliam o sucesso e o desempenho de alguém nessa função?
3. 🥉 Qual é o plano para esse time (ou esse produto) nos próximos 6-12 meses?

## 1.1 Entendimento do Desafio e Contexto da Vaga

- Quais os desafios no projeto atual?
- Qual o nível de maturidade do software desenvolvido?
- Qual seria meu papel no projeto?
- Onde minha função se encaixa no plano da equipe para os próximos 6-12 meses?
- O que você gostaria de saber antes de começar nesse cargo?

## 1.2 Critérios de Sucesso, Avaliação e Carreira

- Como é o plano de carreira e o ciclo de promoções?
- Quais métricas ou objetivos são usados para avaliar minha performance?
- Como vocês definem sucesso para essa função?
- Há plano de crescimento de júnior para pleno/sênior?
- Qual é a taxa de retenção do time?

## 1.3 Dia a Dia, Cultura e Autonomia

- Como são distribuídas as tarefas no dia a dia?
- O que é esperado em termos de proatividade?
- Como funciona o período de adaptação?
- Qual é o ritmo de trabalho da equipe no dia a dia?
- Como a empresa lida com opiniões diferentes dentro da equipe?
- Quem define prioridades e prazos?
- Que tipo de reuniões acontecem na semana?

## 1.4 Organização do Time e Ambiente Técnico

- Tamanho da equipe e papéis definidos?
- A equipe tem funções bem distribuídas?
- Como é o fluxo de desenvolvimento (planejamento até entrega)?
- Como funciona a comunicação interna e externa?
- As tecnologias utilizadas são atuais e funcionais?
- Qual é a opinião da equipe sobre o uso de inteligência artificial nos projetos?
- Todos os devs têm acesso administrador em suas máquinas?
- Como é feito o teste do código? Vocês usam CI/CD?

## 1.5 Viabilidade do Negócio e Transparência

- Vocês lucram? Se sim, como?
- Caso não, quanto tempo o caixa aguenta?
- Quem são os investidores e quanto influenciam nas decisões?
- Qual o diferencial competitivo da empresa?

## 1.6 Remuneração, Benefícios e Modelo de Trabalho

- Como funciona o bônus ou equity?
- Qual a política de férias/PTO?
- Há orçamento para cursos/certificações?
- A empresa apoia contribuições open source?
- Existe alguma exigência de visita física (modelo híbrido)?

## 1.7 Apresentação Estratégica (Auto Posicionamento)

- “Quero ter ownership total de um projeto, você não precisa se preocupar — eu cuido.”
- “Me mostre o que você está fazendo agora, me mostra o que o time está fazendo.”
- “Se tiver mais perguntas sobre mim, estou animado para conhecer mais sobre o projeto.”
- “Como posso ajudar e onde posso me encaixar melhor na empresa?”
- “Estou aqui para resolver problemas e contribuir de forma prática e objetiva.”
- “Calmo, pragmático, autônomo e orientado à solução.”

## 1.8 Perguntas Técnicas/Comportamentais Já Feitas (Checklist de Treino)

- O que é hoisting?
Diferença entre função normal e arrow function
Escreva um fetch assíncrono com async/await
- O que você mais gosta no TypeScript?
- O que é Promise.allSettled?
Diferença entre componente de classe e funcional
- Como transferir dados entre componentes?
Como validar input numérico (Ex: Number.isNaN(+value))
- O que você considera uma tarefa difícil?
- Qual tarefa você mais gosta de fazer?

## 1.9 Outros Pontos Importantes

✅ **Como destacar adaptabilidade em entrevistas remotas**

- Empresas que contratam remotamente precisam confiar que você não apenas entrega, mas também se adapta rápido a ferramentas, fusos horários, mudanças e comunicação assíncrona.

👉 **Estratégias práticas para comunicar adaptabilidade:**

1. **Traga exemplos reais curtos**
    - “No projeto X, precisei migrar do Jira para Linear em dois dias com o time remoto.”
    - “Comecei remoto sem onboarding formal, montei meu setup e entreguei a primeira task no segundo dia.”
2. **Mostre conforto com ferramentas e contextos diversos**
    - “Já trabalhei com times em 3 fusos diferentes usando Slack, Notion e Zoom.”
    - “Me adapto bem tanto a syncs diários quanto a ambientes 100% assíncronos.”
3. **Destaque aprendizado rápido**
    - “Quando entrei no time anterior, nunca tinha usado GraphQL e em 1 semana já estava entregando.”
4. **Diga que valoriza documentação**
    - “Gosto de deixar e consumir documentação — algo crucial pra colaboração remota saudável.”
5. **Seja proativo na comunicação**
    - “Costumo sinalizar impedimentos cedo e usar mensagens objetivas, com contexto e sugestões.”

🧠 **Frase estratégica para encaixar:**

- “Me adapto bem a ambientes dinâmicos. Já troquei de stack, de ferramenta, e de time remoto sem impacto nas entregas. Posso dar alguns exemplos se quiser.”

❌ **Red flags técnicos em entrevistas (o que observar e mencionar)**
Se você entrar em um time desorganizado tecnicamente, será cobrado por resultados em cima de uma base instável. Essas red flags ajudam a evitar isso.

1. 🚩 **Funções longas e com múltiplas responsabilidades**
    - Funções de 100+ linhas, sem separação de responsabilidade
    - Falta de composição e reusabilidade
    - Indício de ausência de design técnico
**Exemplo de pergunta estratégica:**
“Como vocês garantem que funções e componentes sejam pequenos e de responsabilidade única?”

2. 🚩 **Código duplicado em vários arquivos ou serviços**
    - Mesmas regras de negócio espalhadas
    - Dificuldade em dar manutenção ou aplicar correções
    - Indica falta de cultura de refatoração
**Pergunta sutil:**
“Existe alguma política ou revisão técnica para evitar repetição de código e lógica duplicada?”

3. 🚩 **Variáveis com nomes genéricos ou enganosos**
    - Uso de data, result, thing, item1, temp, flag
    - Dificulta leitura, onboarding e debugging
    - Pode indicar cultura de pressa acima de clareza
**Dica na entrevista:**
“Vocês usam alguma convenção para nomeação e leitura de código, como ESLint, TypeScript ou code review guiado?”

4. 🚩 **Acoplamento excessivo entre módulos**
    - Componentes que acessam diretamente o estado de outros
    - Mudança em um arquivo quebra vários outros
    - Dificulta testes e refatorações
**Pergunta estratégica:**
“Como vocês lidam com acoplamento entre componentes ou módulos? Há uso de injeção de dependência, composição, ou design mais modular?”

5. 🚩 **Bugs frequentes e correções reativas**
    - Foco em apagar incêndio, sem atuar nas causas
    - Bugs recorrentes por falta de testes ou versionamento adequado
**Sinal de alerta:**
Se a resposta sobre bugs for “normal, a gente arruma depois que o usuário reporta”, é red flag clara.

## 2. JavaScript

1. **What is JavaScript?**  
   JavaScript is a high-level, dynamically typed programming language primarily used for building interactive web applications. It runs in browsers and supports both functional and object-oriented programming paradigms.

2. **What are the data types supported by JavaScript?**  
   JavaScript has primitive types (`string`, `number`, `bigint`, `boolean`, `symbol`, `undefined`, `null`) and reference types (`Objects`, `Arrays`, `Functions`).

3. **What is the difference between let, const, and var?**  
   - `var`: Function-scoped, hoisted, can be re-declared.  
   - `let`: Block-scoped, hoisted but not initialized.  
   - `const`: Block-scoped, hoisted but must be assigned at declaration and cannot be reassigned.

4. **Explain how `==` and `===` differ.**  
   - `==` (Loose equality): Converts types before comparison (`"5" == 5 → true`)  
   - `===` (Strict equality): Does not convert types (`"5" === 5 → false`)

5. **What is a closure?**  
   A closure is a function that retains access to its lexical scope, even when the function is executed outside that scope.

   ```js
   function outer() {
       let count = 0;
       return function inner() {
           count++;
           console.log(count);
       };
   }
   const counter = outer();
   counter(); // 1
   counter(); // 2
   ```

6. **What is hoisting?**  
   Hoisting is JavaScript's behavior of moving function and variable declarations to the top of their scope before execution.

   ```js
   console.log(x); // undefined
   var x = 10;
   ```

7. **Explain the concept of `this` in JavaScript.**  
   - Global scope: `this` refers to `window` (or `global` in Node.js)  
   - Object method: `this` refers to the object  
   - Constructor function: `this` refers to the newly created object  
   - Arrow function: `this` is inherited from the surrounding scope

8. **What are JavaScript prototypes?**  
   Prototypes enable inheritance in JavaScript. Every object has a `__proto__` property pointing to its prototype.

   ```js
   function Person(name) {
       this.name = name;
   }
   Person.prototype.sayHello = function () {
       console.log(`Hello, ${this.name}!`);
   };
   ```

9. **What is the difference between `null` and `undefined`?**  
   - `null`: Explicitly assigned to represent "no value".  
   - `undefined`: A variable declared but not initialized.

10. **How does JavaScript handle asynchronous operations?**  
    JavaScript uses the event loop, callbacks, promises, and async/await for handling async operations.

11. **What is a promise?**  
    A promise represents a future value. It can be pending, resolved, or rejected.

    ```js
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("Success"), 1000);
    });
    ```

12. **What are async/await functions?**  
    `async` functions return promises and allow `await` to pause execution until a promise resolves.

    ```js
    async function fetchData() {
        let data = await fetch("https://api.example.com");
        return data.json();
    }
    ```

13. **Explain event delegation in JavaScript.**  
    Instead of adding event listeners to multiple elements, attach a single listener to a parent and use event bubbling.

    ```js
    document.getElementById("parent").addEventListener("click", (event) => {
        if (event.target.matches(".child")) {
            console.log("Child clicked!");
        }
    });
    ```

14. **What are JavaScript modules?**  
    Modules allow code to be split across multiple files using `export` and `import`.

    ```js
    // module.js
    export const name = "Vinicius";

    // main.js
    import { name } from "./module.js";
    ```

15. **How can you prevent a function from being called multiple times?**  
    Use throttling or debouncing.

    ```js
    function debounce(func, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    }
    ```

16. **What is the event loop?**  
    The event loop manages JavaScript's asynchronous behavior, allowing the execution of callbacks from the event queue.

17. **What is the difference between `apply()` and `call()` methods?**  
    - `call()`: Calls a function with arguments passed individually.  
    - `apply()`: Calls a function with arguments passed as an array.

    ```js
    function greet(name, age) {
        console.log(`Hello ${name}, you are ${age}`);
    }
    greet.call(null, "Alice", 25);
    greet.apply(null, ["Bob", 30]);
    ```

18. **What is `bind()` method used for?**  
    `bind()` creates a new function with `this` bound to a specific object.

    ```js
    const obj = { name: "Vinicius" };
    function greet() {
        console.log(`Hello, ${this.name}`);
    }
    const boundGreet = greet.bind(obj);
    boundGreet(); // Hello, Vinicius
    ```

19. **What is a JavaScript event loop?**  
    The event loop processes tasks from the callback queue and microtask queue asynchronously.

20. **Explain "event bubbling" and "event capturing".**  
    - Bubbling: Events propagate up from the target element to the root.  
    - Capturing: Events propagate down from the root to the target.

21. **What is the difference between deep copy and shallow copy?**  
    - Shallow copy: Copies only references.  
    - Deep copy: Copies nested objects.

    ```js
    let obj = { a: { b: 1 } };
    let shallow = { ...obj }; // Shallow copy
    let deep = JSON.parse(JSON.stringify(obj)); // Deep copy
    ```

22. **What are generator functions?**  
    Functions that pause execution and yield values.

    ```js
    function* generator() {
        yield 1;
        yield 2;
    }
    ```

23. **What is the `new` keyword used for?**  
    Creates an instance of an object from a constructor function.

24. **How do `setTimeout` and `setInterval` work?**  
    - `setTimeout()`: Executes a function after a delay.  
    - `setInterval()`: Executes a function repeatedly.

25. **What is a WeakMap and how is it different from a Map?**  
    WeakMap keys are weakly referenced, meaning they do not prevent garbage collection.

26. **What is a Set in JavaScript?**  
    A Set stores unique values.

27. **What is `Object.create()` used for?**  
    Creates an object with a specified prototype.

28. **How does JavaScript’s garbage collection work?**  
    JavaScript uses reference counting and mark-and-sweep.

29. **What are "decorators" in JavaScript?**  
    A feature (experimental) to modify behavior of classes.

30. **Explain the difference between `prototype` and `__proto__`.**  
    - `prototype`: Property of constructor functions.  
    - `__proto__`: Reference to an object's prototype.

### 📦 Copy JS Object Possibilities

**Shallow Copy:**

```js
const copy1 = Object.assign({}, original);
const copy2 = { ...original };
```

**Deep Copy:**

```js
const deepCopy = JSON.parse(JSON.stringify(original));
```

**Using Lodash:**

```js
import cloneDeep from "lodash/cloneDeep";
const copy = cloneDeep(original);
```

### 🔍 Array.every() and Array.some()

Both return a Boolean depending on whether all or some elements pass a condition.

### 🧾 ENUM

Enums define a set of named constants — useful when a variable should be limited to a predefined list of values.

```js
const Status = {
    ACTIVE: "active",
    INACTIVE: "inactive",
    PENDING: "pending"
};
```

### 📌 push, pop, shift, unshift

- `push`: add to end  
- `pop`: remove from end  
- `shift`: remove from start  
- `unshift`: add to start

## 3. CSS / SCSS

1. **`display: none` vs `visibility: hidden` vs `opacity: 0`**  
   - `display: none`: Completely removes the element from the document flow, as if it doesn't exist on the page.  
   - `visibility: hidden`: Hides the element, but it still occupies space in the layout.  
   - `opacity: 0`: Makes the element completely transparent but it still occupies space and is interactable.
2. **What is BEM?**  
   BEM (Block Element Modifier) is a methodology that helps you to create reusable components and code sharing in front‑end development.  
   - To use BEM, you only need to employ BEM’s naming convention.  
   - Independent blocks and CSS selectors make your code reusable and modular.
3. **What are mixins in SCSS?**  
   Mixins are reusable blocks of CSS properties and rules that can be included in other style rules.

   ```scss
   @mixin center {
       display: flex;
       justify-content: center;
       align-items: center;
   }
   .box {
       @include center;
   }
   ```

4. **What are extensions in SCSS?**  
   Extensions allow classes to inherit styles from another class, promoting code reusability and readability by reducing duplication.

   ```scss
   .base {
       font-size: 16px;
       color: black;
   }
   .child {
       @extend .base;
       font-weight: bold;
   }
   ```

5. **When to use Flex vs Grid?**  
   - **Flexbox**: Best for one-dimensional layouts (either row **or** column).  
   - **Grid**: Best for two-dimensional layouts (row **and** column).

## 4. TypeScript

1. **What is a Type Alias in TypeScript?**  
   A `type` alias is used to create custom types by combining existing types. It's more flexible and can represent any valid type.  
   - You can create union types, intersection types, and more complex types using `type`.  
   - `type` can represent primitive types, object types, and function types.

2. **What is an Interface in TypeScript?**  
   `interface` is used to define the shape of an object or class. It's mainly focused on object structures.

3. **Static Types**  
   TypeScript introduces static typing, allowing you to declare the types of variables, function parameters, and return values.  
   This helps catch type-related errors at compile-time rather than runtime.

4. **Interfaces**  
   TypeScript allows you to define interfaces, which describe the shape of objects. This is particularly useful for documenting the expected structure of objects and ensuring type consistency.

5. **Enums**  
   Enums allow you to define named constants with associated values.

   ```ts
   enum Direction {
       Up = 1,
       Down,
       Left,
       Right
   }
   ```

6. **Union and Intersection Types**  
   Union: A variable that can be of multiple types.  
   Intersection: A type that combines multiple types.

   ```ts
   type A = { x: number };
   type B = { y: string };
   type C = A & B; // Intersection
   let example: C = { x: 1, y: "hello" };
   ```

7. **Type Aliases**  
   You can create custom type aliases to simplify and reuse complex types.

   ```ts
   type ID = number | string;
   ```

8. **Type Assertions**  
   Type assertions tell the compiler the specific type of a value.

   ```ts
   const input = document.getElementById("username") as HTMLInputElement;
   ```

9. **Generics**  
   Generics allow you to create reusable functions and classes that can work with different types.

   ```ts
   function identity<T>(arg: T): T {
       return arg;
   }
   ```

10. **Null and Undefined Handling**  
    TypeScript has stricter null and undefined checks.

    ```ts
    function greet(name: string | null) {
        if (name) {
            console.log("Hello, " + name);
        }
    }
    ```

11. **Decorators**  
    Used for adding metadata or behavior to classes, methods, or properties.

    ```ts
    @sealed
    class Greeter {
        greeting: string;
        constructor(message: string) {
            this.greeting = message;
        }
        greet() {
            return "Hello, " + this.greeting;
        }
    }
    ```

12. **Namespaces**  
    Organize code into logical groups.

    ```ts
    namespace Geometry {
        export function area(radius: number) {
            return Math.PI * radius * radius;
        }
    }
    ```

13. **Module System**  
    TypeScript supports ES modules using `import` and `export`.

    ```ts
    import { something } from './module';
    ```

14. **Optional and Default Parameters**  

    ```ts
    function greet(name: string = "Guest") {
        console.log("Hello " + name);
    }
    ```

15. **Readonly Properties**  
    Prevent modification of properties after object creation.

    ```ts
    interface User {
        readonly id: number;
        name: string;
    }
    ```

16. **Type Inference**  
    TypeScript can infer types even without explicit annotations.

    ```ts
    let count = 10; // inferred as number
    ```

17. **Enhanced Code Quality**  
    The combination of types, interfaces, and tools like the TypeScript compiler improves overall code quality and maintainability.

18. **Partial Utility Type**  
    `Partial<T>` makes all properties in `T` optional.

    ```ts
    interface User {
        id: number;
        name: string;
    }

    const updateUser = (user: Partial<User>) => {
        // Only the properties that are provided will be updated
    };
    ```

## 5. React

1. **Estados do React**  
   - `state lifting = up`  
   - `state colocation = down`

2. **Memoization and Optimization**  
   - `memo` for components  
   - `useMemo` for variables  
   - `useCallback` for functions  
   - `useLayoutEffect` in case the update makes an observable change to the DOM

3. **Decorators in TypeScript**  
   Used to add metadata or behavior to classes, methods, or properties.

4. **Difference between CI/CD**  
   - CI (Continuous Integration): Frequently merging code into a shared repository.  
   - CD (Continuous Delivery/Deployment): Automatically releasing that integrated code to production.

5. **Memoization Example in JavaScript**

```js
let oldParams = null;
let lastResult = null;

function memoize(fn) {
  return function(...args) {
    console.log(`args:`, ...args);
    console.log(`oldParams:`, oldParams);
    const currentParams = { ...args };
    if (JSON.stringify(oldParams) === JSON.stringify(currentParams)) {
      return lastResult;
    }
    const result = fn(...args);
    oldParams = currentParams;
    lastResult = result;
    return result;
  };
}

const slowFunction = (a, b, c) => a + b + c;
const memoizedSlowFunction = memoize(slowFunction);

console.log(memoizedSlowFunction(1, 2, 3)); // 6
console.log(memoizedSlowFunction(1, 2, 3)); // 6 (cached)
console.log(memoizedSlowFunction(4, 5, 6)); // 15
console.log(memoizedSlowFunction(4, 5, 6)); // 15 (cached)
```

6. **Character Count Example**

```js
function charCount(str) {
  return str.split('').reduce((charMap, char) => {
    charMap[char] = (charMap[char] || 0) + 1;
    return charMap;
  }, {});
}
const result = charCount('batman');
console.log(result); // { b: 1, a: 2, t: 1, m: 1, n: 1 }
```

7. **React Stack**
   - Webpack  
   - Babel  
   - React Router  
   - Redux  
   - Jest  
   - React Testing Library  
   - Material UI

8. **React Lifecycle**
   - **Mounting**  
     - `constructor()`  
     - `render()`  
     - `componentDidMount()`
   - **Updating**  
     - `shouldComponentUpdate(nextProps, nextState)`  
     - `render()`  
     - `componentDidUpdate(prevProps, prevState)`
   - **Unmounting**  
     - `componentWillUnmount()`

9. **Hooks (Functional Components)**
   - `useState`: Manage state  
   - `useEffect`: Lifecycle behavior  
   - `useContext`: Access context  
   - `useReducer`: Complex state  
   - `useMemo` and `useCallback`: Optimization  
   - `useRef`: DOM manipulation

10. **Constructor vs getInitialState**  
    - `constructor()`: Initializes state in class components (ES6)  
    - `getInitialState()`: Legacy way for state initialization in ES5 React

11. **State Management Libraries**

- Zustand  
- MobX

# 6. React Performance

## React Optimization Techniques

- **React.memo**: Higher-order component to prevent unnecessary re-renders by memoizing functional components.
- **lazy loading**: Dynamically load components only when needed.
- **react-virtualized**: Library to efficiently render long lists or tables.
- **useMemo**: Memoizes expensive calculations.
- **code splitting**: Divide code into separate bundles that can be loaded on demand.
- **Suspense**: Used for lazy-loaded components.
- **debouncing**: Technique to limit the rate at which a function is executed (e.g., input events).
- **CDN**: Deliver static assets quickly from edge servers.
- **SSR (Server Side Rendering)**: Render React components on the server for better performance and SEO.

## TypeScript - Abstract Class Definition

**1. Which of the following options is true regarding abstract classes?**  
✅ **TRUE**: They can only be extended  
❌ They can only be instantiated  
❌ They can be both extended and instantiated  
❌ They cannot be extended or instantiated

## JavaScript - Find the largest number

```js
const numbers = [10, 5, 20, 8];
const max = Math.max(...numbers);
console.log(max); // 20
```

## TypeScript - Temperatures (tutorial)

*Implement your custom temperature converter using TypeScript types.*

```ts
type Temperature = 'Celsius' | 'Fahrenheit';

function convertTemp(value: number, type: Temperature): number {
    return type === 'Celsius'
        ? (value * 9) / 5 + 32
        : ((value - 32) * 5) / 9;
}
```

## Vue - Lifecycle Hooks

**Which lifecycle function is first called when a Vue app is loaded in the DOM?**  
✅ `beforeCreate`

---

## Other Performance and Architecture Topics

- **Sendgrid** (email provider)
- Update Node, Redux to Redux Toolkit
- Webpack, Virtual DOM, Shadow DOM
- HTTP/1 vs HTTP/2
- Webpack, Vite, Code Splitting, `SplitChunks`
- **Micro-FEs**: Break UIs into smaller route-level pieces, with **monorepo** (build time) or **module federation** (run time)
- Payment platforms
- Custom Hook

---

## JavaScript Type System

- **Primitive**: 7 types (string, number, boolean, null, undefined, bigint, symbol)
- **Non-Primitive**: Objects and 10+ subtypes

---

## Tools & References

- Event-ticketing platforms
- Type Safety
- [uicolors.app](https://uicolors.app)
- [tailwindscan](https://tailwindscan.com)
- [hypercolor](https://hypercolor.dev)
- [hover.dev](https://hover.dev)
- Tailwind + Prettier
- daisyUI
- [33 JS Concepts GitHub](https://github.com/leonardomso/33-js-concepts)

---

## JavaScript Concepts & Challenges

### Closure

A function that accesses variables outside its scope.

```js
function outer() {
  let count = 0;
  return function inner() {
    return ++count;
  };
}
```

### useMemo Example – Fibonacci

```js
const fib = (n) => {
  if (n <= 1) return 1;
  return fib(n - 1) + fib(n - 2);
};

const memoizedFib = useMemo(() => fib(10), []);
```

### Spread vs Rest Operator

```js
// Spread
const arr = [1, 2, 3];
const copy = [...arr];

// Rest
function sum(...args) {
  return args.reduce((a, b) => a + b);
}
```

### Turn on VSCode Sync

Settings > Turn on Settings Sync

### Array.at()

```js
const arr = [10, 20, 30];
console.log(arr.at(-1)); // 30
```

### Immutability with const, freeze and deepFreeze

```js
const obj = Object.freeze({ a: 1 });
// obj.a = 2; // TypeError

function deepFreeze(o) {
  Object.getOwnPropertyNames(o).forEach((prop) => {
    if (typeof o[prop] === 'object' && o[prop] !== null) deepFreeze(o[prop]);
  });
  return Object.freeze(o);
}
```

### Palindrome Challenge

```js
const isPalindrome = (str) => str === str.split('').reverse().join('');
```

### Deep vs Shallow Copy

- **Shallow**: `...spread`
- **Deep**: `structuredClone(obj)` or `JSON.parse(JSON.stringify(obj))`

### Arrow Functions vs Traditional Functions

- Arrow functions are scoped, do not bind `this`, and cannot be hoisted.

### VSCode Transparency

Adjust via `workbench.colorCustomizations` or third-party extensions.

### CSS clamp

```css
font-size: clamp(1rem, 2vw, 2rem);
```

---

## React Concepts

- Context API > Prop Drilling
- Principles:
  - **DRY** (Don't Repeat Yourself)
  - **KISS** (Keep It Simple, Stupid)
- Hooks vs Mixins
- Optimistic UI (e.g., button loading states)
- Theme Context

# 7. Vue.js

## 1. How to create a Vue instance

To create a Vue instance, you first need to include the Vue.js library in your HTML file. You can do this by including a link to the Vue.js CDN or by downloading the Vue.js library and including it in your project.

Once you have included the Vue.js library, you can create a new Vue instance using the following syntax:

```js
var vm = new Vue({
  // options object
});
```

## 2. Mixins and Extends

- `mixins` in Vue 2: Used to distribute reusable functionalities across components.
- `extends` in Vue 3: A new way to extend component options using object merging.

## 3. Vue Lifecycles

### Vue 2

- **Creation**: `beforeCreate`, `created`
- **Mounting**: `beforeMount`, `mounted`
- **Updating**: `beforeUpdate`, `updated`
- **Destroying**: `beforeDestroy`, `destroyed`

### Vue 3

- **Creation**: `beforeCreate`, `created`, `beforeMount`, `mounted`
- **Updating**: `beforeUpdate`, `updated`
- **Unmounting**: `beforeUnmount`, `unmounted`
- **Error Handling**: `errorCaptured`
- **New Concepts**: `Composition API`, `Teleport` (native in Vue 3, previously via portal plugin in Vue 2)

## 4. Rule No.1: Never Use Non-trusted Templates

- Always sanitize user input values on the server.
- Use client-side sanitization in necessary scenarios only (e.g. markdown preview).

## 5. Backend Coordination

- Be aware of HTTP security vulnerabilities such as:
  - CSRF (Cross-Site Request Forgery)
  - XSSI (Cross-Site Script Inclusion)
- These issues are typically handled by the backend.
- It's important to coordinate with your backend team, for example by:
  - Submitting CSRF tokens with form submissions
  - Aligning on API interaction strategies

# 8. Architecture Patterns

## Common Software Architecture Patterns

- **Model-View-Controller (MVC) Pattern**
- **Microservices Architecture**
- **Event-Driven Architecture**
- **Layered Architecture**
- **Service-Oriented Architecture (SOA)**
- **Domain-Driven Design (DDD)**
- **Hexagonal Architecture (Ports and Adapters)**
- **Clean Architecture**
- **Reactive Architecture**
- **Serverless Architecture**

## Optimistic Architecture

- Use **optimistic UI updates** to immediately reflect user actions before server confirmation.
- Examples:
  - **sample application** and **sample application** leverage optimistic approaches in their platforms.

## MACH Architecture

MACH stands for:

- **Microservices**
- **API-first**
- **Cloud-Native SaaS**
- **Headless**

Technologies and services:

- CMS: **Contentful**
- Messaging/Queue: **Azure Service Bus**
- Caching: **Redis Cache**
- Serverless compute: **Azure Functions**
- Storage: **Azure Blob Storage**
- Containerization: **Azure Containers**

## Key Concepts

- Built headless
- Single GET pattern
- Integration with **Relewise**, **Cookie-based personalization**, **Google Tag Manager (GTM)**, **Videoly**

---

## Architecture in React and Next.js

### 🔹 React (especially with hooks/state management libraries)

**MVVM (Model-View-ViewModel)**

- `View`: React components (JSX/UI)
- `ViewModel`: Hooks, context, Zustand, Redux
- `Model`: Backend APIs or local storage/data sources

React uses **one-way data binding** and **observable state**, aligning with MVVM: the ViewModel manages state, and the View reflects it.

### 🔹 React + libraries like Redux, Zustand, or RxJS

**MVI (Model-View-Intent)**

- Actions represent **intents**
- Reducers produce **state**
- Components reflect state changes

### 🔹 Next.js

- Builds on React
- Adds **Routing**, **SSR**, **SSG**
- Server components and API routes = **Model**
- Pages/components = **View**
- Client state (via context, hooks, store) = **ViewModel**

### ✅ Summary

| Framework     | Most Aligned Pattern                   |
| ------------- | -------------------------------------- |
| React         | MVVM / MVI                             |
| React + Redux | MVI                                    |
| Next.js       | MVVM + MVI (with routing + SSR on top) |

---

## SOAP vs REST

- **SOAP**: Protocol with strict standards, uses XML, requires more overhead.
- **REST**: Architectural style, uses HTTP methods, can use JSON/XML, lightweight and flexible.

# 9. Design Patterns

## Common Design Patterns in Software Development

### 1. Façade Pattern

- **Definition**: Creates a simplified interface for interacting with complex components or libraries.
- **Use case**: Encapsulates complexity and provides a cleaner API.

### 2. Singleton Pattern

- **Definition**: Ensures a class has only one instance while providing a global point of access to it.
- **Use case**: Managing global state or configuration.

### 3. Factory Pattern

- **Definition**: Defines an interface for creating objects, but allows subclasses to alter the type of created objects.
- **Use case**: Object creation logic encapsulated from the client.

### 4. Adapter Pattern

- **Definition**: Allows the interface of an existing class to be used as another interface.
- **Use case**: Compatibility between otherwise incompatible classes.

### 5. Observer Pattern

- **Definition**: One-to-many dependency between objects so that when one changes state, all dependents are updated.
- **Use case**: Event handling systems, UI bindings.

### 6. Strategy Pattern

- **Definition**: Defines a family of algorithms, encapsulates them, and makes them interchangeable.
- **Use case**: Dynamic selection of algorithms at runtime.

### 7. Decorator Pattern

- **Definition**: Attaches additional responsibilities to an object dynamically.
- **Use case**: Flexible alternative to subclassing for extending behavior.

### 8. Command Pattern

- **Definition**: Encapsulates a request as an object to allow parameterization and queuing.
- **Use case**: Task execution queues, undo/redo functionality.

### 9. Template Method Pattern

- **Definition**: Defines the skeleton of an algorithm in a superclass, letting subclasses override specific steps.
- **Use case**: Consistent processing structure with customizable behavior.

### 10. Builder Pattern

- **Definition**: Separates object construction from its representation, allowing different representations using the same construction logic.
- **Use case**: Building complex objects with many configurable parts.

## 10. SEO

### Core Web Vitals

- **First Contentful Paint (FCP)**: FCP measures how quickly the first piece of content is rendered on the page. A fast FCP ensures that users see something meaningful as soon as possible, improving user experience and SEO.
- **Largest Contentful Paint (LCP)**: LCP measures the loading time of the largest content element (e.g., an image or text block). It reflects the perceived loading speed and should be optimized for a better user experience.
- **Time to Interactive (TTI)**: TTI evaluates when a page becomes interactive, meaning users can interact with page elements. A fast TTI ensures a responsive website.
- **Total Blocking Time (TBT)**: TBT measures the amount of time during which the main thread is blocked and unresponsive to user input. Reducing TBT leads to smoother interactions.
- **Cumulative Layout Shift (CLS)**: CLS assesses the visual stability of a page by measuring layout shifts during page load. A low CLS score indicates a more stable user experience.

### 🔍 Suggestions for a Candidate

- Study about CRP (Critical Rendering Path): <https://developer.mozilla.org/en-US/docs/Web/Performance/Critical_rendering_path>
- How browser works: <https://www.youtube.com/watch?v=0IsQqJ7pwhw>
- TypeScript decorators: <https://www.typescriptlang.org/docs/handbook/decorators.html>
- Scrum vs Kanban: <https://resources.scrumalliance.org/Article/scrum-vs-kanban>
- Web Vitals overview: <https://web.dev/vitals/>

# 11. GraphQL

## Como limitar requisições GraphQL

- Use rate limiting no backend ou API Gateway.
- Ative mecanismos de caching (como Apollo cache, Redis, CDN).
- Use *persisted queries* para limitar consultas arbitrárias.
- Configure *depth limit* e *complexity limit*.

## Batch Interval and Cache

- **Batching**: Combine várias queries em uma única requisição usando ferramentas como `apollo-link-batch-http`.
- **Cache**: Use `InMemoryCache` ou Redis para respostas prévias.

---

# 12. Dev Env Ubuntu

## Comandos úteis

```bash
# Reiniciar servidor TS
Ctrl + Shift + P > Restart TS Server

# Criar nova branch
git checkout -b myFeature dev

# Se git pull não funcionar
git rebase origin/fix/example-branch
```

## Instalar NVM e Node

Fonte: [DigitalOcean - Instalar Node.js](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install lts/hydrogen
```

## Criar React App

```bash
npx create-react-app cra-test
```

Para instalar todas as dependências reveladas:

```bash
npm run eject
```

## Referências

- <https://jscomplete.com/reactful>
- <https://jscomplete.com/react-beyond-basics>
- <https://github.com/jscomplete/rgs-star-match>
- <https://github.com/pkellner/pluralsight-designing-react-components-course-code/tree/master/02-designing-better-components>

## Extensões úteis VSCode

- ESLint
- GitLens
- PostCSS Language Support
- Tailwind CSS IntelliSense
- Prisma

Example VS Code configuration: `settings.json`

## SSH Ubuntu

- Use a strong passphrase stored in a password manager.

## Atalhos VSCode

- **Ordenar arquivos**: `Ctrl + P`, depois digitar `>`

## Commits semânticos

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `chore`: Tarefas rotineiras
- `docs`: Documentação
- `style`: Estilo ou formatação
- `refactor`: Refatoração
- `test`: Testes
- `perf`: Performance
- `build`: Sistema de build
- `ci`: Integração contínua
- `revert`: Reverter commit
- `wip`: Work in progress

---

# Chapter 13: Kafka vs RabbitMQ

## Kafka

- Focused on **event streaming** and **long-term data retention**.
- Optimized for **high throughput** and **horizontal scalability**.
- Works well for data pipelines, real-time analytics, and publish-subscribe models.
- Built-in support for **message replay**.
- Requires **Zookeeper** for broker coordination and metadata management.

## RabbitMQ

- Designed for **message queuing** and **point-to-point communication**.
- Better for **transactional** use-cases and **reliable delivery**.
- Implements **AMQP (Advanced Message Queuing Protocol)**.
- Easier setup for simple pub/sub or job queue systems.
- Better suited for **short-lived messages**.

---

# Chapter 14: Standards to Enforce

## Code Standards

- Use **named exports** for components and types with matching names.
- Avoid multiple `as` type casts – indicates incorrect or lazy typing.
- Prefer **custom ESLint** and **Stylelint** rules for enforcing best practices.
- Follow **Clean Code principles** (Robert C. Martin).

## Design & Usability

- Collaborate with the design team; understand **design fundamentals**:
  - *The Design of Everyday Things*
  - *Refactoring UI*
- Perform **usability reviews** and audits:
  - *Don't Make Me Think* by Steve Krug

## Product Communication

- Align with product team by understanding:
  - **JTBD (Jobs To Be Done)** framework
  - **The Mom Test** (user interviews)

## Testing and Automation

- Enforce **unit and end-to-end testing**:
  - Tools: **Cypress**, **Playwright**
  - Set up **GitHub Actions** for CI/CD pipelines
- Embrace **Continuous Delivery** principles.

## Frontend Tools and Practices

- Adopt:
  - **shadcn** as UI atom library
  - **radix-ui** for primitive components
  - **react-query** for async data
  - **react-hook-form** for forms

---

# Chapter 15: Ticket Priority

| Priority | Description |
|----------|-------------|
| **P1**   | Showstopper – Must be resolved immediately. |
| **P2**   | High Business Value – Must be done **before go-live**. |
| **P3**   | Fast Follow – Can be completed **right after go-live**. |
| **P4**   | Under consideration – **Non-critical** for now. |

---

# 16. Everyday Command Line Cheat Sheet

- `git commit --amend -m`
- Exit vim: press `Esc` and type `:wq`
- `npm outdated`
- `git config --global user.name`
- `git config --global user.email`
- `git config --list`
- `git config user.name`
- `git config user.email`
- `git config commit.gpgsign false`
- `export GPG_TTY=$(tty)`
- `latexindent cv.tex -w`
- `npx npm-check-updates -u`
- `sudo visudo`
- `find . -name "*:Zone.Identifier" -type f -delete` (for WSL2 zone identifier)
- Ask MR agent: `/ask "do a full files walkthrough"`
- To find error in pipeline, search `FAIL`
- `.next/`, `node_modules/`, `coverage/`, `storybook-static/` (common ignored folders)
- Husky: `git commit --no-verify`

# 17. Testes e Qualidade de Código

## Testes

- **Tipos de Testes**:
  - Testes unitários
  - Testes de integração
  - Testes end-to-end (E2E)

- **Frameworks populares**:
  - Jest (unitário)
  - Vitest (rápido, baseado em Vite)
  - React Testing Library (componentes React)
  - Cypress, Playwright (E2E)

- **Boas práticas**:
  - Testar comportamento, não implementação
  - Evitar mocks desnecessários
  - Nomear claramente os testes
  - Cobertura > 80% com `--coverage`

## Qualidade de Código

- **Ferramentas**:
  - ESLint: Análise estática
  - Prettier: Formatação
  - Stylelint: CSS
  - SonarQube: Análise de qualidade e segurança

- **Boas práticas**:
  - DRY (Don't Repeat Yourself)
  - KISS (Keep It Simple, Stupid)
  - SRP (Single Responsibility Principle)
  - Code Review obrigatórios (Checklist de revisão)

- **Git Commit Semântico**:
  - `feat:` nova funcionalidade
  - `fix:` correção
  - `chore:` tarefas gerais
  - `refactor:` refatoração
  - `test:` testes adicionados ou modificados

# 18. DevOps, Build e Performance

## DevOps

- CI/CD (GitHub Actions, GitLab CI, CircleCI)
- Pull Requests automáticos
- Testes e linting em pipelines
- Deploy automatizado (Vercel, Netlify, AWS, Azure)
- GitOps, observabilidade e logs

## Build

- **Ferramentas**: Webpack, Vite, Turbopack

- **Estratégias de build**:
  - Lazy loading
  - Code splitting
  - Tree shaking
  - Compressão gzip/brotli
  - Monorepo com PNPM Workspaces + TurboRepo

## Performance

- **Métricas Web Vitals**:
  - LCP, FID, CLS, TBT, FCP

- **Otimizações**:
  - SSR/SSG com Next.js
  - CDN (Content Delivery Network)
  - Otimização de imagens (Next/Image, Squoosh)
  - Virtualização de listas (React Virtualized)
  - Debounce, throttle
  - `useMemo`, `React.memo`

## Ferramentas

- Lighthouse
- WebPageTest
- Chrome DevTools
- bundlephobia.com
- webpack-bundle-analyzer

# 19. Desafios Técnicos Práticos

## Challenges

- Contar a quantidade de vezes que símbolos aparecem em uma string
- Implementar scroll/lazy loading ao vivo
- Criar função com 2 parâmetros e também com parâmetros concatenados
- Aplicar conceitos de Extreme Programming
- Usar o novo compilador do React para reduzir `memo`
- Utilizar `unpkg` com `react-scan`
- Criar sistema de pub/sub em TypeScript com callback, subscribe, unsubscribe, mensageria

## Links de desafios práticos

- Practice a travel-booking coding exercise
- Practice a developer-experience coding exercise
- Practice a framework-based ticketing exercise
- Practice transforming dotted paths into nested objects

## Assuntos comuns

- Diferença entre **síncrono** e **assíncrono**
- LeetCode (slide window, DFS, notação Big O, recursividade, resolver recursão com stack ou queue)
- Inverter string com LeetCode
- Usar `assert` para validar desafios

## Exemplo prático do desafio do nested-object transformation

```js
function createObject(stringToParse, valueToAssign) {
  const list = stringToParse.split(".");
  const reversed = list.reverse();
  const lastItem = list.at(0);
  const last = { [lastItem]: valueToAssign };
  return reversed.reduce((acc, item) => {
    acc = { [item]: acc };
    return acc;
  }, valueToAssign);
}

console.log(createObject("a.b.c.d.e", 2));
// Resultado esperado:
/*
{
  a: {
    b: {
      c: {
        d: {
          e: 2,
        }
      }
    }
  }
}
*/
```

# 20. Tech Lead – engineering mentor

## Pilares do Tech Lead

- Técnico
- Líder
- Comunicador

## Marty Cagan – Product Trio

- **Product Manager**: risco de viabilidade de negócio, risco de valor
- **Product Designer**: risco de usabilidade
- **Lead Engineer**: risco de viabilidade técnica

## Responsabilidades

- Planejamento
- Estimativa de esforço
- Alinhamento com objetivo de negócio
- Gerenciamento de riscos
- Gestão de equipe
- Mentoria
- Distribuição de tarefas
- Motivação da equipe
- Orientação técnica
- Decisões de arquitetura
- Revisão de código
- Resolução de problemas complexos

## Como evoluir como Tech Lead

- Tornar-se referência técnica local
- Mentorar colegas juniores
- Entregar mini RFCs que conectam código a valor de negócio
- Pedir feedback 360° trimestral
- Delegação real e criação de sucessor
- Falar a língua do Produto e da Liderança = gerar impacto
- Métricas de engenharia: lead time, MTTR, TTM
- Visibilidade externa: talks, open source, whitepapers

## Primeiros 30 dias como Líder/Manager

### 🔍 Descobrir (0–30 dias)

- Conduzir 1‑1s estruturados com devs, PM, Design, QA
- Shadowing de incidentes nas 2 primeiras semanas
- Mapear arquitetura (Contexto + Container)
- Levantar baseline das métricas
- Criar doc de experimentos pendentes

### 🧭 Organizar (31–60 dias)

- Implantar ritual de PR com SLA 24 h
- Publicar primeiro ADR / RFC
- Estabelecer on‑call rotativo e runbook
- Criar dashboard de engenharia visível ao time

### 🚀 Impactar (61–90 dias)

- Selecionar e atacar quick‑win de dívida técnica
- Realizar workshop de OKR e fixar metas
- Entregar quick‑win em produção e medir impacto
- Iniciar coaching do sucessor e delegar
