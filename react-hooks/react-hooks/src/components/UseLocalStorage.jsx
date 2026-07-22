import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const UseLocalStorage = () => {
  const [name, setName] = useLocalStorage('name', '');
  const [input, setInput] = useState('');

  return (
    <div>
      <h2>useLocalStorage</h2>
      <p style={{maxWidth: 600}}>This hook syncs state to localStorage. Type a name and save it.</p>
      <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type name" />
        <button onClick={() => { setName(input); setInput(''); }}>Save</button>
        <button onClick={() => setName('')}>Clear</button>
      </div>
      <div style={{marginTop: 12}}>Saved value: <strong>{name || '<empty>'}</strong></div>
    </div>
  )
}

export default UseLocalStorage;
