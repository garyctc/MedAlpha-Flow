import { describe, it, expect } from "vitest";
import { HOME_APPOINTMENT_MOCKS, HOME_APPOINTMENT_STATUS_ORDER } from "@/lib/appointments/home-mocks";

describe("home appointments", () => {
  it("keeps mock cards in the prototype order", () => {
    expect(HOME_APPOINTMENT_MOCKS.map((item) => item.statusKey)).toEqual(HOME_APPOINTMENT_STATUS_ORDER);
  });
});
