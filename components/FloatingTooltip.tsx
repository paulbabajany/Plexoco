"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

/**
 * A tooltip that follows the pointer, leaning slightly into the direction of
 * travel. Brought in from a reference component and restyled to the site's
 * tokens: ink on paper by default, paper on ink inside `on-ink` surfaces,
 * brand radius, no bold. Hover only, so it is supplementary by design: the
 * text it shows must also be available some other way for keyboard and
 * touch readers.
 *
 * Reduced motion: the tooltip still appears, but it stops following the
 * pointer with a spring and does not skew.
 */

type Tone = "paper" | "ink";

type Ctx = {
  set: (content: string, description?: string) => void;
  setActive: (active: boolean) => void;
};

const TooltipContext = createContext<Ctx | null>(null);

const tones: Record<Tone, string> = {
  paper: "bg-ink text-paper",
  ink: "bg-paper text-ink",
};

export function FloatingTooltipProvider({
  children,
  tone = "paper",
}: {
  children: ReactNode;
  /** `paper` for tooltips over the page ground, `ink` for use inside an ink surface. */
  tone?: Tone;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spring = { damping: 45, stiffness: 750 };
  const smoothX = useSpring(x, spring);
  const smoothY = useSpring(y, spring);

  const velocityX = useVelocity(smoothX);
  const velocityY = useVelocity(smoothY);
  const scaleX = useTransform(velocityX, [-1000, 0, 1000], [0.92, 1, 1.1]);
  const scaleY = useTransform(velocityY, [-1000, 0, 1000], [1.1, 1, 0.92]);
  const skewX = useTransform(velocityX, [-1000, 0, 1000], [-3, 0, 3]);
  const skewY = useTransform(velocityY, [-1000, 0, 1000], [-3, 0, 3]);

  const [active, setActive] = useState(false);
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Pointer only: a coarse pointer has no hover, so the tooltip never shows there.
    if (window.matchMedia("(hover: none)").matches) return;
    const zoom = () => {
      const z = parseFloat(getComputedStyle(document.documentElement).zoom || "1");
      return Number.isFinite(z) && z > 0 ? z : 1;
    };
    const onMove = (e: MouseEvent) => {
      const z = zoom();
      x.set(e.clientX / z);
      y.set(e.clientY / z);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  const ctx: Ctx = {
    set: (c, d) => {
      setContent(c);
      setDescription(d ?? "");
    },
    setActive,
  };

  return (
    <TooltipContext.Provider value={ctx}>
      {children}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {active && content ? (
              <motion.div
                aria-hidden
                className="pointer-events-none fixed top-0 left-0 z-50"
                style={{ x: reduce ? x : smoothX, y: reduce ? y : smoothY }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                <motion.div
                  layout
                  className={`mt-4 ml-4 rounded-2 px-3.5 py-2.5 text-small ${tones[tone]}`}
                  style={reduce ? undefined : { scaleX, scaleY, skewX, skewY }}
                  transition={{ layout: { type: "spring", damping: 25, stiffness: 400 } }}
                >
                  <motion.div
                    key={content}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col gap-1"
                  >
                    <span className="whitespace-nowrap font-medium">{content}</span>
                    {description ? (
                      <span className="max-w-[28ch] leading-snug opacity-70">{description}</span>
                    ) : null}
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body
        )}
    </TooltipContext.Provider>
  );
}

export function FloatingTooltipTrigger({
  children,
  content,
  description,
  className,
}: {
  children: ReactNode;
  content: string;
  description?: string;
  className?: string;
}) {
  const ctx = useContext(TooltipContext);
  if (!ctx) throw new Error("FloatingTooltipTrigger must be used inside FloatingTooltipProvider");

  return (
    <div
      className={className}
      onMouseEnter={() => {
        ctx.set(content, description);
        ctx.setActive(true);
      }}
      onMouseLeave={() => ctx.setActive(false)}
    >
      {children}
    </div>
  );
}

export const FloatingTooltip = {
  Provider: FloatingTooltipProvider,
  Trigger: FloatingTooltipTrigger,
};
