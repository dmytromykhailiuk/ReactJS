import { useState, useCallback } from "react";

export function useInputValue(message: string) {
  const [value, changeValue] = useState(message);

  const onChangeValue = useCallback((event) => {
    changeValue(event.target.value);
  }, []);

  return {
    value,
    onChangeValue,
  };
}
