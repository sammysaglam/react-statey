# react-statey

Yet another tiny & simple global state-manager. Less than 1 KB (minified).

No redux, no context, no verbose boilerplates. TypeScript support.

## Demo

[Click here for Demo](https://codesandbox.io/s/summer-cdn-3w9r6?file=/src/App.js)

## Usage example

```bash
npm i react-statey
```

```js
import { createState } from 'react-statey';

// this creates a global state hook, and can be used globally throughout the app
const useCounterState = createState(0);

const YourComponentA = () => {
  const [counter, setCounter] = useCounterState();

  return (
    <button onClick={() => setCounter(counter + 1)}>
      Value is {counter}
    </button>
  );
};

const YourComponentB = () => {
  const [counter, setCounter] = useCounterState();

  return (
    <button onClick={() => setCounter(counter + 1)}>
      Value is {counter}
    </button>
  );
};
```

## License

react-statey is MIT licensed.
