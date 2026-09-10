import { Section } from "./Section";

/**
 * Reserved for proof (results, client work) once there is something true to
 * put here. It sits between "How we work" and the contact CTA on the home page
 * and renders nothing until `items` has content, so adding proof later is a
 * content change, not a layout change.
 */
export type ProofItem = { title: string; body: string };

export function ProofSlot({ items = [] }: { items?: readonly ProofItem[] }) {
  if (items.length === 0) return null;
  return (
    <Section id="proof" title="What it did">
      <ul className="space-y-8">
        {items.map((item) => (
          <li key={item.title}>
            <h3 className="text-title">{item.title}</h3>
            <p className="mt-2 max-w-[52ch]">{item.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
