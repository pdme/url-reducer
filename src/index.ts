import { compose, AnyAction, Reducer } from "redux";
import { parse, stringify } from "qs";
import { evolve } from "ramda";
import { createBrowserHistory, History } from "history";
import { validator } from "./utils";

export interface UrlReducerOptions {
  sanitize?: {
    [key: string]: (value: any) => any;
  };

  validate?: {
    [key: string]: (value: any) => boolean;
  };
}

const defaultHistory = createBrowserHistory();

const urlReducer = function <T>(
  reducer: Reducer,
  {
    sanitize: sanitizeConfig = {},
    validate: validateConfig = {},
  }: UrlReducerOptions = {},
  history: History = defaultHistory
): Reducer<T> {
  return (prevState: T | undefined, action: AnyAction) => {
    const urlState = parse(history.location.search, {
      ignoreQueryPrefix: true,
    });

    const defaults = reducer(undefined, { type: "@@DUMMY_ACTION_URL_REDUCER" }); // type necessary?

    const rawState = { ...defaults, ...prevState, ...urlState };

    const sanitize = evolve(sanitizeConfig);

    const validate = validator(validateConfig);

    const parseRawState = compose(validate, sanitize);

    const state = parseRawState(rawState);

    const nextState = reducer(state, action);

    if (!Object.is(state, nextState)) {
      const nextSearch = stringify(nextState);

      history.push({ search: `?${nextSearch}` });
    }

    return nextState;
  };
};

export default urlReducer;
