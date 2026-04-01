import { motion } from "framer-motion";

/**
 * Closing emotional beat for the experience.
 */
export function FinalMessage() {
  return (
    <motion.footer
      className="relative px-6 pb-24 pt-12 text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-xl rounded-3xl border border-white/50 bg-white/40 px-8 py-12 shadow-glow backdrop-blur-md">
        <p className="font-display text-4xl leading-snug text-love md:text-5xl">
          Happy Birthday, DONNN <span className="inline-block">❤️</span>
        </p>
        <p className="mt-6 font-body text-lg italic leading-relaxed text-love/90 md:text-xl">
          You mean more to me than words will ever be able to hold.
        </p>
      </div>
      <p className="mt-10 font-display text-2xl text-love/60">Tanu</p>
    </motion.footer>
  );
}
