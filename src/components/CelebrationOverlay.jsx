import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

const BALLOON_COLORS = ["#FFC0CB", "#FF4D6D", "#FFB7C5", "#FF8FA3", "#FFD6E0"];

/** Per-mode copy, balloon density, banners, and floating display words */
const CELEBRATION_CONFIG = {
  celebrate: {
    balloonCount: 34,
    headline: "Enjoy your day, DONN",
    subline: "You deserve every soft, shining moment.",
    banners: [
      "Enjoy your day, love",
      "Happy Birthday, beautiful",
      "You light up my whole world",
      
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
 * Full-screen layered celebration: balloons, hearts, banners, floating text — portaled to viewport center.
 * @param {{ active: string | null, onClose: () => void }} props
 */
export function CelebrationOverlay({ active, onClose }) {
  const cfg = useMemo(() => (active ? CELEBRATION_CONFIG[active] : null), [active]);

  useEffect(() => {
    if (!active) return;
    fireConfetti(active);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);

  const balloonCount = cfg?.balloonCount ?? 14;

  const overlay = (
    <AnimatePresence mode="wait">
      {active && cfg && (
        <motion.div
          key="celebration-overlay"
          className="fixed inset-0 z-[9999] isolate flex cursor-pointer flex-col bg-gradient-to-b from-[#fff8fa]/97 via-[#ffe4ec]/95 to-[#fff5f8]/97 backdrop-blur-md"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            margin: 0,
            maxWidth: "100vw",
            minHeight: "100dvh",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
          role="presentation"
        >
          {/* Effects layer — fills viewport; does not affect flex centering */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              className="pointer-events-none absolute inset-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
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
          </div>

          {/* Center block: true viewport center (flex-1 + justify-center) */}
          <div className="pointer-events-none relative z-10 flex min-h-0 w-full flex-1 flex-col items-center justify-center px-6 py-16">
            <motion.div
              className="mx-auto max-w-lg text-center"
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.08 }}
            >
              <p className="font-display text-4xl leading-tight text-love drop-shadow-sm md:text-6xl">{cfg.headline}</p>
              <p className="mt-4 font-body text-lg italic text-love/90 md:text-xl">{cfg.subline}</p>
            </motion.div>
          </div>

          <motion.p
            className="pointer-events-none absolute bottom-8 left-0 right-0 z-10 mx-auto max-w-xs text-center font-body text-sm text-love/90"
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

  if (typeof document === "undefined") return null;

  return createPortal(overlay, document.body);
}
