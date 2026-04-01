import { motion } from "framer-motion";
import { RippleButton } from "./RippleButton";

/**
 * @param {{ onPick: (id: string) => void }} props
 */
export function CelebrationButtons({ onPick }) {
  const items = [
    { id: "celebrate", emoji: "💖", label: "Celebrate Her" },
    { id: "wish", emoji: "🎈", label: "Make a Wish" },
    { id: "love", emoji: "💌", label: "More Love" },
  ];

  return (
    <section className="relative px-4 py-12">
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="font-display text-4xl text-love md:text-5xl">Make magic</h3>
        <p className="mt-2 font-body text-love/75">Tap gently — the night answers in color.</p>
      </motion.div>
      <div className="mx-auto mt-10 flex max-w-lg flex-col gap-4 sm:flex-row sm:justify-center">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i }}
          >
            <RippleButton
              onClick={() => onPick(item.id)}
              className="w-full rounded-2xl border border-white/50 bg-gradient-to-br from-white/90 to-blush/40 px-8 py-4 font-sans text-base font-medium text-love shadow-lg backdrop-blur-sm transition hover:shadow-glow sm:w-auto"
            >
              <span className="mr-2">{item.emoji}</span>
              {item.label}
            </RippleButton>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
