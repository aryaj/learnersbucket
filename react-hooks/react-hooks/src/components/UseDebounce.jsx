import React, { useState } from 'react';
import useDebounce from '../hooks/useDebounce';

const UseDebounce = () => {
  const [text, setText] = useState('');
  const debounced = useDebounce(text, 500);

  return (
    <div>
      <h2>useDebounce</h2>
      <p>Type and see the debounced value update after 500ms.</p>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Type here" />
      <div style={{marginTop: 12}}>Debounced: <strong>{debounced}</strong></div>
    </div>
  )
}

export default UseDebounce;
