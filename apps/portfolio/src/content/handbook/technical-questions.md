# JavaScript and React Technical Questions

This file contains a collection of technical questions focused on JavaScript, React, and logical reasoning. It includes commented examples, expected outputs, and practical interview tests.

---

## 🧠 Variable Declaration

### 1. Objects with `const`

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

### 2. Block scope with `let`

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

## 🧠 Variable Behavior

### 3. Hoisting with `var` e `const`

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

### 4. Hoisting of functions and expressions

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

### 5. Arrow functions are not constructors

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

### 6. `this` in Arrow Functions vs Functions

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

### 7. `props` is undefined

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

### 8. Hook not defined

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

### 9. 🕰️ Asynchronous: Promise vs setTimeout

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

### 10. 🧪 Logger Example with Class and Object

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

**Expected output:**

```txt
Test log
```

---

### 11. 🧑‍💻 Tabs by City

Create a React component called TabsByCity that displays a list of cities as tabs (buttons). When a user clicks on a city, it should show the names of users associated with that city.

**Requirements:**

- List with duplicate cities and non-unique names
- Clicking a tab (city) should show users from that city

**Initial code (incomplete):**

```jsx
import { useState } from "react";

const TabsByCity = () => {
  const [city, setCity] = useState('');
  const citiesData = [
  { cityName: 'Rio de Janeiro', userName: 'Pelé' },
  { cityName: 'Orlando', userName: 'Elon Musk' },
  { cityName: 'Orlando', userName: 'Walt Disney' },
  { cityName: 'Washington', userName: 'Barack Obama' },
];

  return (
    <>
      <div>
        {/* TODO: Render one button per unique city, call setCity on click */}
      </div>
      <div>
        {/* TODO: Show userName entries that match the selected city */}
      </div>
    </>
  );
};

export default TabsByCity;
```

**Expected output:**

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

### 12. 🧪 Color Toggle and Square Spawner on Count

**Prompt:**

Create a React component with a button that increases a counter on click. Each click toggles the square's background color between red and blue. When the counter reaches 10, a second square should appear.

**Requirements:**

- Toggle square color on each click  
- Add another square when the count reaches 10

---

**Initial code (incomplete):**

```jsx
import React, { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("red");
  const [squareCount, setSquareCount] = useState([1]);

  const handleClick = () => {
    // TODO: Increase count
    // TODO: Toggle color
    // TODO: Add square when count is 10
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

**Expected output:**

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

### 13. 🎠 Carousel Component

**Prompt:**

Create a simple carousel component using React that cycles through a list of items. Use "Next" and "Back" buttons to move between items.

**Requirements:**

- Display a single item at a time inside a card
- Implement circular navigation (loop back to start/end)
- Add "Back" and "Next" buttons for navigation

---

**Initial code (incomplete):**

```jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Carousel = () => {
  const items = ["Item 1", "Item 2", "Item 3"];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    // TODO: go to next item, wrap around
  };

  const handlePrev = () => {
    // TODO: go to previous item, wrap around
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

---

**Expected output:**

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

---

### 14. Prop Drilling and Component Composition

You're given a component tree where a `Parent` passes data to a `Grandchild` through a `Child` component.

```jsx
function Grandchild(props) {
  return <div>Data: {props.data}</div>;
}

function Child(props) {
  return <Grandchild data={props.data} />;
}

function Parent() {
  const data = "Hello from Parent";
  return <Child data={data} />;
}
```

---

#### ❓ Questions

1. What is the issue with "prop drilling" in this example, and why is it considered a problem?
2. How would you use React Context to avoid prop drilling in this scenario?
3. What are the potential downsides of using Context in cases like this?

---

### ✅ Answers

**1. What is the issue with "prop drilling" in this example, and why is it considered a problem?**  
Prop drilling refers to the process of passing data from a top-level component down to deeply nested child components through intermediate components that do not use the data themselves.  
In this example, the `Parent` passes `data` to `Child`, which in turn passes it to `Grandchild`.  
The issue here is that if the component tree becomes deeply nested or the structure changes frequently, it becomes hard to maintain and reason about, leading to tightly coupled components and unnecessary prop-passing.

---

**2. How would you use React Context to avoid prop drilling in this scenario?**  
React Context allows you to share values across the component tree without having to pass props manually at every level. Here's how you could apply it:

```jsx
import React, { createContext, useContext } from 'react';

const DataContext = createContext();

function Grandchild() {
  const data = useContext(DataContext);
  return <div>Data: {data}</div>;
}

function Child() {
  return <Grandchild />;
}

function Parent() {
  const data = "Hello from Parent";
  return (
    <DataContext.Provider value={data}>
      <Child />
    </DataContext.Provider>
  );
}
```

---

**3. What are the potential downsides of using Context in cases like this?**  
While Context simplifies prop-passing, especially in large trees, it comes with trade-offs:

- **Re-rendering:** Any change to the context value will re-render all components that consume it, which might hurt performance if not managed carefully.
- **Coupling:** Components become tightly coupled to the context, making them harder to reuse in different parts of the app.
- **Overuse:** It may be overkill for small or isolated cases, where simply passing a prop is easier and more readable.
- **Testing:** Testing components that consume context often requires wrapping them with providers, which adds boilerplate.

You're given a component tree where a `Parent` passes data to a `Grandchild` through a `Child` component.

```jsx
function Grandchild(props) {
  return <div>Data: {props.data}</div>;
}

function Child(props) {
  return <Grandchild data={props.data} />;
}

function Parent() {
  const data = "Hello from Parent";
  return <Child data={data} />;
}
```

### 15. 🚀 Optimizing Re-Renders with React.memo and useCallback

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

- **1.** Explain how React.memo is used in this code to optimize re-renders. Why is this optimization necessary here?
- **2.** Is there a problem in the Child or Parent component?
- **3.** What are potential downsides of using React.memo and useCallback? When should you avoid these optimizations?

---

### 16. ⏱️ Countdown Timer with Render Props

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

- **1.** Why is the render props pattern necessary in this example?
- **2.** How does it improve reusability or flexibility compared to hardcoding the rendering logic inside the Countdown component?
- **3.** What are the potential drawbacks of using the render props pattern in React? Are there better alternatives in modern React?

---

### 17. 🌐 Asynchronous Request Handling in Hooks

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

- **1.** What problems could arise if the component unmounts while the fetch request is still in progress?
- **2.** How can you modify this code to prevent potential problems?

---

### 18. ⚙️ Using TypeScript Generics in a Custom Hook

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

- **1.** What are the issues with using `any` as the type for data in this hook?
- **2.** How does using a generic `<T>` improve this hook?

---

### 19. 🎂 Debugging a Custom Hook (useFetchCakes.ts)

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

- **1.**  Why would a front-end engineer use a custom hook?
- **2.**  Identify critical bugs in this code that prevent it from working.
- **3.**  Identify non-critical areas for improvement.
