# 2. JavaScript and React Technical Questions

This file contains a collection of technical questions focused on JavaScript, React, and logical reasoning. It includes commented examples, expected outputs, and practical interview tests.

---

## 🧠 Variable Behavior

### ❓ Hoisting with `var` e `const`

```js
function test() {
  console.log(id); // undefined -> var is hoisted but uninitialized
  console.log(i2); // ReferenceError because i2 is not hoisted like var
  var id = 1;
  const i2 = 2;
}
```

**Expected output:**

```txt
undefined
ReferenceError: Cannot access 'i2' before initialization
```

---

### ❓ Objects with `const`

```js
function test() {
  const user = {name:'John Doe'};
  user.name = 'Not John Doe';
  console.log(user.name); // "Not John Doe"
}
```

**Expected output:**

```txt
Not John Doe
```

---

### ❓ Block scope with `let`

```js
function test() {
  if(true) {
    let myName = 'Vini';
  }
  console.log(myName); // ReferenceError because myName is block-scoped inside if.
}
```

**Expected output:**

```txt
ReferenceError: myName is not defined
```

---

### ❓ Hoisting of functions and expressions

```js
function test() {
  sayHello(); // "Hello"
  sayBy();    // TypeError: sayBy is not a function

  const sayBy = () => {
    console.log("Bye");
  }

  function sayHello() {
    console.log("Hello");
  }
}
```

**Expected output:**

```txt
Hello
TypeError: sayBy is not a function
```

---

### ❓ Arrow functions are not constructors

```js
function test() {
  const HumanConstructor = (age, name) => {
    return { age, name };
  };

  const JohnDoe = new HumanConstructor(30, 'John Doe'); // TypeError
  console.log(JohnDoe);
}
```

**Expected output:**

```txt
TypeError: HumanConstructor is not a constructor
```

---

### ❓ `this` in Arrow Functions vs Functions

```js
function test() {
  const User = {
    id: 1,
    getId: () => console.log(this.id),
    getMyId() {
      console.log(this.id);
    },
    getThatId: function() {
      console.log(this.id);
    },
    giveMeId: function() {
      return () => console.log(this.id);
    }
  };

  User.getId();       // undefined
  User.getMyId();     // 1
  User.getThatId();   // 1
  User.giveMeId()();  // 1
}
```

**Expected output:**

```txt
undefined
1
1
1
```

---

## 🕰️ Asynchronous: Promise vs setTimeout

```js
function asyncTest() {
  console.log("Steady");

  setTimeout(() => {
    console.log("Timeout");
  }, 0);

  Promise.resolve()
    .then(() => {
      console.log("Promise 1");
      setTimeout(() => console.log("Almost done"));
    })
    .then(() => {
      console.log("Promise 2");
      Promise.resolve(true).then(() => {
        console.log("Finally");
      });
    });

  console.log("Go");
}
```

**Expected output:**

```txt
Steady
Go
Promise 1
Promise 2
Finally
Timeout
Almost done
```

🟡 Note: The order between `Timeout` and `Almost done` **may vary** depending on the environment, as both are within `setTimeout`.

---

## 🧪 Logger Example with Class and Object

```js
class Logger {
  log(message) {
    console.log(message);
  }

  saveLog() {
    console.log("Saving log...");
  }
}

const loggerObject = {
  log(message) {
    console.log(message);
  },
  saveLog() {
    console.log("Saving log...");
  }
};

function logMessageWithLogger(logger) {
  logger.log("Test log"); // Should not throw an error
}
```

---

## ⚛️ React: Common Errors

### ❌ `props` is undefined

```js
const HelloComponent = ({ greeting }) => {
  return <div>{greeting}</div>;
};

console.log(HelloComponent()); // call without props
```

**Expected output:**

```txt
TypeError: Cannot read properties of undefined (reading 'greeting')
```

---

### ❌ Hook not defined

```js
const UserProfile = () => {
  const userContext = useContext(...); // ReferenceError
  console.log("Profile render");
  return <div> ... </div>;
};
```

**Expected output:**

```txt
ReferenceError: useContext is not defined
```

---

## 🧑‍💻 Practical Exercise: Tabs by City

**Requirements:**

- List with duplicate cities and non-unique names
- Clicking a tab (city) should show users from that city

```jsx
import { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const citiesData = [
    { cityName: 'Rio De Janeiro', userName: 'Diego Morrales' },
    { cityName: 'Orlando', userName: 'Elon MAsk' },
    { cityName: 'Orlando', userName: 'Bill Gates' },
    { cityName: 'Washington', userName: 'John Jhones' },
  ];

  const uniqueCities = [...new Set(citiesData.map(c => c.cityName))];

  const handlerCity = (param) => () => setCity(param);

  const names = citiesData.filter(c => c.cityName === city);

  return (
    <>
      {uniqueCities.map(cityName => (
        <button key={cityName} onClick={handlerCity(cityName)}>
          {cityName}
        </button>
      ))}

      {names.map((n, idx) => (
        <p key={idx}>{n.userName}</p>
      ))}
    </>
  );
}

export default App;
```

---

## 🧪 Another Test with State and Colors

```jsx
import React, { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("red");
  const [squareCount, setSquareCount] = useState([1]);

  const handleClick = () => {
    setCount(c => c + 1);
    setColor(count % 2 ? "blue" : "red");
    if (count === 10) {
      setSquareCount(c => [...c, c.length * 2]);
    }
  };

  return (
    <div>
      <button className="btn" onClick={handleClick}>⚛️ {count}</button>
      {squareCount.map((_, idx) => (
        <div key={idx} style={{ backgroundColor: color, height: "50px", width: "50px" }} />
      ))}
    </div>
  );
};

export default App;
```

---

## 🎠 Carousel Component

```jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Carousel = () => {
  const items = ["Item 1", "Item 2", "Item 3"];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Card className="w-64 h-32 flex items-center justify-center text-lg">
        <CardContent className="text-center">{items[currentIndex]}</CardContent>
      </Card>
      <div className="flex space-x-4">
        <Button onClick={handlePrev}>← Back</Button>
        <Button onClick={handleNext}>Next →</Button>
      </div>
    </div>
  );
};

export default Carousel;
```

# React Interview: Advanced Conceptual Questions

---

## 📦 Prop Drilling and Component Composition

You have a component structure where the Parent component needs to pass data down to the Grandchild.

```jsx
function Grandchild({ data }) {
  return <div>Data: {data}</div>;
}

function Child({ data }) {
  return <Grandchild data={data} />;
}

function Parent() {
  const data = "Hello from Parent";
  return <Child data={data} />;
}
```

### 🧠 Question Set 1

- **1.** What is the issue with "prop drilling" in this example, and why is it considered a problem?
- **2.** How would you use React Context to avoid prop drilling in this scenario?
- **3.** What are the potential downsides of using Context in cases like this?

---
## 🚀 Optimizing Re-Renders with React.memo and useCallback

You are optimizing a component to avoid unnecessary re-renders.

```jsx
import React, { useState } from 'react';

function Child({ count, onIncrement }) {
  console.log('Child component rendered');
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={onIncrement}>Increment</button>
    </div>
  );
}

export default React.memo(Child);

function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type something..." />
      <Child count={count} onIncrement={handleIncrement} />
    </div>
  );
}
```

### 🧠 Question Set 2

- **1.** Explain how React.memo is used in this code to optimize re-renders. Why is this optimization necessary here?
- **2.** Is there a problem in the Child or Parent component?
- **3.** What are potential downsides of using React.memo and useCallback? When should you avoid these optimizations?

---
## ⏱️ Countdown Timer with Render Props

A countdown timer component uses the render props pattern to define how the countdown is displayed.

```tsx
interface ICountdownProps {
  initialCount: number;
  render: (count: number) => JSX.Element;
}

function Countdown({ initialCount, render }: ICountdownProps) {
  const [count, setCount] = React.useState(initialCount);

  React.useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return render(count);
}

function Parent() {
  return (
    <Countdown
      initialCount={5}
      render={(count) => <div>{`Time left: ${count}`}</div>}
    />
  );
}
```

### 🧠 Question Set 3

- **1.** Why is the render props pattern necessary in this example?
- **2.** How does it improve reusability or flexibility compared to hardcoding the rendering logic inside the Countdown component?
- **3.** What are the potential drawbacks of using the render props pattern in React? Are there better alternatives in modern React?

---
## 🌐 Asynchronous Request Handling in Hooks

A component fetches data from an API using `useEffect`.

```jsx
import { useEffect, useState } from 'react';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('https://example.com/api/posts');
      const data = await response.json();
      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

### 🧠 Question Set 4

- **1.** What problems could arise if the component unmounts while the fetch request is still in progress?
- **2.** How can you modify this code to prevent potential problems?

---
## ⚙️ Using TypeScript Generics in a Custom Hook

A reusable and type-safe custom hook using TypeScript generics.

```tsx
import { useState, useEffect } from 'react';

function useFetchData<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then((result: T) => {
        setData(result);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}
```

### 🧠 Question Set 5

- **1.** What are the issues with using `any` as the type for data in this hook?
- **2.** How does using a generic `<T>` improve this hook?

---
## 🎂 Debugging a Custom Hook (useFetchCakes.ts)

You need to fetch cakes and filter by ingredient.

```tsx
import { useEffect } from 'react';

export function useFetchCakes(ingredient) {
  let cakes = [];
  let responseCode = 200;

  useEffect(() => {
    fetch('https://example.com/api/cakes')
      .then((res) => {
        responseCode = res.status;
        return res.json();
      })
      .then((data) => {
        cakes = data.filter((cake) => {
          return cake.ingredients.includes(ingredient);
        });
      });
  }, [ingredient]);

  return { cakes, responseCode };
}
```

### 🧠 Question Set 6

- **1.**  Why would a front-end engineer use a custom hook?
- **2.**  Identify critical bugs in this code that prevent it from working.
- **3.**  Identify non-critical areas for improvement.
