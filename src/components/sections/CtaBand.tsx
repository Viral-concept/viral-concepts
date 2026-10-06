import { Aurora } from "@/components/motion/Aurora";
import { HexWatermark } from "@/components/ui/BrandMotifs";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import type { IconName } from "@/components/ui/Icon";

/** Closing call to action on every major page. */
export interface CtaAction {
  readonly label: string;
  readonly href: string;
  readonly icon?: IconName;
}

interface CtaBandProps {
  readonly title: string;
  readonly lead: string;
  readonly primary: CtaAction;
  readonly secondary?: CtaAction;
}

export function CtaBand({ title, lead, primary, secondary }: CtaBandProps) {
  return (
    <Section tone="night" labelledBy="cta-title" className="overflow-hidden">
      <Aurora />
      <HexWatermark className="-top-24 -right-24 w-md parallax text-teal-500/40 [--parallax:40px]" />
      <div className="flex max-w-4xl flex-col gap-6">
        <h2 id="cta-title" className="text-display text-white reveal">
          {title}
        </h2>
        <p className="font-display text-h3 text-yellow-400 reveal [--rv-i:1]">{lead}</p>
        <div className="flex flex-wrap gap-3 pt-2 reveal [--rv-i:2]">
          <ButtonLink href={primary.href} size="lg" icon="arrow-right">
            {primary.label}
          </ButtonLink>
          {secondary ? (
            <ButtonLink
              href={secondary.href}
              size="lg"
              variant="inverse"
              {...(secondary.icon ? { leadingIcon: secondary.icon } : {})}
            >
              {secondary.label}
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
