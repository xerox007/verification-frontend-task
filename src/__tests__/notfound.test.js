import React from "react";
import { render } from "@testing-library/react";
import NotFound from "../pages/NotFound";

describe("Page Not Found View", () => {
  it("should render page not found without errors", () => {
    const { getByText } = render(<NotFound />);
    const pageNotFoundText = getByText("Page Not Found");
    expect(pageNotFoundText).toBeInTheDocument();
  });
});
