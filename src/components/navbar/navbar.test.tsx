import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "./navbar";

describe("Navbar Component", () => {
  const mockLastUpdate = "2024-12-01 12:00 PM";

  test("renders the Navbar correctly", () => {
    render(<Navbar lastUpdate={mockLastUpdate} />);
    const icon = screen.getByTestId("calendar-icon");
    expect(icon).toBeInTheDocument();
    expect(screen.getByText(`Last Updated: ${mockLastUpdate}`)).toBeInTheDocument();
  });

  test("displays the correct last update time", () => {
    render(<Navbar lastUpdate={mockLastUpdate} />);
    const lastUpdateText = screen.getByText(`Last Updated: ${mockLastUpdate}`);
    expect(lastUpdateText).toBeInTheDocument();
    expect(lastUpdateText).toHaveTextContent(mockLastUpdate);
  });

  test("has correct styles applied", () => {
    render(<Navbar lastUpdate={mockLastUpdate} />);
    const navbar = screen.getByText(`Last Updated: ${mockLastUpdate}`).parentElement;
    expect(navbar).toHaveClass("bg-[#3b5998]");
    expect(navbar).toHaveClass("text-white");
    expect(navbar).toHaveClass("py-4");
    expect(navbar).toHaveClass("flex");
    expect(navbar).toHaveClass("items-center");
    expect(navbar).toHaveClass("justify-center");
    expect(navbar).toHaveClass("w-full");
    expect(navbar).toHaveClass("shadow-md");
  });
});
