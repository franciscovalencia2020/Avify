import React from "react";
import { render, screen } from "@testing-library/react";
import GaugeComponent from "./gauge";

jest.mock("react-gauge-chart", () => (props: any) => (
  <div
    data-testid={`gauge-${props.id.split("-")[1]}`}
    style={{ color: props.textColor }}
  />
));

describe("GaugeComponent", () => {
  const mockGenerationData = [
    { fuel: "biomass", perc: 40 },
    { fuel: "solar", perc: 25 },
    { fuel: "wind", perc: 15 },
  ];

  test("renders the component with correct title", () => {
    render(<GaugeComponent generationData={mockGenerationData} />);
    const title = screen.getByText("Energy Generation Gauges");
    expect(title).toBeInTheDocument();
  });

  test("renders the correct number of gauges", () => {
    render(<GaugeComponent generationData={mockGenerationData} />);
    const gauges = screen.getAllByTestId(/gauge-/);
    expect(gauges.length).toBe(mockGenerationData.length);
  });

  test("renders gauges with correct data", () => {
    render(<GaugeComponent generationData={mockGenerationData} />);

    mockGenerationData.forEach((data) => {
      const gauge = screen.getByTestId(`gauge-${data.fuel}`);
      expect(gauge).toBeInTheDocument();
    });
  });

  test("applies correct colors and styles to gauges", () => {
    render(<GaugeComponent generationData={mockGenerationData} />);

    mockGenerationData.forEach((data) => {
      const gauge = screen.getByTestId(`gauge-${data.fuel}`);
      expect(gauge).toHaveStyle("color: #000");
    });
  });
});
