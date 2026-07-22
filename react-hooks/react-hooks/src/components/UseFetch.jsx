import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';

const UseFetch = () => {
  const [url, setUrl] = useState('');
  const [trigger, setTrigger] = useState('');
  const { data, loading, error } = useFetch(trigger);

  return (
    <div>
      <h2>useFetch</h2>
      <p>Fetch JSON from a URL (try https://jsonplaceholder.typicode.com/todos/1)</p>
      <div style={{display: 'flex', gap: 8}}>
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." style={{flex: 1}} />
        <button onClick={() => setTrigger(url)}>Fetch</button>
      </div>
      <div style={{marginTop: 12}}>
        {loading && <div>Loading...</div>}
        {error && <div style={{color: 'crimson'}}>Error: {String(error)}</div>}
        {data && <pre style={{textAlign: 'left', background: '#f6f8fa', padding: 8}}>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    </div>
  )
}

export default UseFetch;
