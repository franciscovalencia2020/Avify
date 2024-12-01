import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sidebar, Footer, Navbar, Chart, Data, Gauge } from "./components/index";
import CircularProgress from "@mui/material/CircularProgress";

const App: React.FC = () => {
  const [activeOption, setActiveOption] = useState("charts");
  const [generationData, setGenerationData] = useState<{ fuel: string; perc: number }[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (isInitialLoad = false) => {
    try {
      if (isInitialLoad) {
        setIsLoading(true);
      }
      const response = await axios.get("https://api.carbonintensity.org.uk/generation");
      setGenerationData(response.data.data.generationmix);
      setLastUpdate(response.data.data.from);
      if (isInitialLoad) {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      if (isInitialLoad) {
        setError("Error fetching data");
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData(true);

    const interval = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><CircularProgress /></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-600">{error}</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar lastUpdate={lastUpdate} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeOption={activeOption}
          onOptionChange={(option) => setActiveOption(option)}
        />
        <div className="flex-1 p-6">
          {activeOption === "charts" ? (
            <Chart generationData={generationData} />
          ) : activeOption === "data" ? (
            <Data generationData={generationData} />
          ) : (
            <Gauge generationData={generationData} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export { App };
