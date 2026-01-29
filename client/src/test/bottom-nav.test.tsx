import "@/i18n";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "@/test/test-utils";
import BottomNav from "@/components/layout/BottomNav";

it("hides History tab in the bottom navigation", () => {
  renderWithRouter(<BottomNav />, "/home");
  expect(screen.queryByText("History")).not.toBeInTheDocument();
});
