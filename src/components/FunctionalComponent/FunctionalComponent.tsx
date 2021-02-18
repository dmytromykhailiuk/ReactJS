import React from "react";
import { useInputValue } from "../../hooks";

interface FunctionalComponentProps {
  message: string;
  color?: string;
}

const FunctionalComponent: React.FC<FunctionalComponentProps> = ({
  message,
  color: initColor = "#000000"
}) => {
  console.log("FunctionalComponent render");

  const { value: color, onChangeValue: onChangeColor } = useInputValue(
    initColor
  );

  return (
    <>
      <h2 style={{ color }}>{message}</h2>
      <input type="color" value={color} onChange={onChangeColor} />
    </>
  );
}

export default FunctionalComponent;
