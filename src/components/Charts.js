import React from "react";
import Chart from "chart.js/auto";

export default function Charts() {
  const glucoseChartRef = React.useRef(null);
  const bloodPressureChartRef = React.useRef(null);
  const weightChartRef = React.useRef(null);

  React.useEffect(() => {
    // Dummy data for the graphs
    const glucoseData = [500, 450, 89, 95, -600, -5];
    const bloodPressureData = [78, 89, 600, 56, 140, -45];
    const weightData = [0, 155, 136, 165, 10, 175];

    // Chart.js configuration
    const chartConfig = {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Glucose",
            data: glucoseData,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    // Destroy existing charts if they exist
    if (glucoseChartRef.current && glucoseChartRef.current.chart) {
      glucoseChartRef.current.chart.destroy();
    }
    if (bloodPressureChartRef.current && bloodPressureChartRef.current.chart) {
      bloodPressureChartRef.current.chart.destroy();
    }
    if (weightChartRef.current && weightChartRef.current.chart) {
      weightChartRef.current.chart.destroy();
    }

    // Create the glucose chart
    const glucoseCtx = glucoseChartRef.current.getContext("2d");
    glucoseChartRef.current.chart = new Chart(glucoseCtx, chartConfig);

    // Update the chart configuration for blood pressure
    chartConfig.data.datasets[0].label = "Blood Pressure";
    chartConfig.data.datasets[0].data = bloodPressureData;
    chartConfig.data.datasets[0].borderColor = "rgba(255, 99, 132, 1)";
    chartConfig.data.datasets[0].backgroundColor = "rgba(255, 99, 132, 0.2)";

    // Create the blood pressure chart
    const bloodPressureCtx = bloodPressureChartRef.current.getContext("2d");
    bloodPressureChartRef.current.chart = new Chart(
      bloodPressureCtx,
      chartConfig
    );

    // Update the chart configuration for weight
    chartConfig.data.datasets[0].label = "Weight";
    chartConfig.data.datasets[0].data = weightData;
    chartConfig.data.datasets[0].borderColor = "rgba(54, 162, 235, 1)";
    chartConfig.data.datasets[0].backgroundColor = "rgba(54, 162, 235, 0.2)";

    // Create the weight chart
    const weightCtx = weightChartRef.current.getContext("2d");
    weightChartRef.current.chart = new Chart(weightCtx, chartConfig);
  }, []);

  return (
    <div className="mx-auto border max-w-screen-xl p-2 lg:rounded-full lg:pl-6 w-full">
      <div className="grid grid-cols-3 gap-4">{/* Profile information */}</div>

      <div className="flex gap-3 mt-4">
        {/* Buttons for Blood Group, Allergies, and Current Medications */}
      </div>

      <div className="flex gap-4 mt-4">
        <div className="bg-gray-200 h-48 rounded-md shadow-md flex-grow">
          <canvas ref={glucoseChartRef}></canvas>
        </div>
        <div className="bg-gray-200 h-48 rounded-md shadow-md flex-grow">
          <canvas ref={bloodPressureChartRef}></canvas>
        </div>
        <div className="bg-gray-200 h-48 rounded-md shadow-md flex-grow">
          <canvas ref={weightChartRef}></canvas>
        </div>
      </div>
    </div>
  );
}
