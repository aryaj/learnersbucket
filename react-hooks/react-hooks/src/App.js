import React, { useState } from 'react';
import './App.css';
import UsePrevious from './components/UsePrevious';
import UseWhyDidYouUpdate from './components/UseWhyDidYouUpdate';
import UseIdle from './components/UseIdle';
import UseLocalStorage from './components/UseLocalStorage';
import UseToggle from './components/UseToggle';
import UseFetch from './components/UseFetch';
import UseDebounce from './components/UseDebounce';
import UseToggle2 from './components/UseToggle2';
import UseOnScreen from './components/UseOnScreen';

const HOOKS = [
  { id: 'usePrevious', label: 'usePrevious', comp: <UsePrevious /> },
  { id: 'useWhyDidYouUpdate', label: 'useWhyDidYouUpdate', comp: <UseWhyDidYouUpdate /> },
  { id: 'useIdle', label: 'useIdle', comp: <UseIdle /> },
  { id: 'useLocalStorage', label: 'useLocalStorage', comp: <UseLocalStorage /> },
  { id: 'useToggle', label: 'useToggle', comp: <UseToggle /> },
  { id: 'useFetch', label: 'useFetch', comp: <UseFetch /> },
  { id: 'useDebounce', label: 'useDebounce', comp: <UseDebounce /> },
  { id: 'useToggle2', label: 'useToggle2', comp: <UseToggle2 /> },
  { id: 'useOnScreen', label: 'useOnScreen', comp: <UseOnScreen /> },
];

function App() {
  const [active, setActive] = useState(HOOKS[0].id);

  return (
    <div className="App layout-root">
      <aside className="sidebar">
        <h1 className="brand">React Hooks</h1>
        <div className="list">
          {HOOKS.map((h) => (
            <button
              key={h.id}
              className={`list-item ${active === h.id ? 'active' : ''}`}
              onClick={() => setActive(h.id)}
            >
              {h.label}
            </button>
          ))}
        </div>
        <div className="footer">Minimal theme • Demos</div>
      </aside>

      <main className="content">
        {HOOKS.map((h) => active === h.id && (
          <section key={h.id} className="pane">
            {h.comp}
          </section>
        ))}
      </main>
    </div>
  );
}

export default App;
