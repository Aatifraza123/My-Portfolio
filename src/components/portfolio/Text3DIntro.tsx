import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Text3DIntroProps {
  onComplete: () => void;
}

export function Text3DIntro({ onComplete }: Text3DIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Increment loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsReady(true);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  // Canvas 3D Text Rendering with lighting, depth extrusion & particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse 3D rotation angles
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0;
    let rotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / width - 0.5) * 2;
      mouseY = (e.clientY / height - 0.5) * 2;
      targetRotY = mouseX * 0.45; // Yaw
      targetRotX = -mouseY * 0.35; // Pitch
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 3D Particles
    const particles = Array.from({ length: 90 }, () => ({
      x: (Math.random() - 0.5) * width * 1.5,
      y: (Math.random() - 0.5) * height * 1.5,
      z: Math.random() * 800 + 100,
      vz: Math.random() * 2 + 0.5,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.7 + 0.3,
    }));

    let time = 0;

    const render = () => {
      time += 0.02;

      // Smooth rotation dampening
      rotX += (targetRotX - rotX) * 0.08;
      rotY += (targetRotY - rotY) * 0.08;

      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      // Draw subtle background 3D Grid
      ctx.save();
      ctx.translate(width / 2, height / 2);
      const fov = 400;

      // Render 3D Floating Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.z -= p.vz;
        if (p.z <= 10) {
          p.z = 800;
          p.x = (Math.random() - 0.5) * width * 1.5;
          p.y = (Math.random() - 0.5) * height * 1.5;
        }

        const scale = fov / p.z;
        const px = p.x * scale;
        const py = p.y * scale;

        if (px > -width / 2 && px < width / 2 && py > -height / 2 && py < height / 2) {
          const particleAlpha = Math.min(1, (800 - p.z) / 400) * p.alpha;
          ctx.fillStyle = `rgba(59, 130, 246, ${particleAlpha})`;
          ctx.beginPath();
          ctx.arc(px, py, p.size * scale, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // Render 3D Extruded Text "AATIF RAZA"
      ctx.save();
      ctx.translate(width / 2, height / 2);

      // Compute font size based on screen width
      const fontSize = Math.min(width * 0.12, 110);
      ctx.font = `900 ${fontSize}px "Fraunces", "Times New Roman", serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const text = "AATIF RAZA";
      const depthLayers = 28; // Extrusion depth

      // Draw 3D Extrusion Back-to-Front
      for (let i = depthLayers; i >= 0; i--) {
        const depthOffset = i * 1.8;
        const offsetX = Math.sin(rotY) * depthOffset + rotY * 15;
        const offsetY = Math.sin(rotX) * depthOffset + rotX * 15;

        const isFront = i === 0;

        ctx.save();
        ctx.translate(offsetX, offsetY);

        if (isFront) {
          // Front face glow & light gradient
          const grad = ctx.createLinearGradient(
            -width / 4,
            -height / 4,
            width / 4,
            height / 4
          );
          grad.addColorStop(0, "#ffffff");
          grad.addColorStop(0.4, "#f5f5f5");
          grad.addColorStop(0.7, "#3b82f6");
          grad.addColorStop(1, "#60a5fa");

          ctx.shadowColor = "rgba(59, 130, 246, 0.8)";
          ctx.shadowBlur = 35 + Math.sin(time * 2) * 10;
          ctx.fillStyle = grad;
          ctx.fillText(text, 0, 0);

          // Specular stroke highlight
          ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
          ctx.lineWidth = 2;
          ctx.strokeText(text, 0, 0);
        } else {
          // Extrusion sides shading with lighting direction
          const shadowFactor = 1 - i / depthLayers;
          const r = Math.floor(15 + shadowFactor * 40);
          const g = Math.floor(25 + shadowFactor * 80);
          const b = Math.floor(60 + shadowFactor * 180);
          const alpha = 0.85;

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.fillText(text, 0, 0);

          if (i === depthLayers) {
            // Drop shadow behind 3D text
            ctx.shadowColor = "rgba(0, 0, 0, 0.95)";
            ctx.shadowBlur = 40;
            ctx.shadowOffsetY = 20;
            ctx.fillText(text, 0, 0);
          }
        }

        ctx.restore();
      }

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Auto-finish once progress hits 100% after short pause
  useEffect(() => {
    if (isReady) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isReady, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[#050505] p-8 select-none"
    >
      {/* Top Header */}
      <div className="flex w-full items-center justify-between font-mono text-xs uppercase tracking-[0.25em] text-bone/50 z-10">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-electric animate-pulse" />
          <span>SYSTEM LOADING</span>
        </div>
        <div>EXPERIENCE ’26</div>
      </div>

      {/* Center 3D Text Canvas */}
      <div className="relative flex h-full w-full items-center justify-center">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      </div>

      {/* Bottom Progress Bar & Enter Action */}
      <div className="z-10 flex w-full max-w-md flex-col items-center gap-4 text-center">
        <div className="flex w-full items-center justify-between font-mono text-xs text-bone/60">
          <span>AATIF RAZA PORTFOLIO</span>
          <span>{progress}%</span>
        </div>

        {/* Progress Bar Container */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-bone/10 p-0.5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-electric via-blue-400 to-purple-500 shadow-[0_0_12px_var(--electric)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.2 }}
          />
        </div>

        {/* Enter Button or Instruction */}
        <motion.button
          onClick={onComplete}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-2 rounded-full border border-electric/40 bg-electric/10 px-6 py-2 font-mono text-xs uppercase tracking-[0.2em] text-bone transition-colors hover:border-electric hover:bg-electric hover:text-ink"
        >
          {isReady ? "ENTER PORTFOLIO →" : "SKIP INTRO"}
        </motion.button>
      </div>
    </motion.div>
  );
}
