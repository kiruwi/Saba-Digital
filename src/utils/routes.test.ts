import { describe, expect, it } from "vitest";
import { ROUTE_PATHS, RoutePaths } from "./routes";

describe("route definitions", () => {
  it("keeps public category routes stable", () => {
    expect(ROUTE_PATHS.Work).toBe("/work");
    expect(ROUTE_PATHS.GraphicsWork).toBe("/work/graphics");
    expect(ROUTE_PATHS.UXUIWork).toBe("/work/ux-ui");
    expect(ROUTE_PATHS.WebDevWork).toBe("/work/web-dev");
  });

  it("does not duplicate enum paths", () => {
    const paths = Object.values(RoutePaths);
    expect(new Set(paths).size).toBe(paths.length);
  });
});
