/* eslint-disable react/prop-types */
// src/components/Charts.js
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

function Charts({ trips }) {
  const fares = trips.map((trip) => parseFloat(trip.fare_amount));
  const distances = trips.map((trip) => parseFloat(trip.trip_distance));

  const data = {
    labels: trips.map((_, index) => `Trip ${index + 1}`),
    datasets: [
      {
        label: "Fare Amount",
        data: fares,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Trip Distance",
        data: distances,
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
  };

  return (
    <div>
      <h2>Fare & Distance Distribution</h2>
      <Bar
        data={data}
        options={options}
      />
    </div>
  );
}

export default Charts;
