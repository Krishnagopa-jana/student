import { useEffect, useState } from "react";
import { CanvasJSChart } from "canvasjs-react-charts"; // Corrected import

const Histogram = ({ data, xAxisTitle, yAxisTitle }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(data); // Set the data for the chart when it is passed as a prop
  }, [data]);

  const options = {
    animationEnabled: true,
    theme: "light",
    backgroundColor: null,
    title: {
      text: "", // Removed the chart heading
    },
    axisX: {
      title: xAxisTitle || "Marks Range",
      interval: 1,
      zoomEnabled: true, // Enable zoom on X-axis
    },
    axisY: {
      title: yAxisTitle || "Number of Students",
      zoomEnabled: true, // Enable zoom on Y-axis
    },
    data: [
      {
        type: "column",
        name: "Marks Distribution",
        showInLegend: true,
        dataPoints: chartData,
        color: "#4760B2",
      },
    ],
    toolTip: {
      shared: true,
    },
    zoomEnabled: true, // Enable zoom on both axes
  };

  return <CanvasJSChart options={options} />;
};

export default Histogram;
