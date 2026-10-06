import { describe, expect, it } from "vitest";

import { NETWORK } from "@/components/motion/SpreadNetwork";

describe("SpreadNetwork", () => {
  it("grows a connected network outward from its origin, identically on every build", () => {
    expect(NETWORK.nodes.length).toBeGreaterThan(30);
    expect(NETWORK.edges.length).toBe(NETWORK.nodes.length - 1); // a tree: every node reached once
    expect(NETWORK.maxDepth).toBeGreaterThan(3);
    expect(NETWORK.sparks.length).toBeGreaterThan(0);
    for (const spark of NETWORK.sparks) {
      expect(spark.hops.length).toBeGreaterThan(0);
      expect(spark.hops.length).toBeLessThanOrEqual(8); // the vc-hop cycle fits eight hops
      // Hops chain: each starts where the previous one ended, beginning at the origin.
      expect(spark.hops[0]?.a).toEqual(NETWORK.origin);
      spark.hops.slice(1).forEach((hop, i) => expect(hop.a).toEqual(spark.hops[i]?.b));
    }
  });
});
