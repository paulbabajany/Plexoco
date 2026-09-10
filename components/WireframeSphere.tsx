"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

const RINGS = 12; // layered great circles; higher is denser
const TILT = 7; // degrees of pointer tilt at the viewport's edges

/**
 * A wireframe sphere drawn from hairline circles in ink, rotating slowly, with
 * a slight tilt toward the pointer. Brought in from a reference "geometric
 * sphere" hero and reduced to the one part that belongs here: the mesh. No
 * glow, no grid, no grain. Decorative, hidden from assistive tech.
 *
 * Reduced motion: no rotation, no tilt, a fixed three-quarter view.
 */
export function WireframeSphere({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });
  const rotateX = useTransform(sy, [-1, 1], [TILT, -TILT]);
  const rotateY = useTransform(sx, [-1, 1], [-TILT, TILT]);

  useEffect(() => {
    if (reduce || window.matchMedia("(hover: none)").matches) return;
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, mx, my]);

  const step = 90 / (RINGS / 2);

  return (
    <div aria-hidden className={className} style={{ perspective: 1200 }}>
      <motion.div
        className="relative size-full"
        style={{
          rotateX: reduce ? 0 : rotateX,
          rotateY: reduce ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="sphere-spin absolute inset-0">
          {Array.from({ length: RINGS }, (_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border border-ink/25"
              style={{
                transform: i % 2 === 0 ? `rotateY(${i * step}deg)` : `rotateX(${i * step}deg)`,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
