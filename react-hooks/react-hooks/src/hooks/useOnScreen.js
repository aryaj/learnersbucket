import React, { useEffect } from "react";

/**
 * Custom hook to detect whether a referenced element is fully visible in the viewport.
 *
 * Approach:
 * 1. Create a ref for the target element.
 * 2. Create an IntersectionObserver with threshold: 1.0 so the callback runs only
 *    when the full element is visible.
 * 3. Start observing the element in useEffect.
 * 4. Clean up by unobserving the element when the component unmounts.
 * 5. Return a boolean state that tells the component whether the element is fully visible.
 */
function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { threshold: 1.0, rootMargin: "0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
}

export default useOnScreen;
