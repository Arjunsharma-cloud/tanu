import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo } from "react";

const BALLOON_COLORS = ["#FFC0CB", "#FF4D6D", "#FFB7C5", "#FF8FA3", "#FFD6E0"];

/** Per-mode copy, balloon density, banners, and floating display words */
const CELEBRATION_CONFIG = {
  celebrate: {
    balloonCount: 34,
    /** Hero line — Celebrate Her */
    headline: "Enjoy your day, love",
    subline: "You deserve every soft, shining moment.",
    banners: [
      "Enjoy your day, love",
      "Happy Birthday, beautiful",
      "You light up my whole world",
      "Celebrating you today & always",
    ],
    floatingWords: ["Enjoy", "your", "day", "love", "❤️", "DONNN"],
  },
  wish: {
    balloonCount: 18,
    headline: "May your wish come true",
    subline: "Close your eyes — I am wishing with you.",
    banners: [
      "May your wish come true",
      "Every star is listening tonight",
      "Your dreams matter",
      "I believe in your magic",
    ],
    floatingWords: ["Wish", "true", "hope", "forever", "✨"],
  },
  love: {
    balloonCount: 16,
    headline: "Manifesting our friendship for ever , mi amoor",
    subline: "With all of me — always.",
    banners: [
      "I love you moreee",
      "Mi amoor",
      "You are my home",
      "More every heartbeat",
    ],
    floatingWords: ["Te amo", "moreee", "mi amoor", "DONNN", "💌"],
  },
};

function fireConfetti(kind) {
  const colors = ["#FFC0CB", "#FF4D6D", "#FFFFFF", "#D4AF37"];
  if (kind === "wish") {
    confetti({ particleCount: 120, spread: 88, origin: { y: 0.65 }, colors, ticks: 200, gravity: 0.9 });
  } else if (kind === "love") {
    confetti({ particleCount: 90, spread: 360, startVelocity: 35, origin: { x: 0.5, y: 0.4 }, colors });
  } else {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.55 }, colors });
    setTimeout(() => confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 0, y: 0.65 }, colors }), 150);
    setTimeout(() => confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 1, y: 0.65 }, colors }), 150);
  }
}

/**
 * Full-screen layered celebration: balloons, hearts, banners, floating text — varies by mode.
 * @param {{ active: string | null, onClose: () => void }} props
 */
export function CelebrationOverlay({ active, onClose }) {
  const cfg = useMemo(() => (active ? CELEBRATION_CONFIG[active] : null), [active]);

  useEffect(() => {
    if (!active) return;
    fireConfetti(active);
  }, [active]);

  const balloonCount = cfg?.balloonCount ?? 14;

  return (
    <AnimatePresence>
      {active && cfg && (
        <motion.div
          className="fixed inset-0 z-[80] flex cursor-pointer flex-col items-center justify-center bg-love/10 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Balloons — count from config (many more for "celebrate") */}
            {Array.from({ length: balloonCount }).map((_, i) => (
              <motion.div
                key={`b-${active}-${i}`}
                className="absolute bottom-0 -ml-8 flex flex-col items-center"
                style={{
                  left: balloonCount === 1 ? "50%" : `${(i / (balloonCount - 1)) * 100}%`,
                }}
                initial={{ y: "110vh", opacity: 0.9 }}
                animate={{ y: "-20vh", x: [0, (i % 2 === 0 ? 1 : -1) * 20, 0] }}
                transition={{
                  duration: 10 + (i % 5),
                  delay: i * 0.1,
                  ease: [0.22, 0.61, 0.36, 1],
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                <div
                  className="h-24 w-16 rounded-[50%] shadow-lg md:h-[5.5rem] md:w-[4.25rem]"
                  style={{
                    background: `linear-gradient(145deg, ${BALLOON_COLORS[i % BALLOON_COLORS.length]}, #fff5)`,
                  }}
                />
                <div className="h-16 w-px bg-love/40" />
              </motion.div>
            ))}

            {/* Heart particles */}
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.span
                key={`h-${active}-${i}`}
                className="absolute text-3xl text-love/70"
                style={{ left: `${(i * 17) % 100}%`, top: `${(i * 23) % 80}%` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.2, 1],
                  y: [0, -40, -120],
                  x: [(i % 2 === 0 ? 1 : -1) * 60, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 25],
                }}
                transition={{
                  duration: 3.2,
                  delay: i * 0.08,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: "easeOut",
                }}
              >
                ♥
              </motion.span>
            ))}

            {/* Banners — mode-specific */}
            {cfg.banners.map((text, i) => (
              <motion.div
                key={`${active}-banner-${i}`}
                className="absolute left-0 right-0 mx-auto w-fit max-w-[90vw] rounded-full border border-white/50 bg-white/80 px-5 py-2 text-center font-sans text-xs text-love shadow-lg backdrop-blur-md sm:px-6 sm:text-sm"
                style={{ top: `${14 + i * 11}%` }}
                initial={{ opacity: 0, y: -30, scale: 0.9 }}
                animate={{ opacity: 1, y: [0, 6, 0], scale: 1 }}
                transition={{
                  delay: 0.15 + i * 0.1,
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                {text}
              </motion.div>
            ))}

            {/* Floating display words — mode-specific */}
            {cfg.floatingWords.map((word, i) => (
              <motion.span
                key={`${active}-float-${i}`}
                className="absolute font-display text-3xl text-love/40 md:text-6xl"
                style={{
                  left: `${8 + (i * 17) % 84}%`,
                  top: `${28 + (i * 13) % 38}%`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0.25, 0.6, 0.25],
                  y: [0, -20, 0],
                  rotate: [-3, 3, -3],
                }}
                transition={{ duration: 5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          {/* Center hero message */}
          <motion.div
            className="pointer-events-none relative z-10 mx-auto max-w-lg px-6 text-center"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.12 }}
          >
            <p className="font-display text-4xl leading-tight text-love drop-shadow-sm md:text-6xl">{cfg.headline}</p>
            <p className="mt-4 font-body text-lg italic text-love/85 md:text-xl">{cfg.subline}</p>
          </motion.div>

          <motion.p
            className="pointer-events-none relative z-10 mt-auto mb-10 max-w-xs text-center font-body text-sm text-love/90 md:mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            Tap anywhere to return
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
