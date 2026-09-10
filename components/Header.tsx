import Link from "next/link";
import { Logo } from "./Logo";
import { Nav } from "./Nav";
import { site } from "@/content/site";

export function Header() {
  return (
    <header className="content relative">
      <div className="flex h-16 items-center justify-between md:h-[4.5rem]">
        <Link
          href="/"
          aria-label={`${site.name}, home`}
          className="block rounded-1 text-ink opacity-90 transition-opacity duration-150 hover:opacity-100 focus-visible:opacity-100"
        >
          {/* Full lockup above 480px; below that the hairlines would turn to mush, so the monogram takes over. */}
          <Logo variant="lockup" decorative className="hidden h-10 w-auto xs:block md:h-12" />
          <Logo variant="monogram" decorative className="h-8 w-auto xs:hidden" />
        </Link>
        <Nav />
      </div>
      <div className="rule-bleed" aria-hidden />
    </header>
  );
}
