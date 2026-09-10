"use client";

import { useEffect, useRef } from "react";

/**
 * A faint particle field on a transparent canvas: small glyphs drifting down,
 * hairline beams drifting up, proximity lines between near glyphs, and a
 * pull toward the pointer. Rebuilt from a reference "particle drift" effect
 * that lived in a sandboxed iframe with CDN scripts; this is the canvas part
 * only, in the site's ink with the accent blue for what is near the pointer.
 *
 * Decorative and aria-hidden. It draws only while on screen, stops when the
 * tab is hidden (requestAnimationFrame does that), and under reduced motion
 * renders one still frame with no pointer interaction.
 */

const CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*()".split("");
const REF_AREA = 1440 * 650; // the reference's canvas; counts scale with area
const LINK = 120; // px, proximity line reach
const REACH = 180; // px, pointer reach

type Node = { x: number; y: number; vy: number; char: string };
type Beam = { x: number; y: number; length: number; speed: number; alpha: number };

function rgbOf(cssVar: string, fallback: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim() || fallback;
  const m = v.match(/^#([0-9a-f]{6})$/i);
  if (!m) return fallback;
  const n = parseInt(m[1], 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

export function ParticleField({
  className = "",
  /** Scales every alpha. 1 is quiet; 0.5 is barely there. */
  intensity = 1,
  /** Scales particle counts. */
  density = 1,
}: {
  className?: string;
  intensity?: number;
  density?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ink = rgbOf("--color-ink", "30, 30, 30");
    const live = rgbOf("--color-live", "27, 95, 181");

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let beams: Beam[] = [];
    const mouse = { x: -1e4, y: -1e4 };
    let raf = 0;
    let visible = true;

    const pick = () => CHARS[Math.floor(Math.random() * CHARS.length)];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const scale = ((width * height) / REF_AREA) * density;
      nodes = Array.from({ length: Math.max(20, Math.round(90 * scale)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: Math.random() * 0.4 + 0.1,
        char: pick(),
      }));
      beams = Array.from({ length: Math.max(5, Math.round(25 * scale)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 100 + 50,
        speed: Math.random() * 6 + 3,
        alpha: Math.random() * 0.5 + 0.3,
      }));
    };

    const draw = (animate: boolean) => {
      ctx.clearRect(0, 0, width, height);

      // Beams: hairlines rising, the same gesture as the logo's rule stood on end.
      ctx.lineWidth = 1;
      for (const b of beams) {
        if (animate) {
          b.y -= b.speed;
          if (b.y + b.length < 0) {
            b.y = height + 100;
            b.x = Math.random() * width;
          }
        }
        const g = ctx.createLinearGradient(b.x, b.y, b.x, b.y + b.length);
        g.addColorStop(0, `rgba(${ink}, ${0.16 * b.alpha * intensity})`);
        g.addColorStop(1, `rgba(${ink}, 0)`);
        ctx.strokeStyle = g;
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(b.x, b.y + b.length);
        ctx.stroke();
      }

      // Proximity lines between near glyphs.
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const c = nodes[j];
          const d = Math.hypot(a.x - c.x, a.y - c.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(${ink}, ${0.1 * (1 - d / LINK) * intensity})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(c.x, c.y);
            ctx.stroke();
          }
        }
      }

      // Glyphs, with the pointer pulling lines from anything within reach.
      ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const n of nodes) {
        if (animate) {
          n.y += n.vy;
          if (n.y > height + 20) {
            n.y = -20;
            n.x = Math.random() * width;
          }
        }
        const d = animate ? Math.hypot(mouse.x - n.x, mouse.y - n.y) : Infinity;
        if (animate && (d < REACH || Math.random() > 0.98)) n.char = pick();
        if (d < REACH) {
          ctx.lineWidth = 0.5;
          ctx.strokeStyle = `rgba(${live}, ${0.4 * (1 - d / REACH) * intensity})`;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          ctx.fillStyle = `rgba(${live}, ${0.7 * intensity})`;
        } else {
          ctx.fillStyle = `rgba(${ink}, ${0.26 * intensity})`;
        }
        ctx.fillText(n.char, n.x, n.y);
      }
    };

    const loop = () => {
      if (!visible) return;
      draw(true);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -1e4;
      mouse.y = -1e4;
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(false);
    });
    ro.observe(canvas);

    if (reduce) {
      draw(false);
      return () => ro.disconnect();
    }

    // Only animate while the field is on screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [intensity, density]);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none ${className}`} />;
}
