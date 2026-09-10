"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { nav } from "@/content/site";

function NavLinks({ onNavigate, className = "" }: { onNavigate?: () => void; className?: string }) {
  const pathname = usePathname();
  return (
    <ul className={className}>
      {nav.map((item) => {
        const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={current ? "page" : undefined}
              onClick={onNavigate}
              className={`inline-block py-2 underline-offset-[6px] decoration-1 hover:underline ${
                current ? "underline" : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const pathname = usePathname();
  const reduce = useReducedMotion();

  // Close the panel on navigation and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav aria-label="Main">
      <NavLinks className="hidden gap-8 md:flex" />

      <button
        type="button"
        className="rounded-1 px-1 py-2 md:hidden"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Close" : "Menu"}
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="panel"
            className="absolute inset-x-0 top-full overflow-hidden bg-paper md:hidden"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: "easeOut" }}
          >
            <div className="rule-bleed" aria-hidden />
            <NavLinks
              onNavigate={() => setOpen(false)}
              className="content flex flex-col gap-1 py-6 text-title"
            />
            <div className="rule-bleed" aria-hidden />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}
