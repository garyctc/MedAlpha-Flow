import "@/i18n";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "@/test/test-utils";
import BookingType from "@/pages/booking/type";

it("does not show video consultation option", () => {
  renderWithRouter(<BookingType />, "/booking/type");
  expect(screen.queryByText(/video consultation/i)).not.toBeInTheDocument();
});
