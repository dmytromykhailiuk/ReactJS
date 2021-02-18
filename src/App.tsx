import React from "react";
import { useInputValue, useLocalTime } from "./hooks";
import {
  Component,
  PureComponent,
  FunctionalComponent,
} from "./components";

// Functional component
export default function App() {
  console.log("---AppComponent render");

  const { value: message, onChangeValue: onChangeMessage } = useInputValue(
    "Hello World"
  );
  const localTime = useLocalTime(5000);

  const element = React.createElement(
    "h2",
    { style: { color: "#0000FF" } },
    message
  );

  return (
    <>
      <h1>Task 2: Webpack</h1>
      <h3>{localTime}</h3>

      <input value={message} onChange={onChangeMessage} />

      <Component message={message} color="#FF0000" />
      {element}
      <PureComponent message={message} color="#FFA500" />
      <FunctionalComponent message={message} color="#008000" />
    </>
  );
}
