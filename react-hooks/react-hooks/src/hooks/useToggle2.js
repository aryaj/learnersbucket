import { useCallback, useState } from "react";

/**
 * Cycles through an array of values by moving to the next index each time.
 *
 * Flow:
 * 1. Store the current index in state.
 * 2. Create a callback that increments the index.
 * 3. If the end of the array is reached, wrap back to 0.
 * 4. Return the toggle function and the item currently selected from the array.
 *
 * @param {Array<any>} arr - The list of values to cycle through.
 * @param {number} [initial=0] - The starting index.
 * @returns {[Function, any]} A toggle function and the current value.
 */
function useToggle(arr, initial = 0) {
  const [currentIndex, setCurrentIndex] = useState(initial);

  const toggle = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= arr.length - 1 ? 0 : prevIndex + 1,
    );
  }, [arr]);

  return [toggle, arr[currentIndex]];
}

export default useToggle;
