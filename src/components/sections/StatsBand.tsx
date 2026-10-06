import { Section } from "@/components/ui/Section";
import { StatCounter } from "@/components/ui/StatCounter";
import type { Stat } from "@/types/content";

/**
 * Company statistics. Pages render this only when at least one stat is visible, so unconfirmed
 * figures never appear in production.
 */
export function StatsBand({ stats }: { readonly stats: readonly Stat[] }) {
  return (
    <Section tone="brand" spacing="compact" pattern labelledBy="stats-title">
      <h2 id="stats-title" className="sr-only">
        Viral Concepts in numbers
      </h2>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {stats.map((stat) => (
          <li key={stat.id}>
            <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} inverse />
          </li>
        ))}
      </ul>
    </Section>
  );
}
