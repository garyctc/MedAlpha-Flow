import { describe, it, expect } from "vitest";
import { mapMatchStatusToLifecycle, getMatchStatusLabel } from "@/lib/appointments/status";

describe("match status mapping", () => {
  it("maps match status to lifecycle status", () => {
    expect(mapMatchStatusToLifecycle("searching")).toBe("processing");
    expect(mapMatchStatusToLifecycle("waiting")).toBe("processing");
    expect(mapMatchStatusToLifecycle("confirmed")).toBe("upcoming");
    expect(mapMatchStatusToLifecycle("rejected")).toBe("cancelled");
    expect(mapMatchStatusToLifecycle("expired")).toBe("cancelled");
  });

  it("returns display labels", () => {
    expect(getMatchStatusLabel("waiting")).toBe("Waiting for confirmation");
  });
});
