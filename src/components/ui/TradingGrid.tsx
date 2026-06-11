"use client";

import { useRef, useEffect } from "react";

const GREEN = "#0BB158";

export function TradingGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    // Resize canvas to match parent
    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.parentElement!.getBoundingClientRect();
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      canvas!.style.width = `${rect.width}px`;
      canvas!.style.height = `${rect.height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    const isMobile = window.innerWidth < 768;

    // Price line config
    const lineCount = isMobile ? 2 : 3;
    const lines = Array.from({ length: lineCount }, (_, i) => ({
      yBase: 0.25 + i * 0.25,
      speed: 0.3 + i * 0.15,
      amplitude: 20 + i * 10,
      frequency: 0.008 + i * 0.003,
      opacity: 0.06 + i * 0.04,
      phase: i * 2,
    }));

    // Particles
    const particleCount = isMobile ? 8 : 15;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      speed: 0.1 + Math.random() * 0.2,
      size: 1 + Math.random() * 1.5,
      opacity: Math.random(),
      fadeSpeed: 0.005 + Math.random() * 0.01,
      fadeDir: 1 as 1 | -1,
    }));

    // Horizontal grid lines
    const gridLines = [0.2, 0.35, 0.5, 0.65, 0.8];

    function draw() {
      const w = canvas!.width / (window.devicePixelRatio || 1);
      const h = canvas!.height / (window.devicePixelRatio || 1);

      ctx!.clearRect(0, 0, w, h);

      // 1. Dot grid (desktop only)
      if (!isMobile) {
        const spacing = 40;
        ctx!.fillStyle = GREEN;
        ctx!.globalAlpha = 0.06;
        for (let x = spacing; x < w; x += spacing) {
          for (let y = spacing; y < h; y += spacing) {
            ctx!.beginPath();
            ctx!.arc(x, y, 0.8, 0, Math.PI * 2);
            ctx!.fill();
          }
        }
      }

      // 2. Horizontal grid lines (dashed)
      ctx!.setLineDash([6, 8]);
      ctx!.lineWidth = 1;
      for (const ratio of gridLines) {
        ctx!.globalAlpha = 0.04;
        ctx!.strokeStyle = GREEN;
        ctx!.beginPath();
        ctx!.moveTo(0, h * ratio);
        ctx!.lineTo(w, h * ratio);
        ctx!.stroke();
      }
      ctx!.setLineDash([]);

      // 3. Animated price lines
      for (const line of lines) {
        const yCenter = h * line.yBase;
        ctx!.beginPath();
        ctx!.strokeStyle = GREEN;
        ctx!.lineWidth = 1.5;
        ctx!.globalAlpha = line.opacity;

        const offset = time * line.speed * 60;

        for (let x = 0; x <= w; x++) {
          const noiseX = (x + offset) * line.frequency;
          const y =
            yCenter +
            Math.sin(noiseX + line.phase) * line.amplitude +
            Math.sin(noiseX * 2.3 + line.phase * 0.7) * (line.amplitude * 0.4) +
            Math.sin(noiseX * 0.5 + line.phase * 1.3) * (line.amplitude * 0.6);

          if (x === 0) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        }
        ctx!.stroke();

        // Glowing leading edge (right side)
        const tipX = w;
        const tipNoiseX = (tipX + offset) * line.frequency;
        const tipY =
          yCenter +
          Math.sin(tipNoiseX + line.phase) * line.amplitude +
          Math.sin(tipNoiseX * 2.3 + line.phase * 0.7) * (line.amplitude * 0.4) +
          Math.sin(tipNoiseX * 0.5 + line.phase * 1.3) * (line.amplitude * 0.6);

        // Glow
        const gradient = ctx!.createRadialGradient(tipX, tipY, 0, tipX, tipY, 12);
        gradient.addColorStop(0, GREEN);
        gradient.addColorStop(1, "transparent");
        ctx!.globalAlpha = line.opacity * 2.5;
        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(tipX, tipY, 12, 0, Math.PI * 2);
        ctx!.fill();

        // Bright dot
        ctx!.globalAlpha = line.opacity * 4;
        ctx!.fillStyle = GREEN;
        ctx!.beginPath();
        ctx!.arc(tipX, tipY, 2.5, 0, Math.PI * 2);
        ctx!.fill();
      }

      // 4. Floating micro-particles
      ctx!.fillStyle = GREEN;
      for (const p of particles) {
        p.y -= (p.speed * 0.3) / h;
        if (p.y < -0.05) {
          p.y = 1.05;
          p.x = Math.random();
        }

        p.opacity += p.fadeSpeed * p.fadeDir;
        if (p.opacity >= 1) {
          p.opacity = 1;
          p.fadeDir = -1;
        } else if (p.opacity <= 0) {
          p.opacity = 0;
          p.fadeDir = 1;
        }

        ctx!.globalAlpha = p.opacity * 0.15;
        ctx!.beginPath();
        ctx!.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.globalAlpha = 1;
      time += 1 / 60;
      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
