import React from 'react';
import useToggle from '../hooks/useToggle';

const UseToggle = () => {
  const [on, toggle] = useToggle(false);

  return (
    <div>
      <h2>useToggle</h2>
      <p>Simple boolean toggle hook</p>
      <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
        <button onClick={() => toggle()}>{on ? 'ON' : 'OFF'}</button>
        <button onClick={() => toggle(true)}>Set ON</button>
        <button onClick={() => toggle(false)}>Set OFF</button>
      </div>
      <div style={{marginTop: 12}}>State: <strong>{String(on)}</strong></div>
    </div>
  )
}

export default UseToggle;
