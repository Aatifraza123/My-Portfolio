import React, { useEffect, useRef } from "react";

interface GhostPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
}

export function GhostCursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse positions & trail points
    const targetMouse = { x: width / 2, y: height / 2, active: false };
    const currentMouse = { x: width / 2, y: height / 2 };
    const ghostTrail: { x: number; y: number }[] = [];
    const MAX_TRAIL = 16;
    const particles: GhostPoint[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouse.x = e.clientX - rect.left;
      targetMouse.y = e.clientY - rect.top;
      targetMouse.active = true;

      // Spawn subtle ghost spark particles on move
      if (Math.random() < 0.6) {
        particles.push({
          x: targetMouse.x + (Math.random() - 0.5) * 20,
          y: targetMouse.y + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          size: Math.random() * 2.5 + 1,
          alpha: 0.8,
          maxAlpha: 0.8,
        });
      }
    };

    const handleMouseLeave = () => {
      targetMouse.active = false;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    // Animation Loop
    const render = () => {
      // Smooth interpolation for main ghost head
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.15;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.15;

      // Update ghost trail history
      if (targetMouse.active || ghostTrail.length > 0) {
        ghostTrail.unshift({ x: currentMouse.x, y: currentMouse.y });
        if (ghostTrail.length > MAX_TRAIL) {
          ghostTrail.pop();
        }
      }

      ctx.clearRect(0, 0, width, height);

      // Draw Ghost Cursor Glow Trail
      if (ghostTrail.length > 1) {
        // Draw connected soft ghost aura path
        ctx.beginPath();
        ctx.moveTo(ghostTrail[0].x, ghostTrail[0].y);
        for (let i = 1; i < ghostTrail.length; i++) {
          const xc = (ghostTrail[i].x + ghostTrail[i - 1].x) / 2;
          const yc = (ghostTrail[i].y + ghostTrail[i - 1].y) / 2;
          ctx.quadraticCurveTo(ghostTrail[i - 1].x, ghostTrail[i - 1].y, xc, yc);
        }
        ctx.strokeStyle = "rgba(59, 130, 246, 0.15)";
        ctx.lineWidth = 12;
        ctx.lineCap = "round";
        ctx.stroke();

        // Draw individual ghost nodes in trail
        for (let i = 0; i < ghostTrail.length; i++) {
          const pt = ghostTrail[i];
          const progress = 1 - i / ghostTrail.length;
          const radius = progress * 24 + 4;
          const opacity = progress * 0.25;

          const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, radius);
          grad.addColorStop(0, `rgba(59, 130, 246, ${opacity * 1.5})`);
          grad.addColorStop(0.5, `rgba(147, 51, 234, ${opacity * 0.8})`);
          grad.addColorStop(1, "rgba(59, 130, 246, 0)");

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw crisp center core of primary ghost cursor
        if (targetMouse.active && ghostTrail.length > 0) {
          const head = ghostTrail[0];
          ctx.fillStyle = "#3b82f6";
          ctx.shadowColor = "#3b82f6";
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.arc(head.x, head.y, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Render & update floating spark particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(192, 132, 252, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full z-0 opacity-80"
    />
  );
}
