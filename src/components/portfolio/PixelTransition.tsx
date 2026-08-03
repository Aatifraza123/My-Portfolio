import React, { useEffect, useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

interface PixelTransitionProps {
  pixelSize?: number;
  className?: string;
  mode?: "enter" | "exit";
}

export function PixelTransition({ pixelSize = 8, className = "", mode = "enter" }: PixelTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progressY = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resize();
    window.addEventListener("resize", resize);

    const cols = () => Math.ceil(canvas.width / pixelSize);
    const rows = () => Math.ceil(canvas.height / pixelSize);

    const render = () => {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const p = progressY.get();
      const numCols = cols();
      const numRows = rows();

      for (let r = 0; r < numRows; r++) {
        const rowProgress = r / numRows;
        for (let c = 0; c < numCols; c++) {
          const colNoise = Math.sin(c * 12.9898 + r * 78.233) * 43758.5453;
          const pseudoRandom = colNoise - Math.floor(colNoise);

          const threshold = rowProgress * 0.7 + pseudoRandom * 0.3;
          const isTriggered = p >= threshold;

          const x = c * pixelSize;
          const y = r * pixelSize;

          if (mode === "enter") {
            // Dark to Light
            if (isTriggered) {
              const lightAlpha = Math.min(1, (p - threshold) * 4);
              const electricGlow = pseudoRandom > 0.88;
              if (electricGlow && lightAlpha > 0.5) {
                ctx.fillStyle = `rgba(59, 130, 246, ${0.4 * lightAlpha})`;
              } else {
                const bgVal = Math.floor(244 + pseudoRandom * 11);
                ctx.fillStyle = `rgba(${bgVal}, ${bgVal}, ${bgVal + 2}, ${lightAlpha})`;
              }
              ctx.fillRect(x, y, pixelSize - 1, pixelSize - 1);
            } else {
              const darkAlpha = Math.max(0, 1 - (p - threshold) * 2);
              const isElectric = pseudoRandom > 0.93;
              if (isElectric && darkAlpha > 0.2) {
                ctx.fillStyle = `rgba(59, 130, 246, ${0.6 * darkAlpha})`;
              } else {
                ctx.fillStyle = `rgba(5, 5, 5, ${darkAlpha})`;
              }
              ctx.fillRect(x, y, pixelSize - 1, pixelSize - 1);
            }
          } else {
            // Exit mode: Light to Dark
            if (isTriggered) {
              const darkAlpha = Math.min(1, (p - threshold) * 4);
              const isElectric = pseudoRandom > 0.88;
              if (isElectric && darkAlpha > 0.5) {
                ctx.fillStyle = `rgba(59, 130, 246, ${0.5 * darkAlpha})`;
              } else {
                ctx.fillStyle = `rgba(5, 5, 5, ${darkAlpha})`;
              }
              ctx.fillRect(x, y, pixelSize - 1, pixelSize - 1);
            } else {
              const lightAlpha = Math.max(0, 1 - (p - threshold) * 2);
              const electricGlow = pseudoRandom > 0.92;
              if (electricGlow && lightAlpha > 0.2) {
                ctx.fillStyle = `rgba(59, 130, 246, ${0.4 * lightAlpha})`;
              } else {
                const bgVal = Math.floor(244 + pseudoRandom * 11);
                ctx.fillStyle = `rgba(${bgVal}, ${bgVal}, ${bgVal + 2}, ${lightAlpha})`;
              }
              ctx.fillRect(x, y, pixelSize - 1, pixelSize - 1);
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pixelSize, progressY, mode]);

  const bgGradient =
    mode === "enter"
      ? "bg-gradient-to-b from-[#050505] via-[#0d0d11] to-[#ffffff]"
      : "bg-gradient-to-b from-[#ffffff] via-[#0d0d11] to-[#050505]";

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-20 md:h-28 overflow-hidden ${bgGradient} ${className}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />
    </div>
  );
}
