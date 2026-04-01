import { motion } from "framer-motion";
import { useState } from "react";

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 * @param {() => void} props.onClick
 */
export function RippleButton({ children, className = "", onClick, type = "button", ...rest }) {
  const [ripples, setRipples] = useState([]);

  const handle = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => {
      setRipples((r) => r.filter((x) => x.id !== id));
    }, 600);
    onClick?.(e);
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      onClick={handle}
      className={`relative overflow-hidden ${className}`}
      {...rest}
    >
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40"
          style={{ left: r.x, top: r.y }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 18, opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
