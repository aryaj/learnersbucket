import { useEffect, useRef, useState } from "react";
const RADIUS = 50;

type CircleCoords = {
  top: number;
  left: number;
  right: number;
  bottom: number;
  background?: string;
};

export function DetectOverlappingCircle() {
  const [circleCords, setCircleCords] = useState<CircleCoords[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const CirclesOverlap = (circle1: CircleCoords, circle2: CircleCoords) => {
    const dx = circle1.left + RADIUS - (circle2.left + RADIUS);
    const dy = circle1.top + RADIUS - (circle2.top + RADIUS);
    const distanceSq = dx * dx + dy * dy;
    const radiusSum = RADIUS + RADIUS;
    return distanceSq < radiusSum * radiusSum;
  };

  const drawCircle = (e: any) => {
    const { clientX, clientY } = e;
    const rect = containerRef.current?.getBoundingClientRect();

    if (!rect) return;

    const newCords: CircleCoords = {
      top: clientY - rect.top - RADIUS,
      left: clientX - rect.left - RADIUS,
      right: clientX - rect.left - RADIUS + 2 * RADIUS,
      bottom: clientY - rect.top - RADIUS + 2 * RADIUS,
    };

    console.log("newCords", newCords);

    setCircleCords((prev) => {
      for (let i = 0; i < prev.length; i++) {
        const collides = CirclesOverlap(newCords, prev[i]);
        if (collides) {
          newCords.background = "green";
        }
      }
      return [...prev, newCords];
    });
  };

  useEffect(() => {
    document.addEventListener("click", drawCircle);

    return () => {
      document.removeEventListener("click", drawCircle);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[400px] text-slate-400 py-20"
    >
      {circleCords.map((cords) => {
        return (
          <Circle
            {...cords}
            key={cords.top + cords.left}
            background={cords.background}
          />
        );
      })}
    </div>
  );
}

const Circle = ({ top, left, background }: CircleCoords) => {
  return (
    <div
      style={{
        width: RADIUS * 2,
        height: RADIUS * 2,
        background: background ?? "#cbd5e1",
        borderRadius: "50%",
        position: "absolute",
        top,
        left,
      }}
    ></div>
  );
};
