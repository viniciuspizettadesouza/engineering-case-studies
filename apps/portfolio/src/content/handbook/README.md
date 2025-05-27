# frontend-interview-guide

Guia de estudos para entrevistas FE
# 1. Perguntas Estratégicas de Soft Skills, Cultura e Avaliação em Entrevistas
Nao posso sair da entrevista sem fazer essas perguntas:
🥇 1. Quais os maiores desafios da equipe ou do projeto hoje?
🥈 2. Como vocês avaliam o sucesso e o desempenho de alguém nessa função?
🥉 3. Qual é o plano para esse time (ou esse produto) nos próximos 6-12 meses?
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
- ✅ Como destacar adaptabilidade em entrevistas remotas
Por que isso importa:
 Empresas que contratam remotamente precisam confiar que você não apenas entrega, mas também se adapta rápido a ferramentas, fusos horários, mudanças e comunicação assíncrona.
- 👉 Estratégias práticas para comunicar adaptabilidade:
Traga exemplos reais curtos
- “No projeto X, precisei migrar do Jira para Linear em dois dias com o time remoto.”
- “Comecei remoto sem onboarding formal, montei meu setup e entreguei a primeira task no segundo dia.”
Mostre conforto com ferramentas e contextos diversos
- “Já trabalhei com times em 3 fusos diferentes usando Slack, Notion e Zoom.”
- “Me adapto bem tanto a syncs diários quanto a ambientes 100% assíncronos.”
Destaque aprendizado rápido
- “Quando entrei no time anterior, nunca tinha usado GraphQL e em 1 semana já estava entregando.”
Diga que valoriza documentação
- “Gosto de deixar e consumir documentação — algo crucial pra colaboração remota saudável.”
Seja proativo na comunicação
- “Costumo sinalizar impedimentos cedo e usar mensagens objetivas, com contexto e sugestões.”
- 🧠 Frase estratégica para encaixar:
- “Me adapto bem a ambientes dinâmicos. Já troquei de stack, de ferramenta, e de time remoto sem impacto nas entregas. Posso dar alguns exemplos se quiser.”
- ❌ Red flags técnicos em entrevistas (o que observar e mencionar)
Por que isso importa:
 Se você entrar em um time desorganizado tecnicamente, será cobrado por resultados em cima de uma base instável. Essas red flags ajudam a evitar isso.
- 🚩 1. Funções longas e com múltiplas responsabilidades
Funções de 100+ linhas, sem separação de responsabilidade
Falta de composição e reusabilidade
Indício de ausência de design técnico
Exemplo de pergunta estratégica:
- “Como vocês garantem que funções e componentes sejam pequenos e de responsabilidade única?”
- 🚩 2. Código duplicado em vários arquivos ou serviços
Mesmas regras de negócio espalhadas
Dificuldade em dar manutenção ou aplicar correções
Indica falta de cultura de refatoração
Pergunta sutil:
- “Existe alguma política ou revisão técnica para evitar repetição de código e lógica duplicada?”
- 🚩 3. Variáveis com nomes genéricos ou enganosos
Uso de data, result, thing, item1, temp, flag
Dificulta leitura, onboarding e debugging
Pode indicar cultura de pressa acima de clareza
Dica na entrevista:
- “Vocês usam alguma convenção para nomeação e leitura de código, como ESLint, TypeScript ou code review guiado?”
- 🚩 4. Acoplamento excessivo entre módulos
Componentes que acessam diretamente o estado de outros
Mudança em um arquivo quebra vários outros
Dificulta testes e refatorações
Pergunta estratégica:
- “Como vocês lidam com acoplamento entre componentes ou módulos? Há uso de injeção de dependência, composição, ou design mais modular?”
- 🚩 5. Bugs frequentes e correções reativas
Foco em apagar incêndio, sem atuar nas causas
Bugs recorrentes por falta de testes ou versionamento adequado
Sinal de alerta:
Se a resposta sobre bugs for “normal, a gente arruma depois que o usuário reporta”, é red flag clara.
# 1. What is JavaScript?
JavaScript is a high-level, dynamically typed programming language primarily used for building interactive web applications. It runs in browsers and supports both functional and object-oriented programming paradigms.
JavaScript has primitive types (string, number, bigint, boolean, symbol, undefined, null) and reference types (Objects, Arrays, Functions).
3. What is the difference between let, const, and var?
var: Function-scoped, hoisted, can be re-declared.
let: Block-scoped, hoisted but not initialized.
const: Block-scoped, hoisted but must be assigned at declaration and cannot be reassigned.
4. Explain how == and === differ.
== (Loose equality): Converts types before comparison ("5" == 5 → true).
=== (Strict equality): Does not convert types ("5" === 5 → false).
5. What is a closure?
A closure is a function that retains access to its lexical scope, even when the function is executed outside that scope.
js
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
6. What is hoisting?
Hoisting is JavaScript's behavior of moving function and variable declarations to the top of their scope before execution.
Js
console.log(x); // undefined
var x = 10;
7. Explain the concept of "this" in JavaScript.
Global scope: this refers to window (or global in Node.js).
Object method: this refers to the object.
Constructor function: this refers to the newly created object.
Arrow function: this is inherited from the surrounding scope.
8. What are JavaScript prototypes?
Prototypes enable inheritance in JavaScript. Every object has a __proto__ property pointing to its prototype.
js
function Person(name) {
this.name = name;
}
Person.prototype.sayHello = function () {
console.log(`Hello, ${this.name}!`);
};
9. What is the difference between null and undefined?
null: Explicitly assigned to represent "no value".
undefined: A variable declared but not initialized.
10. How does JavaScript handle asynchronous operations?
JavaScript uses the event loop, callbacks, promises, and async/await for handling async operations.
11. What is a promise?
A promise represents a future value. It can be pending, resolved, or rejected.
js
let promise = new Promise((resolve, reject) => {
setTimeout(() => resolve("Success"), 1000);
});
12. What are async/await functions?
async functions return promises and allow await to pause execution until a promise resolves.
js
async function fetchData() {
let data = await fetch("https://api.example.com");
return data.json();
}
13. Explain event delegation in JavaScript.
Instead of adding event listeners to multiple elements, attach a single listener to a parent and use event bubbling.
js
document.getElementById("parent").addEventListener("click", (event) => {
if (event.target.matches(".child")) {
console.log("Child clicked!");
}
});
14. What are JavaScript modules?
Modules allow code to be split across multiple files using export and import.
js
// module.js
export const name = "Vinicius";
// main.js
import { name } from "./module.js";
15. How can you prevent a function from being called multiple times?
Use throttling or debouncing.
js
function debounce(func, delay) {
let timer;
return function (...args) {
clearTimeout(timer);
timer = setTimeout(() => func(...args), delay);
};
}
16. What is the event loop?
The event loop manages JavaScript's asynchronous behavior, allowing the execution of callbacks from the event queue.
17. What is the difference between apply() and call() methods?
call(): Calls a function with arguments passed individually.
apply(): Calls a function with arguments passed as an array.
js
function greet(name, age) {
console.log(`Hello ${name}, you are ${age}`);
}
greet.call(null, "Alice", 25);
greet.apply(null, ["Bob", 30]);
18. What is bind() method used for?
bind() creates a new function with this bound to a specific object.
js
const obj = { name: "Vinicius" };
function greet() {
console.log(`Hello, ${this.name}`);
}
const boundGreet = greet.bind(obj);
boundGreet(); // Hello, Vinicius
19. What is a JavaScript event loop?
The event loop processes tasks from the callback queue and microtask queue asynchronously.
20. Explain "event bubbling" and "event capturing".
Bubbling: Events propagate up from the target element to the root.
Capturing: Events propagate down from the root to the target.
21. What is the difference between deep copy and shallow copy?
Shallow copy: Copies only references.
Deep copy: Copies nested objects.
js
let obj = { a: { b: 1 } };
let shallow = { ...obj }; // Shallow copy
let deep = JSON.parse(JSON.stringify(obj)); // Deep copy
22. What are generator functions?
Functions that pause execution and yield values.
js
function* generator() {
yield 1;
yield 2;
}
23. What is the new keyword used for?
Creates an instance of an object from a constructor function.
24. How do setTimeout and setInterval work?
setTimeout(): Executes a function after a delay.
setInterval(): Executes a function repeatedly.
25. What is a WeakMap and how is it different from a Map?
WeakMap keys are weakly referenced, meaning they do not prevent garbage collection.
26. What is a Set in JavaScript?
A Set stores unique values.
27. What is Object.create() used for?
Creates an object with a specified prototype.
28. How does JavaScript’s garbage collection work?
JavaScript uses reference counting and mark-and-sweep.
29. What are "decorators" in JavaScript?
A feature (experimental) to modify behavior of classes.
30. Explain the difference between prototype and __proto__.
prototype: Property of constructor functions.
__proto__: Reference to an object's prototype.
Copy js object possibilities
Shallow Copy:
Shallow copying creates a new object and copies only the top-level properties of the original object. If the object has nested objects, those nested objects will be referenced in the new object, not duplicated.
You can use the Object.assign() method or the spread operator (...) to create a shallow copy of an object:
Using Object.assign() or Using the spread operator:
Deep Copy:
Deep copying creates a new object and recursively copies all properties and nested objects. This ensures that the new object is entirely independent of the original object, even if it contains nested objects.
Using JSON.parse() and JSON.stringify() (limited to JSON-safe data):
Using Lodash's cloneDeep() (using the lodash library):
Array.every() and Array.some() are two higher-order array methods in JavaScript that are used to check the elements of an array based on a condition. They both return a Boolean value (true or false) depending on the outcome of the condition.
ENUM
In computer programming, an ENUM (short for enumeration) is a data type that defines a set of named constant values.
In JavaScript, enumerations, commonly referred to as enums, are sets of named values that represent a fixed set of distinct constants.
It allows you to create a custom data type with a limited, predefined set of possible values. ENUMs are particularly useful when you have a fixed and well-defined list of options that a variable can take, making the code more readable, maintainable, and less error-prone.
push, pop
shift, unshift
CSS/SCSS
display: none vs visibility: hidden vs opacity: 0
display: none: When applied to an element, it completely removes the element from the document flow, as if it doesn't exist on the page.
visibility: hidden: When applied to an element, it hides the element but still occupies space in the layout.
opacity: 0: When applied to an element, it makes the element completely transparent.
BEM - is a methodology that helps you to create reusable components and code sharing in front‑end development
To use BEM, you only need to employ BEM’s naming convention.
Independent blocks and CSS selectors make your code reusable and modular.
Mixins in SCSS are reusable blocks of CSS properties and rules that can be included in other style rules, enhancing code modularity and maintainability, while extensions allow classes to inherit styles from another class, promoting code reusability and readability by reducing duplication.
In SCSS, extensions allow classes to inherit styles from another class, promoting code reusability and readability by reducing duplication.
flex 1 dimension
grid 2 dimensions
Typescript
Type Alias (Type) is used to create custom types by combining existing types. It's more flexible and can represent any valid type.
You can create union types, intersection types, and more complex types using type.
Type can represent primitive types, object types, and function types.
Interface is used to define the shape of an object or class. It's mainly focused on object structures.
Static Types: TypeScript introduces static typing, allowing you to declare the types of variables, function parameters, and return values. This helps catch type-related errors at compile-time rather than runtime.
Interfaces: TypeScript allows you to define interfaces, which describe the shape of objects. This is particularly useful for documenting the expected structure of objects and ensuring type consistency.
Enums: TypeScript supports enums, which allow you to define named constants with associated values. This can improve code readability and maintainability.
Union and Intersection Types: TypeScript enables you to create union types (a variable that can be of multiple types) and intersection types (a type that combines multiple types).
Type Aliases: You can create custom type aliases in TypeScript, making it easier to reuse complex type definitions.
Type Assertions: TypeScript provides type assertions to tell the compiler about the type of a value when the compiler might not be able to infer it correctly.
Generics: TypeScript supports generics, allowing you to create reusable functions and classes that can work with different types.
Null and Undefined Handling: TypeScript has stricter null and undefined handling, which can help prevent common runtime errors related to null and undefined values.
Decorators: TypeScript supports decorators, which are used for adding metadata or behavior to classes, methods, or properties. They are commonly used in frameworks like Angular.\
Namespaces: While JavaScript uses global scope, TypeScript provides namespaces that allow you to organize your code into logical groups.
Module System: TypeScript uses a more structured and standardized module system, which makes it easier to organize and manage code across files.
Optional and Default Parameters: TypeScript lets you specify optional and default parameters for functions, enhancing the function's flexibility and usability.
Readonly Properties: TypeScript allows you to mark object properties as readonly, preventing them from being modified after object creation.
Type Inference: TypeScript's type inference analyzes your code and infers types where they're not explicitly provided, reducing the need for explicit type annotations in every case.
[
"Static Types",
"Interfaces",
"Enums",
"Union and Intersection Types",
"Type Aliases",
"Type Assertions",
"Generics",
"Null and Undefined Handling",
"Decorators",
"Namespaces",
"Module System",
"Optional and Default Parameters",
"Readonly Properties",
"Type Inference",
"Enhanced Code Quality"
]

ts partial
React
Estados do react
state lifting = up
state colocation = down
memo for components
usememo for variables
useCallback for functions
useLayoutEffect in case the update makes an observable change to the dom
decorators TS
difference from CI/CD
memoise, callback
batman to {batman}
memoise, callback
let oldParams = null;
let lastResult = null;
function memoize(fn) {
return function(...args) {
console.log(`args:`, ...args);
console.log(`oldParams:`, oldParams);
// Convert args to an object
const currentParams = { ...args };
// Compare oldParams with the currentParams by converting them to JSON strings
if (JSON.stringify(oldParams) === JSON.stringify(currentParams)) {
return lastResult;
}
// If not the same, compute the result and update oldParams and lastResult
const result = fn(...args);
oldParams = currentParams; // Save the old parameters
lastResult = result;
return result;
};
}
// Example usage
const slowFunction = (a, b, c) => a + b + c;
const memoizedSlowFunction = memoize(slowFunction);
https://dev.to/mursalfk/most-frequently-asked-front-end-interview-questions-19n0
console.log(memoizedSlowFunction(1, 2, 3)); // Computed result: 6
console.log(memoizedSlowFunction(1, 2, 3)); // Cached result: 6
console.log(memoizedSlowFunction(4, 5, 6)); // Computed result: 15
console.log(memoizedSlowFunction(4, 5, 6)); // Cached result: 15
batman to {batman}
function charCount(str) {
return str.split('').reduce((charMap, char) => {
charMap[char] = (charMap[char] || 0) + 1;
return charMap;
}, {});
}
const result = charCount('batman');
console.log(result); // Output: { b: 1, a: 2, t: 1, m: 1, n: 1
React with Webpack, Babel, React Router, Redux, Jest, React Testing Library, Material UI, etc.
React lifecycle
Mounting, Updating, and Unmounting, Error Handling.
Class Component Lifecycle Methods:
Mounting Phase:
constructor(): This is the first method called when an instance of a component is created.
render(): This method is responsible for rendering the component's JSX onto the screen.
componentDidMount(): This is called after the component has been rendered to the screen. It's often used to perform tasks that require DOM access, like API calls or adding event listeners.
Updating Phase:
shouldComponentUpdate(nextProps, nextState): This method is used to determine if the component should re-render when its props or state change. It can be used to optimize performance by preventing unnecessary re-renders.
render(): As in the mounting phase, this method re-renders the component's JSX.
componentDidUpdate(prevProps, prevState): This is called after the component has been updated and re-rendered. It's commonly used to perform side effects based on changes in props or state.
Unmounting Phase:
componentWillUnmount(): This method is called right before a component is removed from the DOM. It's often used to clean up resources like event listeners to prevent memory leaks.
Hooks (Functional Components):
With the introduction of hooks in React, functional components gained similar capabilities without the need for class components. Some commonly used hooks include:
useState: Allows functional components to manage state.
useEffect: Combines functionality of various class component lifecycle methods (componentDidMount, componentDidUpdate, and componentWillUnmount) for handling side effects and component updates.
useContext: Lets you access the context of the nearest ancestor that provides it.
useReducer: An alternative to useState for managing more complex state logic.
useMemo and useCallback: Used to optimize performance by memoizing values and functions to prevent unnecessary recalculations.
useRef: Provides a way to access and manipulate the DOM directly.
What is the difference between constructor and getInitialState?
zustand, mobx
React Performance
react memo
lazy loading
react virtualized
useMemo
code splitting
suspense
debouncing
CDN
SSR
TypeScript - Abstract class definition
1 - Which of the following options is true regarding abstract classes?
TRUE = They can only be extended
They can only be instantiated
They can be both extended and instantiated
They cannot be extended or instantiated
2 - JavaScript - Find the largest number
3 - TypeScript - Temperatures (tutorial)
4 - Vue - Lifecycle hooks - Which lifecycle function is first called when a Vue app is loaded in the DOM?
beforeCreate
sendgrid
update node, redux to redux toolkit
webpack, virtual dom, shadow dow
http1, http2
webpack, vite, code splittting, SplitChunks
Micro-FEs: break uis in smaller pieces(route level), used to break down monolithic pages, can be done with monorepo with build time dependencies or module federation with run time dependencies.
Payment platforms
custom hook
JS typesystem
primitive = 7 and non primitive all 10 objects
Event-ticketing platforms
type safety
uicolors.app
taillscan
hypercolor
hover.dev
tailwind + pretier
daisyui
33js concepts github
closure - function that access variables outside its scope
useMemo example - fibonaci
spread vs rest operator
turn on vscode sync
array .at
immutability with const, freeze and deepfreeze
palindrome challenge
deep(structured clone) vs shallow copy(spread operator)
9
arrow functions(are scoped, have input return) vs functions(are hoisted)
vscode transparency
css clamp
Context api > prop drilling
Principles: DRY Don't repeat yourself, KISS Keep it simple, stupid
Hooks vs mixins
Optimistic UI, like buttons
Theme Context
Vue.js
How to create a vue instance:
To create a Vue instance, you first need to include the Vue.js library in your HTML file. You can do this by including a link to the Vue.js CDN or by downloading the Vue.js library and including it in your project.
Once you have included the Vue.js library, you can create a new Vue instance using the following syntax:
javascript
Copy code
var vm = new Vue({
// options object
})
mixins = vue2
extens = vue3
Vue lifecycles
Vue2 Creation, Updating, Destroying
Vue 3 Creation(beforeCreate, created, beforeMount, mounted), Updating(beforeUpdate, updated), Unmounting(beforeUnmount, unmounted), ErrorHandling(errorCaptured), CompositionAPI, Teleport(v2 portal imported lib vs teleport native)
Rule No.1: Never Use Non-trusted Templates
We should always sanitize user input values on the server. Do sanitize with Vue only for necessary cases (e.g markdown preview).
Backend Coordination
HTTP security vulnerabilities, such as cross-site request forgery (CSRF/XSRF) and cross-site script inclusion (XSSI), are primarily addressed on the backend, so aren’t a concern of Vue’s. However, it’s still a good idea to communicate with your backend team to learn how to best interact with their API, e.g. by submitting CSRF tokens with form submissions.
Architecture patterns
Model-View-Controller (MVC) Pattern
Microservices Architecture
Event-Driven Architecture
Layered Architecture
Service-Oriented Architecture (SOA)
Domain-Driven Design (DDD)
Hexagonal Architecture (Ports and Adapters)
Clean Architecture
Reactive Architecture
Serverless Architecture
Optimistic Architecture - use optimistic
- sample applications
MACH architecture
Microservices, API-first, Cloud-Native SaaS, Headless
cms contentful
azure service bus, redis cache, azure functions, containers, blob storage
built headless
single GET
relewise, cookie, gtm, videoly
React and Next.js most closely follow the **MVVM (Model-View-ViewModel)** and **MVI (Model-View-Intent)** patterns — depending on how you structure your app.
### 🔹 React (especially with hooks/state management libraries):
**MVVM**
* `View`: Your React components (JSX/UI)
* `ViewModel`: Hooks, context, Zustand, Redux (managing state, logic)
* `Model`: Backend APIs or local storage/data sources
React uses **data binding** (one-way in most cases) and **observable state** (e.g., `useState`, `useEffect`, etc.), which aligns with MVVM’s philosophy: the ViewModel manages state, the View reflects it.
### 🔹 React + libraries like Redux, Zustand, or RxJS:
**MVI (Model-View-Intent)**
* With libraries like **Redux** (actions = intents, reducers = state producers), this pattern becomes more apparent.
* You dispatch an "intent" (action), update the model (state), and the view updates accordingly.
### 🔹 Next.js:
Next.js builds on React, so it follows **MVVM/MVI** too — but adds routing, SSR/SSG (server-side rendering/static site generation), which is **not part of any one pattern**, but:
* Server components and API routes often serve as **Model** (data source)
* Pages/components are **View**
* Client state (via context, hooks, or a store) acts as **ViewModel**
### ✅ Summary:
| Framework     | Most Aligned Pattern                   |
| ------------- | -------------------------------------- |
| React         | MVVM / MVI                             |
| React + Redux | MVI                                    |
| Next.js       | MVVM + MVI (with routing + SSR on top) |

Soap vs rest

Design patterns
Façade Pattern = Creates a simplified interface for interacting with complex components or libraries, encapsulating their complexities.
Singleton Pattern = Ensures a class has only one instance while providing a global point of access to that instance.
Factory Pattern = Defines an interface for creating objects but lets subclasses alter the type of objects that will be created.
Adapter Pattern = Allows the interface of an existing class to be used as another interface.
Observer Pattern = Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.
Strategy Pattern = Defines a family of algorithms, encapsulates each one, and makes them interchangeable.
Decorator Pattern = Attaches additional responsibilities to an object dynamically, providing a flexible alternative to subclassing for extending functionality.
Command Pattern = Encapsulates a request as an object, thereby allowing for parameterization of clients with queues, requests, and operations.
Template Method Pattern = Defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps of the algorithm without changing its structure.
Builder Pattern = Separates the construction of a complex object from its representation, allowing the same construction process to create various representations.
SEO
First Contentful Paint (FCP): FCP measures how quickly the first piece of content is rendered on the page. A fast FCP ensures that users see something meaningful as soon as possible, improving user experience and SEO.
Largest Contentful Paint (LCP): LCP measures the loading time of the largest content element (e.g., an image or text block). It reflects the perceived loading speed and should be optimized for a better user experience.
Time to Interactive (TTI): TTI evaluates when a page becomes interactive, meaning users can interact with page elements. A fast TTI ensures a responsive website.
Total Blocking Time (TBT): TBT measures the amount of time during which the main thread is blocked and unresponsive to user input. Reducing TBT leads to smoother interactions.
Cumulative Layout Shift (CLS): CLS assesses the visual stability of a page by measuring layout shifts during page load. A low CLS score indicates a more stable user experience.
Suggestions for a candidate
- Study about CRP: https://developer.mozilla.org/en-US/docs/Web/Performance/Critical_rendering_path
- How browser works: https://www.youtube.com/watch?v=0IsQqJ7pwhw
- Typescript decorators: https://www.typescriptlang.org/docs/handbook/decorators.html
- Scrum vs kanban: https://resources.scrumalliance.org/Article/scrum-vs-kanban
- Web Vitals:
GraphQL
Como limitar requisições graphql, batch interval and cache
DEV ENV Ubuntu

restart ts server
git checkout -b myFeature dev

if git pull dont work:
git rebase origin/fix/example-branch

Install NMV and Node


$ curl -o- | bash
$ nvm install lts/hydrogen

Create React App
$ npx create-react-app cra-test

To install all dependencies from create-react-app
$ npm run eject







vscode extensoes:
eslint,
gitlens,
postcss language support,
tailwind css intellisense,
prisma
example VS Code settings file
ssh and ubuntu
passphrase = use a password manager
vscode sort = control+P e >
feat: A new feature or functionality added to the project.
fix: A bug fix or correction to the code.
chore: Routine tasks, maintenance, and other non-feature/non-bug-related changes.
docs: Documentation changes or additions.
style: Code style or formatting changes (e.g., whitespace, formatting).
refactor: Code refactoring without adding new features or fixing bugs.
test: Adding or modifying tests (e.g., unit tests, integration tests).
perf: Performance-related changes or optimizations.
build: Changes related to the build system, dependencies, or project configurations.
ci: Changes to the continuous integration pipeline and scripts.
revert: A commit that reverts a previous commit.
wip: Work in progress (often used to indicate that the commit is incomplete and should not be merged).
kafka vs rabbitMQ
karma focus on event streaming and long term data retention
optimized for high throughput
rabbitMQ
designed for message  queuing  and point to point communication
message handling is more transactional prioritizing reliability over speed
Zookeeper - central management for kafka brokers
standards to enforce
checklist no MR
component and type with same Name when migrating to named exports
multiple cast types "as" because its defined wrong
solution prefer named exports
# 1. Create new lint rules to enforce best practices around code (custom eslint, stylelint rules, clean code by Robert C. Martin)
3. Do usability reviews in depth (Dont make me think - Steve Krug)
4. Talk and debate with members of the product team by understanding the basics of the product (JTBD framework, Mom Test)
5. Use unit tests and end-to-end tests to make work seamless (cypress, playwright, GitHub actions, Continuous delivery)
radix e shadcn
react query
react hook forms
shadcn -> radix -> atom
shadcn = atom
Priority
Here is how we are setting priority of tickets:
P1 - Showstopper
P2 - High Business Value -  We need to complete before we go live
P3 - can be completed right after go-live - Fast Follow
P4 - under consideration and not critical.
Everyday Command Line Cheat Sheet
git commit --amend -m
exit vim press esc and :wq
npm outdated
git config --global user.name
git config --global user.email
git config --list
git config
git config user.email
git config commit.gpgsign false

export GPG_TTY=$(tty)
latexindent cv.tex -w
npx npm-check-updates -u
sudo visudo
find . -name "*:Zone.Identifier" -type f -delete = wsl2 zone identifier
ask MR agent
/ask "do a full files walkthrough"
to find error in pipeline, search FAIL
*.next/, */node_modules, */coverage, */storybook-static,
husky : git commit --no-verify

Testes e Qualidade de Código
DevOps, Build e Performance
Desafios Técnicos Práticos
Challenges
count symbols appearance in a string
Fazer scroll lazy loading ao vivo
Fazer função c 2 parâmetros e também parametros concatenados
extreme programing
react compiler reduzir memos
unpkg react-scan
pub/sub em live coding TS, callback subscribe unsubscribe mensageria



Nested-object transformation exercise
sincronous and asyncrous
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
//expected result below
/* {
a: {
b: {
c: {
d: {
e: 2,
}
}
}
}
} */

LeetCode
slide window, dfs, big o notation, recursividade, resolver recursividade com stack ou queue
inverta a string leet code
pedir exemplos - assert

Technical leadership notes
Tecnico, Lider, Comunicador
Marty Cagan, product trio:
Product manager - business viability risk, value risk
Product designer - usability risk
Lead Engineer - feasonability risk
Responsabilidades:
Planejamento
Estimatica de esforco
Alinhamento com objetivo de negocio
Gerenciamento de riscos
Gestao de equipe
Mentoria
Distribuicao de tarefas
Motivacao da equipe
Orientacao tecnica
Decisoes de arquitetura
Revisao de codigo
Resolucao de problemas complexos

Como evoluir
Tornarse referencia tecnica local
Mentorar colega junior
Entregar mini rfcs que conectam codigo a valor de negocio
Pedir feedback 360 trimestral
Delegacao real e criacao de sucessor
Falar lingua do Produto e lideranca = impacto
Metricas de engenharia, lead time, mttr, ttm
Visibilidade externa, talks, open souce, whitepapers
Primeiros 30 dias lider/manager
Descobrir (0‑30 dias)

Conduzir 1‑1s estruturados com devs, PM, Design, QA

Shadowing de incidentes nas 2 primeiras semanas

Mapear arquitetura (Context + Container)

Levantar baseline das métricas

Criar doc de experimentos pendentes
Organizar (31‑60 dias)

Implantar ritual de PR com SLA 24 h

Publicar primeiro ADR / RFC

Estabelecer on‑call rotativo & runbook

Criar dashboard de engenharia visível ao time
Impactar (61‑90 dias)

Selecionar e atacar quick‑win de dívida técnica

Realizar workshop de OKR e fixar metas

Entregar quick‑win em produção e medir impacto

Iniciar coaching do sucessor e delegar