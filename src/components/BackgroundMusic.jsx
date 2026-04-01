import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ROMANTIC_AUDIO_URL } from "../constants";

/**
 * Soft romantic loop with mute toggle. Attempts to play after unlock (may require user gesture on some browsers).
 * @param {object} props
 * @param {boolean} props.enabled When false, audio is paused.
 */
export function BackgroundMusic({ enabled }) {
  const ref = useRef(null);
  const [muted, setMuted] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.loop = true;
    el.volume = 0.35;
    if (!enabled) {
      el.pause();
      return;
    }
    const p = el.play();
    if (p !== undefined) {
      p.catch(() => setBlocked(true));
    }
  }, [enabled]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = muted;
  }, [muted]);

  const toggle = () => {
    setMuted((m) => !m);
    const el = ref.current;
    if (el && blocked) {
      el.play().then(() => setBlocked(false)).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={ref} src={ROMANTIC_AUDIO_URL} preload="auto" />
      <motion.button
        type="button"
        onClick={toggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[70] flex items-center gap-2 rounded-full border border-white/50 bg-white/70 px-4 py-2.5 font-sans text-sm text-love shadow-glow backdrop-blur-md"
        aria-label={muted ? "Unmute music" : "Mute music"}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={muted ? "off" : "on"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="tabular-nums"
          >
            {muted ? "🔇 Sound off" : "🔊 Sound on"}
          </motion.span>
        </AnimatePresence>
        {blocked && (
          <span className="text-xs text-love/70">(tap to start)</span>
        )}
      </motion.button>
    </>
  );
}
