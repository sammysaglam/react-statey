# react-statey

Yet another tiny & simple global state-manager. Less than 1 KB (minified).

No redux, no context, no verbose boilerplates. TypeScript support.

## Usage example

```bash
npm i react-statey
```

```js
import { createState, useStateyState } from 'react-statey';

const counterState = createState(0);

const YourComponent = () => {
  const [counter, setCounter] = useStateyState(counterState);

  return (
    <button onClick={() => setCounter(counter + 1)}>
      Value is {counter}
    </button>
  );
};
```

## License

react-statey is MIT licensed.
