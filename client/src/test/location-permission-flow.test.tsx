import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import LocationSelect from "@/pages/booking/location";
import {
  clearStorage,
  setLocationExplainerSeen,
  setLocationPermissionState,
} from "@/lib/storage";

const setLocation = vi.fn();

vi.mock("wouter", async () => {
  const actual = await vi.importActual<typeof import("wouter")>("wouter");
  return {
    ...actual,
    useLocation: () => ["/booking/location", setLocation],
    useSearch: () => "",
  };
});

describe("Location permission flow", () => {
  beforeEach(() => {
    clearStorage();
    setLocation.mockClear();
  });

  it("redirects to the explainer on first visit", async () => {
    render(<LocationSelect />);

    await waitFor(() => {
      expect(setLocation).toHaveBeenCalledWith("/booking/location-permission");
    });
  });

  it("shows the find clinics faster warning when denied", async () => {
    setLocationExplainerSeen(true);
    setLocationPermissionState("denied");

    render(<LocationSelect />);

    expect(
      await screen.findByRole("heading", { name: /find clinics faster/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /enable location/i })
    ).toBeInTheDocument();
  });
});
