import React, { useState } from "react";
import usePrevious from "../hooks/usePrevious";

const UsePrevious = () => {
  const [current,setCurrent] = useState(0);

  const previous = usePrevious(current);

  const handleClick = () => {
    setCurrent(prev => prev + 1)
  }

  return (
    <div>
      <h2>usePrevious Hook</h2>
      <div>Previous Value - {previous} </div>
      <div>Current Value - {current}</div>
      <button onClick={()=>handleClick()}>Add Count</button>
    </div> 
  );
};

export default UsePrevious;
