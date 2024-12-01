import React from "react";
import { DataGrid } from "@mui/x-data-grid";

interface DataComponentProps {
  generationData: { fuel: string; perc: number }[];
}

const DataComponent: React.FC<DataComponentProps> = ({ generationData }) => {
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "fuelType", headerName: "Fuel Type", width: 150 },
    { field: "percentage", headerName: "% of Generation Mix", width: 200 },
  ];

  const rows = generationData.map((item, index) => ({
    id: index + 1,
    fuelType: item.fuel.charAt(0).toUpperCase() + item.fuel.slice(1),
    percentage: item.perc,
  }));

  return (
    <div style={{ height: 700, width: "100%" }} className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-[#3b5998]">Summary of Energy Generation Data</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        data-testid="data-grid"
      />
    </div>
  );
};

export default DataComponent;
