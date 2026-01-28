import { describe, it, expect } from "vitest";
import en from "@/i18n/locales/en.json";
import de from "@/i18n/locales/de.json";

type Locale = Record<string, unknown>;

const REQUIRED_KEYS = [
  "home.sections.myAppointments",
  "appointments.detail.bookAgain",
  "appointments.matchStatus.searching",
  "appointments.matchStatus.waiting",
  "appointments.matchStatus.confirmed",
  "appointments.matchStatus.rejected",
  "appointments.matchStatus.expired",
  "booking.review.title",
  "booking.review.confirm",
  "booking.success.title",
  "booking.success.subtitle",
  "booking.success.cardTitle",
  "booking.success.cardSubtitle",
  "booking.success.backHome",
  "booking.success.notifications.title",
  "booking.success.notifications.body",
  "booking.success.notifications.deny",
  "booking.success.notifications.allow",
  "booking.location.permission.title",
  "booking.location.permission.heading",
  "booking.location.permission.body",
  "booking.location.permission.cta",
  "booking.location.permission.privacy.title",
  "booking.location.permission.privacy.body",
  "booking.location.permission.modal.title",
  "booking.location.permission.modal.body",
  "booking.location.permission.modal.deny",
  "booking.location.permission.modal.allow",
  "booking.location.permission.warning.title",
  "booking.location.permission.warning.body",
  "booking.location.permission.warning.cta",
];

const getValue = (locale: Locale, path: string) => {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, locale);
};

const expectKeys = (locale: Locale, label: string) => {
  for (const key of REQUIRED_KEYS) {
    expect(getValue(locale, key), `${label}: missing ${key}`).toBeDefined();
  }
};

describe("i18n keys for matching flow", () => {
  it("includes required English keys and copy", () => {
    expectKeys(en, "en");
    expect(getValue(en, "booking.review.title")).toBe("Review Request");
    expect(getValue(en, "booking.review.confirm")).toBe("Request Appointment");
    expect(getValue(en, "booking.success.title")).toBe("Request sent");
    expect(getValue(en, "booking.success.subtitle")).toBe(
      "We're matching you with the first available appointment. We'll notify you as soon as it's confirmed."
    );
  });

  it("includes required German keys and copy", () => {
    expectKeys(de, "de");
    expect(getValue(de, "booking.review.title")).toBe("Anfrage prüfen");
    expect(getValue(de, "booking.review.confirm")).toBe("Termin anfragen");
    expect(getValue(de, "booking.success.title")).toBe("Anfrage gesendet");
    expect(getValue(de, "booking.success.subtitle")).toBe(
      "Wir suchen den nächstmöglichen Termin für Sie. Wir informieren Sie, sobald er bestätigt ist."
    );
  });
});
