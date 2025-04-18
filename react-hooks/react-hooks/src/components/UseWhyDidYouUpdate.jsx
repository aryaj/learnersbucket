import React, { useMemo, useState } from "react";
import usePrevious from "../hooks/usePrevious";
import useWhyDidYouUpdate from "../hooks/useWhyDidYouUpdate";

const Counter = React.memo((props) => {
  useWhyDidYouUpdate("Counter", props);
  return <div style={props.style}>{props.count}</div>;
});

const UseWhyDidYouUpdate = () => {
  const [count, setCount] = useState(0);
  const [testCase, setTestCase] = useState(null);

  const counterStyle = useMemo(()=>{
    return {
    fontSize: "3rem",
    color: "red",
  }
  },[]);

  return (
    <div>
      <h2>useWhyDidYouUpdate Hook</h2>
      <Counter
         count={count}
        testCaseWithArray={testCase}
        style={counterStyle}
        function={() => console.log(count)}
      />
      <button
        onClick={() => {
          setCount(count + 1);
          setTestCase([count + 1]);
        }}
      >
        Add Count
      </button>
    </div>
  );
};

export default UseWhyDidYouUpdate;
