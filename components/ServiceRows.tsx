"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Service } from "@/content/services";

/**
 * The services as a hairline list. A row expands in place when pressed; one
 * open at a time. The expansion animates height because that is what changed.
 */
export function ServiceRows({ services }: { services: readonly Service[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const baseId = useId();
  const reduce = useReducedMotion();

  return (
    <ul className="border-t border-rule">
      {services.map((s) => {
        const isOpen = open === s.slug;
        const panelId = `${baseId}-${s.slug}`;
        return (
          <li key={s.slug} className="border-b border-rule">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : s.slug)}
                className="group flex w-full items-start justify-between gap-6 rounded-1 py-6 text-left"
              >
                <span>
                  <span className="block text-title">{s.name}</span>
                  <span className="mt-2 block max-w-[52ch] text-body text-mute">{s.summary}</span>
                </span>
                {/* A rounded-rect marker in the brand radius, turned when open. */}
                <span
                  aria-hidden
                  className={`mt-3 block h-[22px] w-[14px] shrink-0 rounded-1 border border-ink transition-[transform,background-color] duration-200 ease-out group-hover:bg-ink ${
                    isOpen ? "rotate-90 bg-ink" : ""
                  }`}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  key="panel"
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.26, ease: "easeOut" }}
                >
                  <div className="grid gap-x-6 gap-y-6 pb-8 md:grid-cols-2">
                    <div>
                      <h4 className="text-small text-mute">What you get</h4>
                      <ul className="mt-3 space-y-2">
                        {s.receive.map((r) => (
                          <li key={r} className="border-l border-ink pl-4">
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-small text-mute">Who it&rsquo;s for</h4>
                      <p className="mt-3 max-w-[40ch]">{s.who}</p>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
