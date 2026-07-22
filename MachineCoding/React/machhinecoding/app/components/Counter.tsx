import { useEffect, useRef, useState } from "react";

export function Counter() {
  // Step 1: Store the visible counter value.
  const [count, setCount] = useState(0);

  // Step 2: Track whether the counter is running.
  const [counterState, setCounterState] = useState(false);

  // Step 3: Keep interval id in a ref so it persists across renders.
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Start interval only when counter is in running state.
    if (counterState) {
      intervalId.current = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 1000);
    }

    // Cleanup runs when state changes or component unmounts.
    // It prevents multiple intervals and memory leaks.
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    };
  }, [counterState]);

  return (
    <div className="text-center py-20">
      <div className="text-6xl mb-4">🔢</div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">Counter</h3>

      <div className="mx-auto mb-6 w-fit rounded-xl border border-slate-200 bg-white px-6 py-3 shadow-sm">
        <p className="text-sm text-slate-500">Count State</p>
        <p className="text-3xl font-bold text-slate-900">{count}</p>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          // Step 4: Start button toggles the running state to true.
          onClick={() => setCounterState(true)}
        >
          Start
        </button>
        <button
          type="button"
          className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
          // Step 5: Stop button toggles the running state to false.
          onClick={() => setCounterState(false)}
        >
          Stop
        </button>
      </div>
    </div>
  );
}
