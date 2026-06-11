"use client";

import { useEffect, useRef } from "react";

interface ChartLine {
  yBase: number;
  amplitude: number;
  frequency: number;
  speed: number;
  phase: number;
  opacity: number;
  drift: number;
  driftSpeed: number;
}

export function ChartBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const linesRef = useRef<ChartLine[]>([]);
  const animRef = useRef<number>(0);
  const isMobileRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    isMobileRef.current = isMobile;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = window.innerWidth + "px";
      canvas!.style.height = window.innerHeight + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      initLines();
    }

    function initLines() {
      const count = isMobileRef.current ? 3 : 6;
      const h = window.innerHeight;
      const lines: ChartLine[] = [];
      for (let i = 0; i < count; i++) {
        const t = (i + 1) / (count + 1);
        lines.push({
          yBase: h * t,
          amplitude: 20 + Math.random() * 40,
          frequency: 0.002 + Math.random() * 0.003,
          speed: 0.3 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2,
          opacity: 0.04 + Math.random() * 0.08,
          drift: 0,
          driftSpeed: 0.0003 + Math.random() * 0.0004,
        });
      }
      linesRef.current = lines;
    }

    function handleMouseMove(e: MouseEvent) {
      if (!isMobileRef.current) {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      }
    }

    function handleMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
    }

    resize();
    window.addEventListener("resize", resize);
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleMouseLeave);
    }

    let time = 0;

    function draw() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx!.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const lines = linesRef.current;

      time += 1;

      for (let li = 0; li < lines.length; li++) {
        const line = lines[li];
        line.drift = Math.sin(time * line.driftSpeed) * 30;

        const step = 3;
        const totalPoints = Math.ceil(w / step) + 1;

        // Compute y positions
        const ys: number[] = new Array(totalPoints);
        for (let i = 0; i < totalPoints; i++) {
          const x = i * step;
          const wave1 = Math.sin((x + time * line.speed) * line.frequency + line.phase) * line.amplitude;
          const wave2 = Math.sin((x + time * line.speed * 0.7) * line.frequency * 1.8 + line.phase * 2) * line.amplitude * 0.3;
          ys[i] = line.yBase + wave1 + wave2 + line.drift;
        }

        // Mouse proximity — find closest point distance
        let lineOpacity = line.opacity;
        if (!isMobileRef.current && mx > 0) {
          let minDist = Infinity;
          // Sample every 10th point for performance
          for (let i = 0; i < totalPoints; i += 10) {
            const x = i * step;
            const dy = ys[i] - my;
            const dx = x - mx;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < minDist) minDist = d;
          }
          if (minDist < 200) {
            const boost = (1 - minDist / 200) * 0.15;
            lineOpacity = Math.min(line.opacity + boost, 0.3);
          }
        }

        // Draw line with glow
        ctx!.beginPath();
        ctx!.moveTo(0, ys[0]);
        for (let i = 1; i < totalPoints; i++) {
          ctx!.lineTo(i * step, ys[i]);
        }
        ctx!.strokeStyle = `rgba(11, 177, 88, ${lineOpacity})`;
        ctx!.lineWidth = 1.5;
        ctx!.stroke();

        // Glowing leading tip
        const tipX = w;
        const tipY = ys[totalPoints - 1];
        const grad = ctx!.createRadialGradient(tipX, tipY, 0, tipX, tipY, 40);
        grad.addColorStop(0, `rgba(11, 177, 88, ${lineOpacity * 3})`);
        grad.addColorStop(1, "rgba(11, 177, 88, 0)");
        ctx!.fillStyle = grad;
        ctx!.fillRect(tipX - 40, tipY - 40, 80, 80);

        // Fade trail on left edge
        const fadeGrad = ctx!.createLinearGradient(0, 0, 80, 0);
        fadeGrad.addColorStop(0, "rgba(1, 1, 1, 1)");
        fadeGrad.addColorStop(1, "rgba(1, 1, 1, 0)");
        ctx!.fillStyle = fadeGrad;
        ctx!.fillRect(0, ys[0] - line.amplitude - 50, 80, line.amplitude * 2 + 100);
      }

      // Cursor glow
      if (!isMobileRef.current && mx > 0) {
        const cursorGrad = ctx!.createRadialGradient(mx, my, 0, mx, my, 200);
        cursorGrad.addColorStop(0, "rgba(11, 177, 88, 0.04)");
        cursorGrad.addColorStop(1, "rgba(11, 177, 88, 0)");
        ctx!.fillStyle = cursorGrad;
        ctx!.fillRect(mx - 200, my - 200, 400, 400);
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "#010101" }}
      aria-hidden="true"
    />
  );
}
