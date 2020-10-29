# url-reducer

Keep part of your redux store in the url.

`url-reducer` exposes a higher order function that keeps a reducer's state in the url's query params.

## Example

For example, a reducer in `url.js`:

```
import urlReducer from "url-reducer";

const initialState = {
  counter: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        counter: state.counter + 1,
      };

    case "DECREMENT":
      return {
        ...state,
        counter: state.counter - 1,
      };

    default:
      return state;
  }
};

const options = {
  sanitize: {
    counter: parseInt,
  },

  validate: {
    counter: isFinite,
  },
};

export default urlReducer(reducer, options);

```

## API

`urlReducer(reducer, options?, history?)`

* `reducer`: a regular redux reducer

* `options` (optional): an options object containing:

  * `sanitizeConfig` (optional): an object with keys being state keys, and values being sanitize functions.
  * `validateConfig` (optional): an object with keys being state keys, and values being validation functions. Those keys whose validation fails (i.e. returns false), are omitted from the state.
  
* `history` (optional): a history object. For example if you're using react-router, you can use the same history.
