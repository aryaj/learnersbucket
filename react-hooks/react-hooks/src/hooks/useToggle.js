import { useCallback, useState } from 'react';

function useToggle(initial = false) {
  const [state, setState] = useState(initial);
  const toggle = useCallback((val) => {
    setState(prev => typeof val === 'boolean' ? val : !prev);
  }, []);
  return [state, toggle];
}

export default useToggle;
