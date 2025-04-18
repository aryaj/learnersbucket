import React from 'react'
import useIdle from '../hooks/useIdle'

const UseIdle = () => {
    let delay = 5000;
    const isIdle = useIdle(5000);
  return (
    <div>
        <h2>IsIdle Hook</h2>
        <h4>Will timeout if no Interation for {delay/1000} seconds : {isIdle ? "Session Timed Out": "Session Active"}</h4>
    </div>
  )
}

export default UseIdle