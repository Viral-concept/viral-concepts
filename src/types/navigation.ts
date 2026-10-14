/**
 * Navigation model. Plain, serialisable data so the same model can be passed from Server
 * Components to the small client components (dropdowns, mobile menu) without duplication.
 */

export interface NavLink {
  readonly label: string;
  readonly href: string;
  readonly description?: string;
  /** Preview builds only: why this link is not live yet. */
  readonly reviewLabel?: string;
}

export interface NavSection {
  readonly title: string;
  readonly links: readonly NavLink[];
}

export type NavItem =
  | { readonly kind: "link"; readonly id: string; readonly label: string; readonly href: string }
  | {
      readonly kind: "menu";
      readonly id: string;
      readonly label: string;
      /** Landing page for the group, shown as the first link in the panel. */
      readonly overview: NavLink;
      readonly sections: readonly NavSection[];
      /** The panel's own call to action (defaults to the site-wide one). */
      readonly cta?: NavLink;
      /** mega: multi-column panel spanning the header; list: compact single column. */
      readonly layout: "mega" | "list";
    };

export interface FooterColumn {
  readonly title: string;
  readonly links: readonly NavLink[];
}

export interface NavigationModel {
  readonly primary: readonly NavItem[];
  readonly cta: NavLink;
  readonly footerColumns: readonly FooterColumn[];
  readonly legal: readonly NavLink[];
}
