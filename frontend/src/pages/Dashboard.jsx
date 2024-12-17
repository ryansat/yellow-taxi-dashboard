import MapView from "../components/MapView";
import TripList from "../components/TripList";
import Charts from "../components/Charts";
import { useState, useEffect } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [positionData, setPositionData] = useState([]);
  const [fuelData, setFuelData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    fromDate: "2024-12-01",
    toDate: "2024-12-17",
    vehicleId: "11115",
  });

  const [tempFilters, setTempFilters] = useState({
    fromDate: "2024-12-01",
    toDate: "2024-12-17",
    vehicleId: "11115",
  });

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch position data
      const positionResponse = await fetch(
        `http://localhost:3000/api/v1/position/report/${filters.vehicleId}?fromDate=${filters.fromDate}&toDate=${filters.toDate}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const positionResult = await positionResponse.json();

      // Fetch fuel data
      const fuelResponse = await fetch(
        `http://localhost:3000/api/v1/fuel/report/${filters.vehicleId}?fromDate=${filters.fromDate}&toDate=${filters.toDate}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const fuelResult = await fuelResponse.json();

      if (positionResult.data || fuelResult.data) {
        setPositionData(positionResult.data || []);
        setFuelData(fuelResult.data || null);
      } else {
        setPositionData([]);
        setFuelData(null);
        setError("No data found for the selected filters");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
      setPositionData([]);
      setFuelData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Only fetch on initial load

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setTempFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    setFilters(tempFilters);
    fetchData();
  };

  const handleReset = () => {
    const defaultFilters = {
      fromDate: "2024-12-01",
      toDate: "2024-12-17",
      vehicleId: "11115",
    };
    setTempFilters(defaultFilters);
    setFilters(defaultFilters);
    fetchData();
  };

  // Combine position and fuel data for display
  const combinedData = positionData.map((trip) => {
    const fuelReading = fuelData?.readings?.find(
      (reading) =>
        new Date(reading.timestamp).toISOString() ===
        new Date(trip.StartTime).toISOString()
    );

    return {
      ...trip,
      fuelLevel: fuelReading?.level || null,
      location: fuelReading?.location || trip.StartPos.Address,
      consumption: fuelData?.consumption || 0,
    };
  });

  return (
    <div className='dashboard-container'>
      <div className='filters'>
        <div className='filter-inputs'>
          <div className='filter-group'>
            <h4>From Date</h4>
            <input
              type='date'
              name='fromDate'
              value={tempFilters.fromDate}
              onChange={handleFilterChange}
              className='filter-input'
            />
          </div>

          <div className='filter-group'>
            <h4>To Date</h4>
            <input
              type='date'
              name='toDate'
              value={tempFilters.toDate}
              onChange={handleFilterChange}
              className='filter-input'
            />
          </div>

          <div className='filter-group'>
            <h4>Vehicle Id</h4>
            <input
              type='text'
              name='vehicleId'
              value={tempFilters.vehicleId}
              onChange={handleFilterChange}
              className='filter-input'
            />
          </div>
        </div>

        <div className='filter-buttons'>
          <button
            onClick={handleApplyFilters}
            className='filter-button apply'
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Apply Filters"}
          </button>
          <button
            onClick={handleReset}
            className='filter-button reset'
            disabled={isLoading}
          >
            Reset
          </button>
        </div>
      </div>

      {error && <div className='error-message'>{error}</div>}

      <div className='map-container'>
        {isLoading ? (
          <div className='loading'>Loading map data...</div>
        ) : (
          <MapView trips={positionData || []} />
        )}
      </div>

      <div className='content-container'>
        <div className='charts'>
          {isLoading ? (
            <div className='loading'>Loading charts...</div>
          ) : (
            <Charts
              trips={combinedData || []}
              fuelData={fuelData}
            />
          )}
        </div>
        {/* <div className='trip-list'>
          {isLoading ? (
            <div className='loading'>Loading trip list...</div>
          ) : (
            <TripList
              trips={(combinedData || []).slice(0, 10)}
              showFuel={true}
            />
          )}
        </div> */}
      </div>
    </div>
  );
}

export default Dashboard;
