import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "./sidebar";

describe("Sidebar Component", () => {
  const mockOnOptionChange = jest.fn();

  test("renders all sidebar options correctly", () => {
    render(<Sidebar activeOption="charts" onOptionChange={mockOnOptionChange} />);
    expect(screen.getByText("Charts")).toBeInTheDocument();
    expect(screen.getByText("Data")).toBeInTheDocument();
    expect(screen.getByText("Elements")).toBeInTheDocument();
  });

  test("renders active option with correct styles", () => {
    render(<Sidebar activeOption="data" onOptionChange={mockOnOptionChange} />);

    const activeOption = screen.getByText("Data");
    expect(activeOption).toHaveClass("font-semibold");
  });

  test("calls onOptionChange when an option is clicked", () => {
    render(<Sidebar activeOption="charts" onOptionChange={mockOnOptionChange} />);
    const dataOption = screen.getByText("Data");
    fireEvent.click(dataOption);
    expect(mockOnOptionChange).toHaveBeenCalledWith("data");
  });

  test("hover styles are applied correctly when an option is hovered over", () => {
    render(<Sidebar activeOption="charts" onOptionChange={mockOnOptionChange} />);
    const elementsOption = screen.getByText("Elements");
    fireEvent.mouseOver(elementsOption);
    expect(elementsOption).toBeInTheDocument();
  });
});
