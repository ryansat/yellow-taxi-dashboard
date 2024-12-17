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
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#fff",
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#fff",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Speed & Fuel Level Distribution",
        color: "#fff",
        font: {
          size: 16,
          weight: "bold",
        },
      },
      legend: {
        labels: {
          color: "#fff",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
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
    <div className='charts-wrapper'>
      <h2 className='chart-title'>Speed & Fuel Level Distribution</h2>
      <div className='chart-container'>
        <Bar
          data={data}
          options={options}
        />
      </div>
      {fuelData && (
        <div className='fuel-summary'>
          <div className='fuel-summary-header'>
            <h3>Fuel Consumption Summary</h3>
          </div>
          <div className='fuel-summary-content'>
            <div className='fuel-summary-item'>
              <span className='fuel-label'>Start Level:</span>
              <span className='fuel-value'>
                {fuelData.start_level.toFixed(2)} L
              </span>
            </div>
            <div className='fuel-summary-item'>
              <span className='fuel-label'>End Level:</span>
              <span className='fuel-value'>
                {fuelData.end_level.toFixed(2)} L
              </span>
            </div>
            <div className='fuel-summary-item'>
              <span className='fuel-label'>Total Consumption:</span>
              <span className='fuel-value'>
                {fuelData.consumption.toFixed(2)} L
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Charts;
