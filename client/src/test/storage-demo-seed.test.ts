import { describe, it, expect, beforeEach } from "vitest";
import { seedDemoData, getUserAppointments, clearStorage } from "@/lib/storage";

describe("demo seed", () => {
  beforeEach(() => {
    clearStorage();
  });

  it("always resets appointments with all match statuses", () => {
    seedDemoData();
    const appointments = getUserAppointments();
    const matchStatuses = new Set(appointments.map((a) => a.matchStatus));
    expect(matchStatuses.has("searching")).toBe(true);
    expect(matchStatuses.has("waiting")).toBe(true);
    expect(matchStatuses.has("confirmed")).toBe(true);
    expect(matchStatuses.has("rejected")).toBe(true);
    expect(matchStatuses.has("expired")).toBe(true);
  });
});
