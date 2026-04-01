import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

function HeartTrail({ offsetX, offsetY, stiffness, size, opacity }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness, damping: 20, mass: 0.35 });
  const sy = useSpring(y, { stiffness, damping: 20, mass: 0.35 });

  useEffect(() => {
    const onMove = (e) => {
      x.set(e.clientX - 10 + offsetX);
      y.set(e.clientY - 10 + offsetY);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y, offsetX, offsetY]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[60] mix-blend-multiply"
      style={{ x: sx, y: sy }}
    >
      <span className={`${size} ${opacity} drop-shadow-sm`}>♥</span>
    </motion.div>
  );
}

/**
 * Small hearts that gently follow the cursor with staggered depth.
 */
export function CursorHearts() {
  return (
    <>
      <HeartTrail offsetX={0} offsetY={0} stiffness={120} size="text-xl" opacity="text-love/50" />
      <HeartTrail offsetX={-14} offsetY={10} stiffness={95} size="text-lg" opacity="text-love/35" />
      <HeartTrail offsetX={12} offsetY={-8} stiffness={75} size="text-sm" opacity="text-blush/50" />
    </>
  );
}
