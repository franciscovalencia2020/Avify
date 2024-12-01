import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement } from "chart.js";
import Switch from "@mui/material/Switch";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement);

interface ChartComponentProps {
  generationData: { fuel: string; perc: number }[];
}

const ChartComponent: React.FC<ChartComponentProps> = ({ generationData }) => {
  const [chartType, setChartType] = useState("bar");
  const [filteredData, setFilteredData] = useState(generationData);
  const [selectedFuel, setSelectedFuel] = useState("all");
  const [energyType, setEnergyType] = useState("all");

  useEffect(() => {
    let updatedData = generationData;
    if (selectedFuel !== "all") {
      updatedData = updatedData.filter(item => item.fuel === selectedFuel);
    }
    if (energyType !== "all") {
      if (energyType === "renewable") {
        updatedData = updatedData.filter(item => ["biomass", "hydro", "solar", "wind"].includes(item.fuel));
      } else if (energyType === "non-renewable") {
        updatedData = updatedData.filter(item => ["coal", "gas", "nuclear", "imports", "other"].includes(item.fuel));
      }
    }
    setFilteredData(updatedData);
  }, [selectedFuel, energyType, generationData]);

  useEffect(() => {
    if (energyType !== "all") {
      setSelectedFuel("all");
    }
  }, [energyType]);

  const labels = filteredData.map((item) => item.fuel.charAt(0).toUpperCase() + item.fuel.slice(1));
  const dataValues = filteredData.map((item) => item.perc);

  const data = {
    labels,
    datasets: [
      {
        label: "% of Generation Mix",
        data: dataValues,
        backgroundColor: [
          "#4b70ad",
          "#5c82b6",
          "#6d94bf",
          "#7fa6c8",
          "#90b8d1",
          "#a1cade",
          "#b2dbeb",
          "#c3ecf8",
          "#d4f7ff",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text: "Energy Generation Mix",
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || "";
            const value = context.raw;
            return `${label}: ${value}% of total generation`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "% of Generation Mix",
        },
      },
      x: {
        title: {
          display: true,
          text: "Fuel Type",
        },
      },
    },
  };

  return (
    <div>
      <div className="flex gap-4">
        <FormControl variant="outlined" size="small" className="mr-4 w-48">
          <InputLabel>Fuel Type</InputLabel>
          <Select
            value={selectedFuel}
            onChange={(e) => setSelectedFuel(e.target.value)}
            label="Fuel Type"
          >
            <MenuItem value="all">All</MenuItem>
            {generationData
              .filter(
                (item) =>
                  energyType === "all" ||
                  (energyType === "renewable" &&
                    ["biomass", "hydro", "solar", "wind"].includes(item.fuel)) ||
                  (energyType === "non-renewable" &&
                    ["coal", "gas", "nuclear", "imports", "other"].includes(item.fuel))
              )
              .map((item) => (
                <MenuItem key={item.fuel} value={item.fuel}>
                  {item.fuel.charAt(0).toUpperCase() + item.fuel.slice(1)}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" size="small" className="w-48">
          <InputLabel>Energy Source</InputLabel>
          <Select
            value={energyType}
            onChange={(e) => setEnergyType(e.target.value)}
            label="Energy Source"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="renewable">Renewable</MenuItem>
            <MenuItem value="non-renewable">Non-Renewable</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="chart-container max-w-3xl mx-auto mb-6 h-[60vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#3b5998]">Energy Generation Chart</h2>
          <div className="flex items-center">
            <span className="mr-2 text-[#3b5998]">Bar</span>
            <Switch
              checked={chartType === "pie"}
              onChange={() => setChartType(chartType === "bar" ? "pie" : "bar")}
              color="primary"
            />
            <span className="ml-2 text-[#3b5998]">Pie</span>
          </div>
        </div>
        {chartType === "bar" ? (
          <Bar data={data} options={options} />
        ) : (
          <Pie data={data} options={options} />
        )}
      </div>
    </div>
  );
};

export default ChartComponent;