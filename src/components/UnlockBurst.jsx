import confetti from "canvas-confetti";
import { useEffect, useRef } from "react";

function heartBurst(originX, originY) {
  const count = 80;
  const defaults = { origin: { x: originX, y: originY }, zIndex: 100 };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
      colors: ["#FFC0CB", "#FF4D6D", "#FFFFFF", "#FFD6E0", "#D4AF37"],
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.9 });
  fire(0.1, { spread: 120, startVelocity: 45, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 35 });
}

/**
 * Fires romantic confetti once on mount (after unlock).
 */
export function UnlockBurst() {
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;
    const t = setTimeout(() => {
      heartBurst(0.5, 0.45);
      setTimeout(() => heartBurst(0.52, 0.52), 200);
    }, 400);
    return () => clearTimeout(t);
  }, []);

  return null;
}
