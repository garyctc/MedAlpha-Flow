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

  it("does not seed video appointments", () => {
    seedDemoData();
    const appointments = getUserAppointments();
    expect(appointments.some((appointment) => appointment.type === "video")).toBe(false);
  });
});
