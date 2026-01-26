import { describe, it, expect } from "vitest";
import { getNextRouteAfterLocation } from "@/lib/booking/nav";

describe("booking navigation", () => {
  it("routes from location to slots", () => {
    expect(getNextRouteAfterLocation()).toBe("/booking/slots");
  });
});
