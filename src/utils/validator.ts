import { T } from "ramda";

const validator = (validateConfig: {
  [key: string]: (value: any) => boolean;
}) => (obj: { [key: string]: any }) =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    const validator = validateConfig[key] || T;

    if (typeof validator !== "function") {
      // log error message
      throw new Error(`Validator is not a function on key ${key}`);
    }

    const isValid = validator(value);

    return isValid ? { ...acc, [key]: value } : acc; // on dev show message that key has been omitted
  }, {});

export default validator;
