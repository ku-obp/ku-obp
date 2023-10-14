import { useState } from "react";

// 제네릭
export const useInput = (validate: any) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validate(value);
  const hasError = !isValid && isTouched;

  const changeHandler = (event: any) => {
    setValue(event.target.value);
  };
  const blurHandler = (event: any) => {
    setIsTouched(value.length > 0);
  };
  const reset = () => {
    setValue("");
    setIsTouched(false);
  };

  return {
    value,
    isValid,
    hasError,
    changeHandler,
    blurHandler,
    reset,
  };
};
