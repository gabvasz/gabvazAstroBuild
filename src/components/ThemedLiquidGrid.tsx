import { useEffect, useState } from "react";
import LiquidGrid from "./LiquidGrid";

type Theme = "light" | "dark";

// glowColor must be #RRGGBB or rgb(); lineColor may carry alpha.
const palettes: Record<Theme, { lineColor: string; glowColor: string }> = {
  light: { lineColor: "#22080026", glowColor: "#ff6c18" },
  dark: { lineColor: "#F7F6F233", glowColor: "#ff6c18" },
};

export default function ThemedLiquidGrid() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const root = document.documentElement;
    const read = () => setTheme(root.dataset.theme === "dark" ? "dark" : "light");
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const p = palettes[theme];

  return (
    <LiquidGrid
      mode="dots"
      background="rgba(0,0,0,0)"
      lineColor={p.lineColor}
      glowColor={p.glowColor}
      cellSize={20}
      lineWidth={1}
      radius={58}
      intensity={30}
      collide={true}
      clickRipple={true}
    />
  );
}