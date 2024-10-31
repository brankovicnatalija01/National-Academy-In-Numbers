import "./index.css";
import Papa from "papaparse";
import { useState, useEffect } from "react";
import "./App.css";
import MainPage from "./components/MainPage";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the CSV file
    fetch("/AllObukeNAPA CSV.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          complete: function (results) {
            setData(results.data);
          },
        });
      });
  }, []);

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <MainPage data={data} />
    </div>
  );
}

export default App;
