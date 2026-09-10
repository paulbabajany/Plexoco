import Link from "next/link";
import type { ComponentProps } from "react";

type Tone = "paper" | "ink";

const base =
  "inline-flex h-11 items-center justify-center rounded-2 border px-5 font-medium leading-none " +
  "transition-[background-color,color] duration-150 ease-out active:scale-[0.98] motion-reduce:active:scale-100";

// On paper the button is ink and inverts on hover. On the ink surface it is paper and inverts back.
const tones: Record<Tone, string> = {
  paper: "border-ink bg-ink text-paper hover:bg-paper hover:text-ink",
  ink: "border-paper bg-paper text-ink hover:bg-ink hover:text-paper",
};

type LinkProps = { href: string; tone?: Tone; className?: string } & Omit<
  ComponentProps<typeof Link>,
  "href" | "className"
>;

export function ButtonLink({ href, tone = "paper", className = "", ...rest }: LinkProps) {
  return <Link href={href} className={`${base} ${tones[tone]} ${className}`} {...rest} />;
}

type ButtonProps = { tone?: Tone; className?: string } & ComponentProps<"button">;

export function Button({ tone = "paper", className = "", type = "button", ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={`${base} ${tones[tone]} disabled:cursor-wait disabled:opacity-60 ${className}`}
      {...rest}
    />
  );
}
