import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cx } from "@/lib/cx";
import type { OfferingGroup } from "@/types/content";
import type { SectionTone } from "@/types/ui";

/** "What we provide": a service's sub-services, grouped. Every item is in the Company Profile. */
interface OfferingGroupsProps {
  readonly tone: SectionTone;
  readonly serviceTitle: string;
  readonly groups: readonly OfferingGroup[];
}

export function OfferingGroups({ tone, serviceTitle, groups }: OfferingGroupsProps) {
  return (
    <Section tone={tone} labelledBy="offerings-title">
      <SectionHeader id="offerings-title" eyebrow={serviceTitle} title="What we provide" />
      <ul
        className={cx(
          "mt-12 grid gap-6 md:grid-cols-2",
          // Two groups sit side by side at a readable width instead of leaving a column empty.
          groups.length <= 2 ? "max-w-4xl" : "lg:grid-cols-3",
        )}
      >
        {groups.map((group) => (
          <li
            key={group.title}
            className="flex flex-col gap-4 rounded-card border border-line bg-white p-6 shadow-card reveal"
          >
            <h3 className="text-h3 text-ink">{group.title}</h3>
            <ul className="flex flex-col gap-2.5">
              {group.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-ink">
                  <Icon name="check" className="mt-1 size-4 shrink-0 text-teal-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
