import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import ChartComponent from "./chart";

jest.mock("react-chartjs-2", () => ({
  Bar: ({ data, ...props }: any) => (
    <div data-testid="bar-chart" data-chart-data={JSON.stringify(data)} {...props}></div>
  ),
  Pie: ({ data, ...props }: any) => (
    <div data-testid="pie-chart" data-chart-data={JSON.stringify(data)} {...props}></div>
  ),
}));

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation((message) => {
    if (
      message.includes("Warning: An update to") &&
      message.includes("inside a test was not wrapped in act(...)")
    ) {
      return;
    }
    console.error(message);
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("ChartComponent", () => {
  const mockGenerationData = [
    { fuel: "biomass", perc: 40 },
    { fuel: "solar", perc: 30 },
    { fuel: "coal", perc: 20 },
    { fuel: "gas", perc: 10 },
  ];

  test("renders the component with correct title and default chart type", () => {
    render(<ChartComponent generationData={mockGenerationData} />);
    const title = screen.getByText("Energy Generation Chart");
    expect(title).toBeInTheDocument();
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
    expect(screen.queryByTestId("pie-chart")).not.toBeInTheDocument();
  });

  test("switches chart type between Bar and Pie", () => {
    render(<ChartComponent generationData={mockGenerationData} />);

    const switchButton = screen.getByRole("checkbox");
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
    act(() => {
      fireEvent.click(switchButton);
    });
    expect(screen.getByTestId("pie-chart")).toBeInTheDocument();
    expect(screen.queryByTestId("bar-chart")).not.toBeInTheDocument();
  });

  test("filters data by fuel type", async () => {
    render(<ChartComponent generationData={mockGenerationData} />);

    const fuelTypeSelect = screen.getAllByRole("combobox")[0];

    act(() => {
      fireEvent.mouseDown(fuelTypeSelect);
    });

    const solarOption = screen.getByText("Solar");
    act(() => {
      fireEvent.click(solarOption);
    });

    const barChart = screen.getByTestId("bar-chart");
    const chartData = JSON.parse(barChart.getAttribute("data-chart-data") || "{}");
    expect(chartData.labels).toEqual(["Solar"]);
    expect(chartData.datasets[0].data).toEqual([30]);
  });

  test("filters data by energy type", async () => {
    render(<ChartComponent generationData={mockGenerationData} />);

    const energySourceSelect = screen.getAllByRole("combobox")[1];

    act(() => {
      fireEvent.mouseDown(energySourceSelect);
    });

    const renewableOption = screen.getByText("Renewable");
    act(() => {
      fireEvent.click(renewableOption);
    });

    const barChart = screen.getByTestId("bar-chart");
    const chartData = JSON.parse(barChart.getAttribute("data-chart-data") || "{}");

    expect(chartData.labels).toEqual(["Biomass", "Solar"]);
    expect(chartData.datasets[0].data).toEqual([40, 30]);
  });

  test("clears fuel filter when energy type changes", async () => {
    render(<ChartComponent generationData={mockGenerationData} />);

    const fuelTypeSelect = screen.getAllByRole("combobox")[0];
    const energySourceSelect = screen.getAllByRole("combobox")[1];

    act(() => {
      fireEvent.mouseDown(fuelTypeSelect);
    });

    const solarOption = screen.getByText("Solar");
    act(() => {
      fireEvent.click(solarOption);
    });

    expect(fuelTypeSelect).toHaveTextContent("Solar");

    act(() => {
      fireEvent.mouseDown(energySourceSelect);
    });

    const renewableOption = screen.getByText("Renewable");
    act(() => {
      fireEvent.click(renewableOption);
    });

    expect(fuelTypeSelect).toHaveTextContent("All");
  });
});
