import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./footer";

describe("Footer Component", () => {
  test("renders the Footer component correctly", () => {
    render(<Footer />);

    const icon = screen.getByTestId("footer-icon");
    expect(icon).toBeInTheDocument();

    const text = screen.getByText("Francisco Valencia");
    expect(text).toBeInTheDocument();
  });

  test("applies the correct styles", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("bg-[#3b5998]");
    expect(footer).toHaveClass("text-white");
  });
});
