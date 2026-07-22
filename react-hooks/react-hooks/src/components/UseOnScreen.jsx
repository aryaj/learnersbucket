import React, { useRef } from "react";
import useOnScreen from "../hooks/useOnScreen";

/**
 * Demo component for the useOnScreen hook.
 *
 * What this does:
 * 1. Renders a grid of numbered blocks.
 * 2. Gives each block its own ref.
 * 3. Uses the custom hook to detect when that block is fully visible in the viewport.
 * 4. Logs a message once the block is fully in view.
 *
 * This demonstrates how a custom hook can observe DOM visibility using the
 * Intersection Observer API.
 */
const UseOnScreen = () => {
  const Element = ({ index }) => {
    const ref = useRef(null);
    const isInViewPort = useOnScreen(ref);

    if (isInViewPort) {
      console.log(`Element ${index} is in the viewport`);
    }

    return (
      <div
        style={{
          width: "100%",
          minHeight: "100px",
          background: "linear-gradient(135deg, #93c5fd, #60a5fa)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "12px",
          fontSize: "1.1rem",
          fontWeight: 600,
          boxShadow: "0 8px 20px rgba(96, 165, 250, 0.25)",
        }}
        ref={ref}
      >
        {index}
      </div>
    );
  };

  const blocks = [];

  for (let i = 0; i < 50; i++) {
    blocks.push(
      <div key={i} style={{ width: "100%" }}>
        <Element index={i} />
      </div>
    );
  }

  return (
    <div
      className="blocks-container"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "16px",
        width: "100%",
        maxWidth: "100%",
      }}
    >
      {blocks}
    </div>
  );
};

export default UseOnScreen;
