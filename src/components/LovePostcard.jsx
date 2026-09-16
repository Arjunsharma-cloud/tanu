import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { RippleButton } from "./RippleButton";

const MESSAGE = `Happy birthday tanuuuu😘…may god bless you.. aree aree sorry sorry yrr by mistake i have mentioned god 😁 ..maaf krdena na ..


Ek aur ehsaan samaj kr.. once again i am doing bkchodi only ..butt i like everything that i do when i am with you …i dont know how howww but how i fell for u .. how i started loving you because i never want to .. i was little bit afraid tooo ..but after that jibhi all the thing changed and after that all the things that happen are totally unexpected.. before i think that we will be in contact for short time butt see baby we are in contact from 22nd may and today it completes 15 month 26 day .. i think its a lot of time..i know in between there something something was not good between us but i think it is normal after that now i am totally sure about loving you .. i think i got the best of everything that i havent imagine or dream of 

..and dont even dare to say that i deserve better .. i have got the best girl .. hmm shyd pichle janam ki wajh s h y ..i know ki u dont want relation .. aree beta toh kya huaa ..tum ho vo hi bhot h .. i dont want anything else ..

I wanna be the guy you find peace , courage , happiness , purpose and and and veryyy hopefully a future with . And for that i am willing to wait as long as possible .... khi nhi jaa rha mai . Tum fas chuki ho mere sath 

Thanks for everything babyy .. whenever i need suggestion for anything or samjhane k liye hamesha .. and that …forcing me tooo start concentrating on my career or what i want to doo..i know u dont want to celebrate your birthday but i really really want to celebrate it with u and i want to be with u at that day but sab thodi milta h 🥹😁..

I dont know how more long we will be in touch but there will be no regret i have spend the best time of my life with the best .. and i will be missing u a lot today .. 
and i know u dont like but i love u tanushikha bharti .. and happy happy birthday babbyyyyyyy (muskan )🤎❤️`;

/**
 * Animated envelope + flipping postcard with parallax.
 * @param {{ mouse: { x: number, y: number } }} props
 */
export function LovePostcard({ mouse }) {
  const [phase, setPhase] = useState("sealed"); // sealed | opened | revealed
  const rotateX = useSpring(0, { stiffness: 80, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 80, damping: 18 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);

  useEffect(() => {
    const nx = (mouse.x - 0.5) * 14;
    const ny = (mouse.y - 0.5) * -14;
    rotateX.set(ny);
    rotateY.set(nx);
    mx.set(mouse.x * 100);
    my.set(mouse.y * 100);
  }, [mouse.x, mouse.y, rotateX, rotateY, mx, my]);

  const glow = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgba(255,77,109,0.35), transparent 55%)`;

  return (
    <section className="relative px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h2
          className="font-display text-5xl text-love md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          A letter for you
        </motion.h2>
        <p className="mt-3 font-body text-lg italic text-love/80">Tap the envelope when you are ready.</p>
      </div>

      <div className="relative mx-auto mt-12 flex min-h-[420px] w-full max-w-5xl items-center justify-center perspective-[1200px] md:min-h-[480px]">
        {/* floating hearts around card */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute text-2xl text-love/30 md:text-3xl"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 15}%`,
            }}
            animate={{ y: [0, -12, 0], rotate: [0, 8, 0], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          >
            ♥
          </motion.span>
        ))}

        <motion.div
          className="relative w-full max-w-5xl min-w-0"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            className="absolute inset-0 -z-10 rounded-[2rem]"
            style={{ background: glow }}
          />

          <div className="relative rounded-[2rem] p-[2px] shadow-glow" style={{ perspective: "1200px" }}>
            <div
              className="overflow-visible rounded-[1.85rem] border border-white/50 bg-gradient-to-br from-[#fff8fa] via-blush/40 to-love/20 p-4 shadow-inner backdrop-blur-sm sm:p-6 md:p-10"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Envelope */}
              <div className="relative mx-auto w-full" style={{ transformStyle: "preserve-3d" }}>
                <motion.div
                  className={`relative h-56 w-full rounded-xl border border-love/20 bg-gradient-to-b from-love/15 to-blush/30 shadow-md md:h-64 ${
                    phase === "sealed" ? "cursor-pointer" : ""
                  }`}
                  initial={false}
                  role={phase === "sealed" ? "button" : undefined}
                  tabIndex={phase === "sealed" ? 0 : undefined}
                  aria-label={phase === "sealed" ? "Open the envelope" : undefined}
                  onClick={() => {
                    if (phase === "sealed") setPhase("opened");
                  }}
                  onKeyDown={(e) => {
                    if (phase !== "sealed") return;
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setPhase("opened");
                    }
                  }}
                  whileTap={phase === "sealed" ? { scale: 0.985 } : undefined}
                  animate={{
                    opacity: phase === "revealed" ? 0.45 : 1,
                    boxShadow:
                      phase !== "sealed"
                        ? "0 0 50px rgba(255,77,109,0.25)"
                        : "0 12px 40px rgba(255,77,109,0.12)",
                  }}
                >
                  {/* flap */}
                  <motion.div
                    className="pointer-events-none absolute left-0 right-0 top-0 z-20 h-28 origin-top rounded-b-3xl border border-love/15 bg-gradient-to-b from-love/40 to-blush/50"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{ rotateX: phase === "sealed" ? 0 : -125 }}
                    transition={{ type: "spring", stiffness: 70, damping: 16 }}
                  />
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-10 flex flex-col items-center justify-center px-4">
                    {phase === "sealed" && (
                      <span className="rounded-full bg-gradient-to-r from-love to-love/80 px-8 py-3 font-sans text-sm font-medium tracking-wide text-white shadow-lg">
                        Open the envelope
                      </span>
                    )}
                  </div>

                  {/* letter sliding out — full width inset so text is never clipped */}
                  <motion.div
                    className={`absolute left-3 right-3 top-8 z-30 mx-auto w-auto max-w-none rounded-xl border border-white/60 bg-white/95 shadow-xl sm:left-4 sm:right-4 ${
                      phase === "sealed" ? "pointer-events-none" : "pointer-events-auto"
                    }`}
                    initial={false}
                    animate={{
                      y: phase === "sealed" ? 80 : phase === "opened" ? 8 : 8,
                      opacity: phase === "sealed" ? 0 : 1,
                      scale: phase === "sealed" ? 0.92 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 90, damping: 18 }}
                  >
                    <div className="px-5 py-6 text-center sm:px-8 sm:py-8">
                      <p className="font-display text-4xl text-love sm:text-5xl">For my Everthing</p>
                      <p className="mt-2 font-body text-sm italic text-love/70">With all my love — always.</p>
                      {phase === "opened" && (
                        <RippleButton
                          onClick={() => setPhase("revealed")}
                          className="mt-6 w-full rounded-xl border border-love/30 bg-blush/30 py-3 font-sans text-sm text-love"
                        >
                          Read the letter inside
                        </RippleButton>
                      )}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Full card flip for message */}
                {phase === "revealed" && (
                  <motion.div
                    className="mt-8 w-full"
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    transition={{ type: "spring", stiffness: 65, damping: 14 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <motion.div
                      className="relative min-h-[320px] w-full max-w-none rounded-2xl border border-love/25 bg-white/90 px-6 py-8 shadow-glow backdrop-blur-md sm:px-10 sm:py-10"
                      initial={{ rotateY: 0 }}
                      whileHover={{ rotateY: 2 }}
                      transition={{ type: "spring", stiffness: 120, damping: 20 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-love/10 via-transparent to-gold/10" />
                      <p className="relative whitespace-pre-line font-body text-base leading-relaxed text-love/95 md:text-lg">
                        {MESSAGE}
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
