import React from "react";
import { render, screen, within } from "@testing-library/react";
import DataComponent from "./data";

describe("DataComponent", () => {
  const mockGenerationData = [
    { fuel: "biomass", perc: 10 },
    { fuel: "solar", perc: 20 },
    { fuel: "wind", perc: 30 },
  ];

  test("renders the component with correct title", () => {
    render(<DataComponent generationData={mockGenerationData} />);

    const title = screen.getByText("Summary of Energy Generation Data");
    expect(title).toBeInTheDocument();
  });

  test("renders the DataGrid with correct columns", () => {
    render(<DataComponent generationData={mockGenerationData} />);

    const dataGrid = screen.getByTestId("data-grid");
    const columnHeaders = within(dataGrid)
      .getAllByRole("columnheader")
      .filter((header) =>
        ["ID", "Fuel Type", "% of Generation Mix"].includes(header.textContent || "")
      );

    expect(columnHeaders.length).toBe(3);
    expect(columnHeaders[0]).toHaveTextContent("ID");
    expect(columnHeaders[1]).toHaveTextContent("Fuel Type");
    expect(columnHeaders[2]).toHaveTextContent("% of Generation Mix");
  });

  test("renders the correct number of rows", () => {
    render(<DataComponent generationData={mockGenerationData} />);

    const dataGrid = screen.getByTestId("data-grid");
    const rows = within(dataGrid).getAllByRole("row", { hidden: true });
    expect(rows.length - 1).toBe(mockGenerationData.length);
  });

  test("renders rows with correct data", () => {
    render(<DataComponent generationData={mockGenerationData} />);

    const dataGrid = screen.getByTestId("data-grid");
    mockGenerationData.forEach((data, index) => {
      const row = within(dataGrid).getByText(data.fuel.charAt(0).toUpperCase() + data.fuel.slice(1));
      expect(row).toBeInTheDocument();
      const percentage = within(dataGrid).getByText(data.perc.toString());
      expect(percentage).toBeInTheDocument();
    });
  });
});
