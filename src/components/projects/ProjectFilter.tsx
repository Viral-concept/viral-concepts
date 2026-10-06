"use client";

import { useSearchParams } from "next/navigation";

import { FilterChips, type FilterGroup, type FilterParam } from "./FilterChips";

/**
 * Applies `?category=` or `?industry=` to the server-rendered project grid.
 *
 * The page stays fully static: every card is in the HTML with `data-category` and
 * `data-industry` attributes, and this component only adds a CSS rule hiding the cards outside
 * the chosen filter. Without JavaScript every project stays visible. Only values from the known
 * options are ever written into the rule, so the query string cannot inject CSS.
 */
interface ProjectFilterProps {
  readonly basePath: string;
  readonly gridId: string;
  readonly groups: readonly FilterGroup[];
  readonly total: number;
}

const ATTRIBUTE: Record<FilterParam, string> = {
  category: "data-category",
  industry: "data-industry",
};

export function ProjectFilter({ basePath, gridId, groups, total }: ProjectFilterProps) {
  const params = useSearchParams();
  // First matching group wins (category before industry), so at most one filter applies.
  const match = groups
    .map((group) => ({
      group,
      option: group.options.find((option) => option.value === params.get(group.param)),
    }))
    .find(({ option }) => option !== undefined);
  const active = match?.option
    ? { param: match.group.param, value: match.option.value }
    : undefined;
  const shown = match?.option ? match.option.count : total;
  const noun = (n: number) => (n === 1 ? "project" : "projects");

  return (
    <>
      <FilterChips basePath={basePath} groups={groups} total={total} active={active} />
      {active ? (
        <style>{`#${gridId} > li:not([${ATTRIBUTE[active.param]}~="${active.value}"]) { display: none; }`}</style>
      ) : null}
      <p aria-live="polite" className="text-sm text-muted">
        {match?.option
          ? `Showing ${shown} ${noun(shown)} in ${match.option.label}`
          : `Showing all ${total} ${noun(total)}`}
      </p>
    </>
  );
}
