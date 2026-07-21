import { describe, expect, it } from "vitest";
import { allProjects } from "./projects";

describe("portfolio project data", () => {
  it("has unique route identifiers within each category", () => {
    const routeKeys = allProjects.map(project => `${project.category}/${project.id}`);
    expect(new Set(routeKeys).size).toBe(routeKeys.length);
  });

  it("contains the fields required by project cards and detail pages", () => {
    for (const project of allProjects) {
      expect(project.id).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.shortDescription).toBeTruthy();
      expect(project.image).toBeTruthy();
      expect(["uxui", "webdev", "graphics"]).toContain(project.category);
    }
  });
});
