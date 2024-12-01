import React from "react";
// @ts-ignore
import GaugeChart from "react-gauge-chart";

interface GaugeComponentProps {
  generationData: { fuel: string; perc: number }[];
}

const GaugeComponent: React.FC<GaugeComponentProps> = ({ generationData }) => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-[#3b5998]">Energy Generation Gauges</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {generationData.map((item) => (
          <div key={item.fuel} className="flex flex-col items-center">
            <GaugeChart
              id={`gauge-${item.fuel}`}
              nrOfLevels={30}
              percent={item.perc / 100}
              textColor="#000"
              colors={["#f0f0f0", "#3b5998"]}
              arcWidth={0.3}
            />
            <p className="mt-2 text-xl font-semibold text-[#3b5998]">
              {item.fuel.charAt(0).toUpperCase() + item.fuel.slice(1)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GaugeComponent;
