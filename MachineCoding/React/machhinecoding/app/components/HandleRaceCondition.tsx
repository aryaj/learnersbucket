import { useEffect, useState, type ChangeEvent } from "react";

export function HandleRaceCondition() {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState("");

  // Simulates an API that responds after a random network delay.
  const getRandomData = (searchTxt: string): Promise<string> => {
    return new Promise((resolve) => {
      const time = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
      setTimeout(() => {
        resolve(searchTxt);
      }, time);
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchText(value);
  };

  useEffect(() => {
    // Step 1: Each effect run creates its own flag in closure scope.
    let flag = true;

    // Step 2: Fire a request for the current searchText.
    getRandomData(searchText).then((val) => {
      // Step 3: Update UI only if this effect run is still active.
      // If a newer search started, cleanup for this run flips flag to false.
      if (flag) {
        setResults(val);
      }
    });

    // Step 4: Cleanup runs before next effect and on unmount.
    // This marks older request callbacks as stale so they cannot update state.
    return () => {
      flag = false;
    };
  }, [searchText]);

  return (
    <div className="text-center text-slate-400 py-20">
      <div className="text-6xl mb-4">🧪</div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">
        Handle Race Condition
      </h3>
      <p className="text-slate-600">
        Type to simulate requests with random delay (500-1000ms).
      </p>
      <p className="mt-4 text-sm text-slate-500">
        Only the latest active request updates result; stale responses are ignored.
      </p>

      <input
        type="text"
        value={searchText}
        onChange={handleChange}
        className="mt-4 w-full max-w-md rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
        placeholder="Type quickly to reproduce race-condition behavior"
      />
      <p className="mt-2">{results}</p>
    </div>
  );
}
