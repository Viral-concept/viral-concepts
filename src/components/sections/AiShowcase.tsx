import type { CSSProperties } from "react";

import { Aurora } from "@/components/motion/Aurora";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { aiShowcase } from "@/content/ai-showcase";
import { getVisibleImage, hasServicePage } from "@/lib/content";
import { cx } from "@/lib/cx";
import type { Service } from "@/types/content";

import { ServiceCard } from "@/components/cards/ServiceCard";

/**
 * AI & Automation, shown rather than told:
 * - an example enquiry conversation that plays out as it scrolls into view;
 * - an automated workflow with a signal travelling from enquiry to follow-up;
 * - agent roles, and the AI services themselves.
 * All motion is CSS (transform/opacity); everything is readable with motion turned off.
 * Rendered only while the AI block is visible in this deployment (see content/ai-showcase.ts).
 */
type Showcase = typeof aiShowcase;

function ChatDemo({ chat }: { readonly chat: Showcase["chat"] }) {
  return (
    <figure className="flex flex-col gap-3">
      <div
        role="group"
        aria-label={chat.label}
        className="flex flex-col gap-3 rounded-media border border-white/12 bg-night-soft/80 p-5 shadow-raised backdrop-blur-md sm:p-6"
      >
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <span className="relative grid size-10 place-items-center rounded-full bg-yellow-400 font-display text-sm font-bold text-ink">
            AI
            <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-night-soft bg-cyan-400" />
          </span>
          <div>
            <p className="font-semibold text-white">Enquiry assistant</p>
            <p className="text-sm text-white/70">{chat.label}</p>
          </div>
        </div>
        <ol className="flex flex-col gap-3">
          {chat.messages.map((message, index) => {
            const agent = message.from === "agent";
            return (
              <li
                key={index}
                className={cx("flex reveal reveal-scale", agent ? "justify-start" : "justify-end")}
                style={{ "--rv-i": index * 4 } as CSSProperties}
              >
                <p
                  className={cx(
                    "max-w-[85%] rounded-media px-4 py-3 text-sm leading-relaxed",
                    agent
                      ? "rounded-bl-sm bg-white/10 text-white"
                      : "rounded-br-sm bg-cyan-300 text-ink",
                  )}
                >
                  <span className="sr-only">{agent ? "Assistant: " : "Visitor: "}</span>
                  {message.text}
                </p>
              </li>
            );
          })}
        </ol>
        <p
          className="mt-1 flex items-center gap-2 self-start rounded-full border border-yellow-400/40 bg-yellow-400/10 px-3 py-1.5 text-xs font-semibold text-yellow-400 reveal"
          style={{ "--rv-i": chat.messages.length * 4 } as CSSProperties}
        >
          <span aria-hidden="true" className="size-1.5 rounded-full bg-yellow-400" />
          {chat.outcome}
        </p>
      </div>
      <figcaption className="text-sm text-white/70">{chat.caption}</figcaption>
    </figure>
  );
}

function WorkflowFlow({ workflow }: { readonly workflow: Showcase["workflow"] }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-eyebrow text-cyan-300 uppercase">{workflow.label}</p>
      <ol data-ambient="" className="workflow relative grid gap-3 sm:grid-cols-5 sm:gap-2">
        {/* The travelling signal (decorative). */}
        <li
          aria-hidden="true"
          className="pointer-events-none absolute top-5 bottom-5 left-5 w-px bg-white/15 sm:top-5 sm:right-[10%] sm:bottom-auto sm:left-[10%] sm:h-px sm:w-auto"
        >
          <span className="workflow-signal absolute top-0 left-0 size-full">
            <span className="absolute -top-1 -left-1 size-2.5 rounded-full bg-yellow-400 shadow-[0_0_14px_var(--color-yellow-400)]" />
          </span>
        </li>
        {workflow.steps.map((step, index) => (
          <li
            key={step}
            className="workflow-step relative flex items-center gap-3 sm:flex-col sm:text-center"
            style={{ "--step": index } as CSSProperties}
          >
            <span className="workflow-node relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-white/20 bg-night font-display text-sm font-bold text-white">
              {index + 1}
            </span>
            <span className="text-sm font-medium text-white/85">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

interface AiShowcaseProps {
  readonly showcase: Showcase;
  readonly services: readonly Service[];
  /** On /digital-solutions: cards carry `id={slug}` so menu links (#ai-agents) land on them. */
  readonly anchored?: boolean;
}

export function AiShowcase({ showcase, services, anchored = false }: AiShowcaseProps) {
  return (
    <Section tone="night" labelledBy="ai-showcase-title" className="overflow-hidden">
      <Aurora tone="digital" />
      <ReviewFlag item={showcase} className="mb-6" />
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-10 lg:col-span-6">
          <SectionHeader
            id="ai-showcase-title"
            inverse
            eyebrow={showcase.eyebrow}
            title={showcase.title}
            intro={showcase.intro}
            className="reveal"
          />
          <ul className="grid gap-4 reveal-stagger sm:grid-cols-2">
            {showcase.agents.map((agent) => (
              <li
                key={agent.id}
                className="flex flex-col gap-2 rounded-card border border-white/12 bg-white/[0.04] p-5 reveal"
              >
                <p className="flex items-center gap-2 font-semibold text-white">
                  <span aria-hidden="true" className="size-2 rotate-45 bg-cyan-400" />
                  {agent.title}
                </p>
                <p className="text-sm text-white/75">{agent.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6">
          <ChatDemo chat={showcase.chat} />
        </div>
      </div>

      <div className="mt-16 rounded-media border border-white/10 bg-white/[0.03] p-6 reveal sm:p-8">
        <WorkflowFlow workflow={showcase.workflow} />
      </div>

      {services.length > 0 ? (
        <ul className="mt-12 grid gap-5 reveal-stagger md:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug} className="reveal">
              <ServiceCard
                service={service}
                highlights={4}
                tone="dark"
                image={getVisibleImage(service.page?.photo)}
                {...(anchored ? { id: service.slug } : {})}
                {...(anchored && !hasServicePage(service) ? { href: null } : {})}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </Section>
  );
}
