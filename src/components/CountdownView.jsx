import { motion } from "framer-motion";

/**
 * @param {object} props
 * @param {{ days: number, hours: number, minutes: number, seconds: number }} props.countdown
 */
export function CountdownView({ countdown }) {
  const units = [
    { label: "Days", value: countdown.days },
    { label: "Hours", value: countdown.hours },
    { label: "Minutes", value: countdown.minutes },
    { label: "Seconds", value: countdown.seconds },
  ];

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-lg"
      >
        <p className="font-display text-5xl text-love md:text-6xl">Tanu</p>
        <p className="mt-4 font-body text-xl italic text-love/90">
          Something special is waiting for you... just a little more time ❤️
        </p>
      </motion.div>

      <motion.div
        className="mt-14 grid w-full max-w-md grid-cols-2 gap-4 sm:grid-cols-4"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {units.map((u) => (
          <motion.div
            key={u.label}
            variants={{
              hidden: { opacity: 0, y: 16, scale: 0.96 },
              show: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="rounded-2xl border border-white/60 bg-white/40 px-3 py-4 shadow-lg backdrop-blur-md"
          >
            <p className="font-sans text-3xl font-light tabular-nums text-love">
              {String(u.value).padStart(2, "0")}
            </p>
            <p className="mt-1 font-sans text-xs uppercase tracking-widest text-love/60">{u.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        className="mt-12 max-w-sm font-body text-sm text-love/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Until the clock strikes midnight on April 2nd — then this love story continues.
      </motion.p>
    </div>
  );
}
