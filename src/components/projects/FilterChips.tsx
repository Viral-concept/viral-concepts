import Link from "next/link";

import { cx } from "@/lib/cx";

/**
 * Filter links for /projects. Each chip is a real link (`/projects?category=…` or
 * `/projects?industry=…`), so a filtered view can be shared or bookmarked. Rendered on the
 * server without an active chip and hydrated by `ProjectFilter`, which knows the current query.
 * One filter applies at a time; choosing a chip replaces the previous one.
 */
export type FilterParam = "category" | "industry";

export interface FilterOption {
  readonly value: string;
  readonly label: string;
  readonly count: number;
}

export interface FilterGroup {
  readonly param: FilterParam;
  readonly title: string;
  readonly options: readonly FilterOption[];
}

export interface ActiveFilter {
  readonly param: FilterParam;
  readonly value: string;
}

interface FilterChipsProps {
  readonly basePath: string;
  readonly groups: readonly FilterGroup[];
  readonly total: number;
  readonly active?: ActiveFilter | undefined;
}

const chip =
  "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors duration-(--duration-fast)";
const idle = "border-line-strong bg-white text-teal-800 hover:border-teal-600";
const current = "border-teal-800 bg-teal-800 text-white";

function Chip({
  href,
  label,
  count,
  isActive,
}: {
  readonly href: string;
  readonly label: string;
  readonly count: number;
  readonly isActive: boolean;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={isActive ? "true" : undefined}
      className={cx(chip, isActive ? current : idle)}
    >
      {label}
      <span className={cx("text-xs", isActive ? "text-white/80" : "text-muted")}>{count}</span>
    </Link>
  );
}

export function FilterChips({ basePath, groups, total, active }: FilterChipsProps) {
  const labelled = groups.length > 1;
  return (
    <div className="flex flex-col gap-4">
      {groups.map((group, index) => (
        <div key={group.param} className="flex flex-col gap-2">
          {labelled ? <p className="text-eyebrow text-teal-600 uppercase">{group.title}</p> : null}
          <ul className="flex flex-wrap gap-2">
            {index === 0 ? (
              <li>
                <Chip href={basePath} label="All" count={total} isActive={!active} />
              </li>
            ) : null}
            {group.options.map((option) => (
              <li key={option.value}>
                <Chip
                  href={`${basePath}?${group.param}=${option.value}`}
                  label={option.label}
                  count={option.count}
                  isActive={active?.param === group.param && active.value === option.value}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
