import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

function Charts({ trips, fuelData }) {
  // Get speed data from trips
  const speeds = trips.map((trip) => trip.StartPos.Speed);

  // Get fuel levels if available
  const fuelLevels = fuelData?.readings?.map((reading) => reading.level) || [];

  const data = {
    labels: trips.map((_, index) => `Reading ${index + 1}`),
    datasets: [
      {
        label: "Speed (km/h)",
        data: speeds,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Fuel Level (L)",
        data: fuelLevels,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Speed & Fuel Level Distribution",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.parsed.y || 0;
            return `${label}: ${value.toFixed(2)}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>Speed & Fuel Level Distribution</h2>
      <Bar
        data={data}
        options={options}
      />
      {fuelData && (
        <div
          className='fuel-summary'
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#f5f5f5",
            borderRadius: "4px",
          }}
        >
          <h3>Fuel Consumption Summary</h3>
          <p>Start Level: {fuelData.start_level.toFixed(2)} L</p>
          <p>End Level: {fuelData.end_level.toFixed(2)} L</p>
          <p>Total Consumption: {fuelData.consumption.toFixed(2)} L</p>
        </div>
      )}
    </div>
  );
}

export default Charts;
