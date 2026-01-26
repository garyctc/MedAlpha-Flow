import { ReactNode } from "react";
import { Router } from "wouter";
import { render } from "@testing-library/react";

export function renderWithRouter(ui: ReactNode, path = "/") {
  return render(<Router base="" hook={() => [path, () => {}]}>{ui}</Router>);
}
