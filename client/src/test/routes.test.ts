import { describe, it, expect } from "vitest";
import { routeToScreenId } from "@/components/annotations/AnnotationPanel";

describe("route map", () => {
  it("includes /booking/entry", () => {
    expect(routeToScreenId["/booking/entry"]).toBeDefined();
  });
});
