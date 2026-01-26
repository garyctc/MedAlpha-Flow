import { describe, it, expect } from "vitest";
import React from "react";
import { render } from "@testing-library/react";

describe("test harness", () => {
  it("runs vitest in a jsdom environment", () => {
    const { getByText } = render(React.createElement("div", null, "Hello"));
    expect(getByText("Hello")).toBeInTheDocument();
  });
});
