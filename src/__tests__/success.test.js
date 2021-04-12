import React from "react";
import { render } from "@testing-library/react";
import Success from "../pages/success";

describe("Success", () => {
  it("should display loggedin successfully", () => {
    const { getByText } = render(<Success />);
    const element = getByText("Logged In Successfully");
    expect(element).toBeInTheDocument();
  });
});
