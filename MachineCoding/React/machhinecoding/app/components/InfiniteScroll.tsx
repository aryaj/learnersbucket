import { useEffect, useState } from "react";

/**
 * InfiniteScroll
 *
 * This component renders a simple infinite scroll experience using the browser
 * window scroll event. It starts with 50 numbered items and adds 50 more items
 * each time the user scrolls to the bottom of the page.
 */
export function InfiniteScroll() {
  // count is the number of items currently rendered.
  const [count, setCount] = useState(50);

  /**
   * onscroll
   *
   * Called on every window scroll event. It detects whether the user has scrolled
   * to the bottom of the page by comparing:
   * - scrollTop: how far the page has already been scrolled vertically
   * - clientHeight: the visible height of the browser viewport
   * - scrollHeight: the full height of the document content
   *
   * When the sum of scrollTop and clientHeight reaches or exceeds scrollHeight,
   * the user is at the bottom and we increase the item count by 50.
   */
  const onscroll = () => {
    const scrollTop = window.scrollY;
    const clientHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      setCount((prev) => prev + 50);
    }
  };

  useEffect(() => {
    // Attach the scroll listener when the component is mounted.
    window.addEventListener("scroll", onscroll);

    // Remove the listener when the component is unmounted to avoid memory leaks.
    return () => {
      window.removeEventListener("scroll", onscroll);
    };
  }, []);

  // Build the list of rendered elements dynamically based on the current count.
  const elements = [];
  for (let i = 1; i <= count; i++) {
    elements.push(
      <div key={i}>
        {i}
      </div>
    );
  }

  return <main>{elements}</main>;
}
