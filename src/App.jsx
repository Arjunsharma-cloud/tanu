import { useEffect, useState } from "react";
import { UNLOCK_DATE } from "./constants";
import { useCountdown } from "./hooks/useCountdown";
import { CountdownView } from "./components/CountdownView";
import { CursorHearts } from "./components/CursorHearts";
import { FloatingBackground } from "./components/FloatingBackground";
import { SurpriseExperience } from "./components/SurpriseExperience";

export default function App() {
  const countdown = useCountdown(UNLOCK_DATE);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handle = (e) => {
      setMouse({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("pointermove", handle, { passive: true });
    return () => window.removeEventListener("pointermove", handle);
  }, []);

  return (
    <div className="relative min-h-screen">
      <FloatingBackground mouse={mouse} />
      <CursorHearts />

      {countdown.isUnlocked ? (
        <SurpriseExperience mouse={mouse} />
      ) : (
        <CountdownView countdown={countdown} />
      )}
    </div>
  );
}
