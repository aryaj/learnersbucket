import React from "react";
import useToggle from "../hooks/useToggle2";

/**
 * Demo component for useToggle2.
 *
 * It passes an array of numbers and an initial index to the hook.
 * Each click calls the returned toggle function, which advances to the next value.
 */
const UseToggle2 = () => {
  const [toggle, value] = useToggle([1, 2, 3, 4, 5, 6], 0);

  return (
    <div>
      <h2>Current value : {value}</h2>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
};

export default UseToggle2;
