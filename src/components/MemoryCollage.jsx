import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useMemoriesManifest } from "../hooks/useMemoriesManifest";
import { RippleButton } from "./RippleButton";

/** Time between each new image appearing (ms) */
const STAGGER_MS = 2000;
/** Pause after the last image before the love message (ms) */
const MESSAGE_DELAY_MS = 2800;
/** First image delay after overlay opens (ms) */
const START_DELAY_MS = 500;

const FINAL_LINES = [
  "I love you more than you know",
  "MI AMMOOORRRR",
];

/**
 * Fullscreen memory journey: images pop in one by one; then a closing love message.
 * @param {{ open: boolean, onOpen: () => void, onClose: () => void }} props
 */
export function MemoryCollage({ open, onOpen, onClose }) {
  const { items, loading, error, assetUrl } = useMemoriesManifest();
  const [visibleCount, setVisibleCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const urls = useMemo(
    () => items.map((it) => ({ ...it, src: assetUrl(it.file) })),
    [items, assetUrl]
  );

  const itemsKey = useMemo(() => items.map((it) => `${it.file}:${it.kind}`).join("|"), [items]);

  useEffect(() => {
    if (!open) {
      setVisibleCount(0);
      setShowMessage(false);
      return;
    }
    if (loading || error || urls.length === 0) {
      setVisibleCount(0);
      setShowMessage(false);
      return;
    }

    setVisibleCount(0);
    setShowMessage(false);

    const timers = [];
    for (let i = 0; i < urls.length; i++) {
      const t = START_DELAY_MS + i * STAGGER_MS;
      timers.push(
        window.setTimeout(() => {
          setVisibleCount(i + 1);
        }, t)
      );
    }
    const lastAt = START_DELAY_MS + (urls.length - 1) * STAGGER_MS;
    timers.push(
      window.setTimeout(() => {
        setShowMessage(true);
      }, lastAt + MESSAGE_DELAY_MS)
    );

    return () => timers.forEach((id) => clearTimeout(id));
  }, [open, loading, error, urls.length, itemsKey]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const visibleItems = urls.slice(0, visibleCount);

  return (
    <>
      <div className="flex justify-center px-4 py-12">
        <RippleButton
          onClick={onOpen}
          className="rounded-full bg-gradient-to-r from-love via-love to-blush px-10 py-4 font-sans text-base font-medium tracking-wide text-white shadow-glow"
        >
          Open Our Memories ❤️
        </RippleButton>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#1a0510] via-love/30 to-[#0f0208]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            role="presentation"
          >
            {/* Ambient glow orbs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -left-1/4 top-1/4 h-[50vh] w-[50vh] rounded-full bg-blush/25 blur-[100px]"
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.55, 0.4] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -right-1/4 bottom-0 h-[45vh] w-[45vh] rounded-full bg-love/20 blur-[90px]"
                animate={{ scale: [1.05, 1, 1.05], opacity: [0.35, 0.5, 0.35] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.span
                  key={i}
                  className="absolute text-2xl text-white/15"
                  style={{ left: `${15 + i * 18}%`, top: `${10 + (i % 3) * 25}%` }}
                  animate={{ y: [0, -20, 0], opacity: [0.1, 0.25, 0.1] }}
                  transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
                >
                  ♥
                </motion.span>
              ))}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-[100] rounded-full border border-white/30 bg-white/15 px-4 py-2 font-sans text-sm text-white/90 shadow-lg backdrop-blur-md transition hover:bg-white/25"
            >
              Close
            </button>

            {loading && (
              <p className="relative z-10 font-display text-2xl text-white/80">Loading memories…</p>
            )}

            {!loading && error && (
              <p className="relative z-10 max-w-md px-6 text-center font-sans text-white/85">{error}</p>
            )}

            {!loading && !error && urls.length === 0 && (
              <div className="relative z-10 mx-6 max-w-md rounded-2xl border border-white/20 bg-white/10 px-6 py-10 text-center backdrop-blur-md">
                <p className="font-body text-lg text-white/90">No photos or videos yet.</p>
                <p className="mt-3 font-sans text-sm text-white/65">
                  Add files to <span className="text-blush">public/memories/</span> and run{" "}
                  <span className="text-blush">npm run dev</span> or{" "}
                  <span className="text-blush">npm run memories:manifest</span>.
                </p>
              </div>
            )}

            {!loading && !error && urls.length > 0 && (
              <>
                <div className="relative z-10 flex min-h-0 w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 pb-8 pt-16 md:px-8">
                  <motion.p
                    className="mb-6 text-center font-display text-3xl text-white/90 md:text-4xl"
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    Our memories
                  </motion.p>

                  <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5">
                    <AnimatePresence mode="popLayout">
                      {visibleItems.map((item, i) => (
                        <motion.div
                          key={`${item.file}-${i}`}
                          layout
                          className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/25 bg-white/10 shadow-[0_0_40px_rgba(255,77,109,0.25)]"
                          initial={{ opacity: 0, scale: 0.45, rotate: -6, y: 50, filter: "blur(12px)" }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                            y: 0,
                            filter: "blur(0px)",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 280,
                            damping: 22,
                            mass: 0.85,
                          }}
                          whileHover={{
                            scale: 1.03,
                            boxShadow: "0 0 0 2px rgba(255,192,203,0.5), 0 24px 48px rgba(0,0,0,0.35)",
                            zIndex: 5,
                          }}
                        >
                          {item.kind === "image" ? (
                            <img
                              src={item.src}
                              alt=""
                              loading="eager"
                              decoding="async"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <video
                              src={item.src}
                              controls
                              playsInline
                              className="h-full w-full object-cover"
                              preload="metadata"
                            />
                          )}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/5" />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                <AnimatePresence>
                  {showMessage && (
                    <motion.div
                      className="absolute inset-0 z-[95] flex flex-col items-center justify-center bg-gradient-to-t from-[#1a0510]/95 via-love/40 to-[#1a0510]/90 px-6 backdrop-blur-md"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.85 }}
                    >
                      <motion.div
                        className="max-w-2xl text-center"
                        initial={{ scale: 0.92, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.15 }}
                      >
                        {FINAL_LINES.map((line, lineIdx) => (
                          <motion.p
                            key={line}
                            className={
                              lineIdx === 0
                                ? "font-body text-xl italic leading-relaxed text-white/95 md:text-2xl"
                                : "mt-6 font-display text-4xl text-blush md:text-6xl"
                            }
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: 0.35 + lineIdx * 0.45,
                              duration: 0.7,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
                            {line}
                          </motion.p>
                        ))}
                        <motion.div
                          className="mt-10 flex justify-center gap-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.4 }}
                        >
                          {[0, 1, 2, 3, 4].map((h) => (
                            <motion.span
                              key={h}
                              className="text-2xl text-blush"
                              animate={{ y: [0, -6, 0], scale: [1, 1.15, 1] }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: h * 0.12,
                                ease: "easeInOut",
                              }}
                            >
                              ♥
                            </motion.span>
                          ))}
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
