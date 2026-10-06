import type { CSSProperties } from "react";

import { cx } from "@/lib/cx";

/**
 * "Built to spread" as a living graphic: a network that grows outward across the brand's hexagon
 * lattice from one origin, wave by wave, then keeps pulsing as sparks travel along it. It reads
 * as both an event audience spreading out and a digital network — the two halves of the business.
 *
 * Generated deterministically at build time; no client JavaScript. Built for performance:
 * - the network is drawn as static SVG in three depth layers; each layer fades and scales in
 *   from the origin once (opacity/scale on the layer, so the compositor does the work);
 * - the looping motion — node ripples and sparks hopping edge to edge — is plain HTML moved with
 *   transform and opacity only, so the SVG never repaints while it plays;
 * - a CSS mask fades the edges; reduced motion shows the finished network, still.
 * Always decorative (aria-hidden).
 */
const R = 46; // hexagon circumradius in viewBox units
const W = 860;
const H = 760;
const SQ3 = Math.sqrt(3);
/** A spark's cycle has room for this many hops (see vc-hop in globals.css: 1 hop = 10%). */
const MAX_HOPS = 8;

type Point = { readonly x: number; readonly y: number };

/** Small deterministic PRNG so the graphic is identical on every build and render. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Vertices of a flat-top hexagon lattice covering the viewBox. */
function latticeVertices(): Point[] {
  const points = new Map<string, Point>();
  for (let col = -1; col * 1.5 * R < W + R; col += 1) {
    for (let row = -1; row * SQ3 * R < H + R; row += 1) {
      const cx = col * 1.5 * R;
      const cy = row * SQ3 * R + (col % 2 === 0 ? 0 : (SQ3 / 2) * R);
      for (let k = 0; k < 6; k += 1) {
        const angle = (Math.PI / 3) * k;
        const x = Math.round((cx + R * Math.cos(angle)) * 10) / 10;
        const y = Math.round((cy + R * Math.sin(angle)) * 10) / 10;
        if (x < -2 || y < -2 || x > W + 2 || y > H + 2) continue;
        points.set(`${Math.round(x)}:${Math.round(y)}`, { x, y });
      }
    }
  }
  return [...points.values()];
}

interface Network {
  readonly edges: readonly { a: Point; b: Point; depth: number }[];
  readonly nodes: readonly { p: Point; depth: number; pulse: boolean; accent: boolean }[];
  /** Sparks: each travels origin → leaf, one edge ("hop") at a time. */
  readonly sparks: readonly { hops: readonly { a: Point; b: Point }[]; accent: boolean }[];
  readonly origin: Point;
  readonly maxDepth: number;
}

function buildNetwork(seed: number, size: number): Network {
  const random = mulberry32(seed);
  const vertices = latticeVertices();
  const near = (a: Point, b: Point) => Math.abs(Math.hypot(a.x - b.x, a.y - b.y) - R) < 2;
  const origin = vertices.reduce((best, p) =>
    Math.hypot(p.x - W * 0.56, p.y - H * 0.48) < Math.hypot(best.x - W * 0.56, best.y - H * 0.48)
      ? p
      : best,
  );

  // Random breadth-first spread along lattice edges from the origin.
  const depth = new Map<Point, number>([[origin, 0]]);
  const parent = new Map<Point, Point>();
  const edges: { a: Point; b: Point; depth: number }[] = [];
  let frontier = [origin];
  while (frontier.length > 0 && depth.size < size) {
    const next: Point[] = [];
    for (const p of frontier) {
      for (const q of vertices) {
        // The origin always spreads in every direction; further out, branches are random.
        if (depth.has(q) || !near(p, q) || (p !== origin && random() > 0.62)) continue;
        const d = (depth.get(p) ?? 0) + 1;
        depth.set(q, d);
        parent.set(q, p);
        edges.push({ a: p, b: q, depth: d });
        next.push(q);
        if (depth.size >= size) break;
      }
    }
    // Never let the spread die out early: keep at least one branch growing.
    if (next.length === 0) {
      for (const p of frontier) {
        const q = vertices.find((v) => !depth.has(v) && near(p, v));
        if (!q) continue;
        depth.set(q, (depth.get(p) ?? 0) + 1);
        parent.set(q, p);
        edges.push({ a: p, b: q, depth: depth.get(q) ?? 1 });
        next.push(q);
        break;
      }
    }
    frontier = next;
  }

  const maxDepth = Math.max(1, ...depth.values());
  const nodes = [...depth.entries()].map(([p, d], index) => ({
    p,
    depth: d,
    pulse: index % 4 === 0,
    accent: index % 7 === 3,
  }));

  // Signals travel from the origin to a few of the farthest nodes.
  const leaves = nodes
    .filter((n) => n.depth >= maxDepth - 1)
    .sort((a, b) => a.p.x - b.p.x)
    .filter((_, i, all) => i % Math.max(1, Math.floor(all.length / 4)) === 0)
    .slice(0, 4);
  const sparks = leaves.map((leaf, index) => {
    const path: Point[] = [];
    let cursor: Point | undefined = leaf.p;
    while (cursor) {
      path.unshift(cursor);
      cursor = parent.get(cursor);
    }
    const hops = path
      .slice(1)
      .map((b, i) => ({ a: path[i] as Point, b }))
      .slice(0, MAX_HOPS);
    return { hops, accent: index % 2 === 1 };
  });

  return { edges, nodes, sparks, origin, maxDepth };
}

export const NETWORK = buildNetwork(2014, 46);

/** Faint full lattice behind the live network. */
function latticePath(): string {
  const segments: string[] = [];
  for (let col = -1; col * 1.5 * R < W + R; col += 1) {
    for (let row = -1; row * SQ3 * R < H + R; row += 1) {
      const cx = col * 1.5 * R;
      const cy = row * SQ3 * R + (col % 2 === 0 ? 0 : (SQ3 / 2) * R);
      const pts = Array.from({ length: 6 }, (_, k) => {
        const a = (Math.PI / 3) * k;
        return `${(cx + R * Math.cos(a)).toFixed(1)} ${(cy + R * Math.sin(a)).toFixed(1)}`;
      });
      segments.push(`M${pts.join("L")}Z`);
    }
  }
  return segments.join("");
}
const LATTICE = latticePath();

const pct = (value: number, of: number) => `${((value / of) * 100).toFixed(3)}%`;

/** Depth layers that fade in one after another: inner, middle, outer. */
const STAGES = 3;

export function SpreadNetwork({ className }: { readonly className?: string }) {
  const { edges, nodes, sparks, origin, maxDepth } = NETWORK;
  const stageOf = (depth: number) =>
    Math.min(STAGES - 1, Math.floor((depth / (maxDepth + 1)) * STAGES));
  const originAt = `${pct(origin.x, W)} ${pct(origin.y, H)}`;

  return (
    <div
      aria-hidden="true"
      data-ambient=""
      className={cx("spread-network pointer-events-none relative overflow-hidden", className)}
    >
      <div className="spread-box">
        {/* The faint full lattice and the origin's glow: static. */}
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" focusable="false">
          <path d={LATTICE} fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
        </svg>
        <span
          className="spread-origin"
          style={{ left: pct(origin.x, W), top: pct(origin.y, H) } as CSSProperties}
        />

        {Array.from({ length: STAGES }, (_, stage) => (
          <svg
            key={stage}
            viewBox={`0 0 ${W} ${H}`}
            focusable="false"
            className="spread-stage absolute inset-0 size-full"
            style={{ "--stage": stage, transformOrigin: originAt } as CSSProperties}
          >
            <g fill="none" stroke="var(--color-cyan-400)" strokeWidth="1.4" strokeLinecap="round">
              {edges
                .filter((edge) => stageOf(edge.depth) === stage)
                .map((edge) => (
                  <line
                    key={`${edge.a.x}:${edge.a.y}-${edge.b.x}:${edge.b.y}`}
                    x1={edge.a.x}
                    y1={edge.a.y}
                    x2={edge.b.x}
                    y2={edge.b.y}
                    strokeOpacity={0.55 - (edge.depth / maxDepth) * 0.3}
                  />
                ))}
            </g>
            {nodes
              .filter((node) => stageOf(node.depth) === stage)
              .map((node) => (
                <circle
                  key={`${node.p.x}:${node.p.y}`}
                  cx={node.p.x}
                  cy={node.p.y}
                  r={node.depth === 0 ? 6 : node.accent ? 4 : 3}
                  fill={
                    node.depth === 0 || node.accent
                      ? "var(--color-yellow-400)"
                      : "var(--color-cyan-300)"
                  }
                />
              ))}
          </svg>
        ))}

        {/* Ripples on a few nodes (HTML, composited). */}
        {nodes
          .filter((node) => node.pulse)
          .map((node, index) => (
            <span
              key={`r-${node.p.x}:${node.p.y}`}
              className={cx("spread-ripple", node.accent && "spread-ripple-accent")}
              style={
                {
                  left: pct(node.p.x, W),
                  top: pct(node.p.y, H),
                  animationDelay: `${2.4 + (index % 9) * 0.55}s`,
                } as CSSProperties
              }
            />
          ))}

        {/* Sparks hopping edge to edge from the origin outwards (HTML, composited). */}
        {sparks.map((spark, sparkIndex) =>
          spark.hops.map((hop, hopIndex) => (
            <span
              key={`s-${sparkIndex}-${hopIndex}`}
              className="spread-hop"
              style={
                {
                  left: pct(Math.min(hop.a.x, hop.b.x), W),
                  top: pct(Math.min(hop.a.y, hop.b.y), H),
                  width: pct(Math.abs(hop.b.x - hop.a.x), W),
                  height: pct(Math.abs(hop.b.y - hop.a.y), H),
                  scale: `${hop.b.x < hop.a.x ? -1 : 1} ${hop.b.y < hop.a.y ? -1 : 1}`,
                  "--hop-delay": `${2.6 + sparkIndex * 1.7 + hopIndex * 0.45}s`,
                } as CSSProperties
              }
            >
              <span className={cx("spread-spark", spark.accent && "spread-spark-accent")} />
            </span>
          )),
        )}
      </div>
    </div>
  );
}
