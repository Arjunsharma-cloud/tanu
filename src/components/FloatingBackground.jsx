import { motion } from "framer-motion";

const HEARTS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: `${(i * 37) % 100}%`,
  delay: (i * 0.15) % 5,
  duration: 12 + (i % 8),
  scale: 0.4 + (i % 5) * 0.12,
}));

const SPARKLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${(i * 53) % 100}%`,
  top: `${(i * 71) % 100}%`,
}));

/**
 * Soft gradient orbs + floating hearts + sparkles; subtle parallax via mouse could be added from parent.
 */
export function FloatingBackground({ mouse }) {
  const mx = mouse?.x ?? 0.5;
  const my = mouse?.y ?? 0.5;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-soft-gradient"
        animate={{
          backgroundPosition: [`${50 + mx * 3}% ${50 + my * 3}%`, `${48 + mx * 2}% ${52 + my * 2}%`],
        }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{ backgroundSize: "200% 200%" }}
      />
      <motion.div
        className="absolute -left-1/4 top-0 h-[70vh] w-[70vh] rounded-full bg-blush/30 blur-[100px]"
        animate={{ x: [0, mx * 24, 0], y: [0, my * 16, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/4 bottom-0 h-[60vh] w-[60vh] rounded-full bg-love/25 blur-[90px]"
        animate={{ x: [0, -mx * 20, 0], y: [0, -my * 12, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/3 top-1/4 h-40 w-40 rounded-full bg-white/50 blur-3xl"
        animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {SPARKLES.map((s) => (
        <motion.span
          key={s.id}
          className="absolute text-lg text-gold/40"
          style={{ left: s.left, top: s.top }}
          animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.1, 0.8] }}
          transition={{
            duration: 3 + (s.id % 4),
            repeat: Infinity,
            delay: s.id * 0.2,
            ease: "easeInOut",
          }}
        >
          ✦
        </motion.span>
      ))}

      {HEARTS.map((h) => (
        <motion.span
          key={h.id}
          className="absolute select-none text-blush/50"
          style={{ left: h.x, bottom: "-8%", fontSize: `${14 * h.scale}px` }}
          animate={{
            y: ["0vh", "-120vh"],
            x: [0, (h.id % 2 === 0 ? 1 : -1) * 30],
            rotate: [0, 12, -8, 0],
            opacity: [0, 0.85, 0.85, 0],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: "linear",
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}
