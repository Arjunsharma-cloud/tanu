import { motion } from "framer-motion";
import { useState } from "react";
import { BackgroundMusic } from "./BackgroundMusic";
import { CelebrationButtons } from "./CelebrationButtons";
import { CelebrationOverlay } from "./CelebrationOverlay";
import { FinalMessage } from "./FinalMessage";
import { LovePostcard } from "./LovePostcard";
import { MemoryCollage } from "./MemoryCollage";
import { UnlockBurst } from "./UnlockBurst";

/**
 * Full post-unlock experience: music, postcard, celebrations, collage, closing line.
 * @param {{ mouse: { x: number, y: number } }} props
 */
export function SurpriseExperience({ mouse }) {
  const [celebration, setCelebration] = useState(null);
  const [collageOpen, setCollageOpen] = useState(false);

  return (
    <motion.div
      className="relative min-h-screen"
      initial={{ opacity: 0, filter: "blur(12px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <UnlockBurst />
      <BackgroundMusic enabled />

      <header className="relative px-6 pb-8 pt-16 text-center md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="mx-auto max-w-2xl"
        >
          <p className="font-body text-sm uppercase tracking-[0.35em] text-love/60">Happy Birthday to</p>
          <h1 className="mt-3 font-display text-6xl text-love drop-shadow-sm md:text-8xl">Tanu</h1>
          <p className="mt-4 font-body text-xl italic text-love/85 md:text-2xl">
            A little universe I built — because you deserve a love story, not just a message.
          </p>
        </motion.div>
      </header>

      <LovePostcard mouse={mouse} />
      <CelebrationButtons onPick={setCelebration} />
      <CelebrationOverlay active={celebration} onClose={() => setCelebration(null)} />
      <MemoryCollage open={collageOpen} onOpen={() => setCollageOpen(true)} onClose={() => setCollageOpen(false)} />
      <FinalMessage />
    </motion.div>
  );
}
