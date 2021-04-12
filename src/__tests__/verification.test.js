import React from "react";
import { render } from "@testing-library/react";
import Verification from "../pages/verification";

describe("<Verification/>", () => {
  it("should display 6 inputs and submit button", () => {
    const { getByText, getByTestId } = render(<Verification />);

    for (let count = 0; count < 6; count += 1) {
      expect(getByTestId(`individual-input-${count}`)).toBeInTheDocument();
    }

    expect(getByText("SUBMIT").closest("button")).toBeInTheDocument();
  });
});
