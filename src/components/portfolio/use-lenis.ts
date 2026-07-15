import { useEffect } from "react";

export function useLenis() {
  useEffect(() => {
    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let cancelled = false;
    (async () => {
      const Lenis = (await import("lenis")).default;
      if (cancelled) return;
      lenis = new Lenis({ duration: 1.2, smoothWheel: true, lerp: 0.09 }) as never;
      const loop = (t: number) => {
        lenis?.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);
}
