import { useEffect, useState } from "react";

const useCountdown = (target) => {
  const [left, setLeft] = useState(target.getTime() - Date.now());

  useEffect(() => {
    const id = setInterval(() => setLeft(target.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  const clamped = Math.max(left, 0);
  const h = Math.floor(clamped / 3.6e6).toString().padStart(2, "0");
  const m = Math.floor((clamped % 3.6e6) / 6e4).toString().padStart(2, "0");
  const s = Math.floor((clamped % 6e4) / 1000).toString().padStart(2, "0");
  return `${h} : ${m} : ${s}`;
};

export default useCountdown;
