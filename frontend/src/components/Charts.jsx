import React, { useMemo } from "react";
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

function Charts({ fuelData }) {
  // Process refuel data
  const refuels = fuelData?.Refuels || [];

  // Prepare data for charts
  const chartData = useMemo(() => {
    return {
      labels: refuels.map((refuel, index) => `Refuel ${index + 1}`),
      datasets: [
        {
          label: "Refuel Amount (Liters)",
          data: refuels.map((refuel) => refuel.Amount),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Refuel Duration (Minutes)",
          data: refuels.map((refuel) => refuel.Duration * 60), // Convert to minutes
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [refuels]);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Fuel Refuel Analysis",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount / Duration",
        },
      },
    },
  };

  // Additional fuel statistics
  const fuelStats = useMemo(() => {
    if (!fuelData) return null;

    return {
      vehicleId: fuelData.VehicleID,
      dateRange: `${fuelData.FromDate} to ${fuelData.ToDate}`,
      startLevel: fuelData.StartLevel,
      endLevel: fuelData.EndLevel,
      totalConsumption: fuelData.Consumption,
      totalDistance: fuelData.TotalDistance,
      fuelEfficiency: fuelData.FuelEfficiency,
      totalRefuelAmount: refuels.reduce(
        (sum, refuel) => sum + refuel.Amount,
        0
      ),
      averageRefuelAmount:
        refuels.length > 0
          ? refuels.reduce((sum, refuel) => sum + refuel.Amount, 0) /
            refuels.length
          : 0,
      averageRefuelDuration:
        refuels.length > 0
          ? refuels.reduce((sum, refuel) => sum + refuel.Duration, 0) /
            refuels.length
          : 0,
    };
  }, [fuelData, refuels]);

  return (
    <div className='fuel-charts-container'>
      <h2>Fuel Refuel Analysis</h2>

      {fuelStats && (
        <div className='fuel-stats'>
          <h3>Vehicle Fuel Statistics</h3>
          <p>Vehicle ID: {fuelStats.vehicleId}</p>
          <p>Date Range: {fuelStats.dateRange}</p>
          <p>Start Fuel Level: {fuelStats.startLevel.toFixed(3)} L</p>
          <p>End Fuel Level: {fuelStats.endLevel.toFixed(3)} L</p>
          <p>Total Refuel Amount: {fuelStats.totalRefuelAmount.toFixed(3)} L</p>
          <p>
            Average Refuel Amount: {fuelStats.averageRefuelAmount.toFixed(3)} L
          </p>
          <p>
            Average Refuel Duration:{" "}
            {(fuelStats.averageRefuelDuration * 60).toFixed(2)} minutes
          </p>
        </div>
      )}

      <div className='chart-container'>
        <Bar
          data={chartData}
          options={options}
        />
      </div>
    </div>
  );
}

export default Charts;
