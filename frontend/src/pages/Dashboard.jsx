import { useState, useEffect } from "react";
import MapView from "../components/MapView";
import Charts from "../components/Charts";
import "./Dashboard.css";

function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [mapPositions, setMapPositions] = useState([]);
  const [fuelData, setFuelData] = useState(null);
  const [filters, setFilters] = useState({
    time: "",
    fare: "",
    distance: "",
    paymentType: "",
    fromDate: "2024-12-01",
    toDate: "2024-12-17",
    vehicleId: "11115",
  });

  const fetchFuelData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/fuel/report/${filters.vehicleId}?fromDate=${filters.fromDate}&toDate=${filters.toDate}`
      );
      const { data } = await response.json();
      setFuelData(data);
    } catch (error) {
      console.error("Error fetching fuel data:", error);
    }
  };

  // Fetch NYC Taxi Data
  useEffect(() => {
    const fetchTaxiData = async () => {
      try {
        const query = [
          filters.time && `pickup_datetime=${filters.time}`,
          filters.fare && `fare_amount=${filters.fare}`,
          filters.distance && `trip_distance=${filters.distance}`,
          filters.paymentType && `payment_type=${filters.paymentType}`,
        ]
          .filter(Boolean)
          .join("&");

        const response = await fetch(
          `https://data.cityofnewyork.us/resource/gkne-dk5s.json?$limit=100&${query}`
        );
        const data = await response.json();
        setTrips(data);
      } catch (error) {
        console.error("Error fetching taxi data:", error);
      }
    };

    fetchFuelData();

    // Fetch Vehicle Position Data
    const fetchVehiclePositions = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/position/report/${filters.vehicleId}?fromDate=${filters.fromDate}&toDate=${filters.toDate}`
        );
        const { data } = await response.json();
        setMapPositions(data);
      } catch (error) {
        console.error("Error fetching vehicle positions:", error);
      }
    };

    fetchTaxiData();
    fetchVehiclePositions();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className='dashboard-container'>
      <div className='filters'>
        {/* <select
          name='paymentType'
          onChange={handleFilterChange}
          value={filters.paymentType}
        >
          <option value=''>All Payment Types</option>
          <option value='1'>Credit Card</option>
          <option value='2'>Cash</option>
          <option value='3'>No Charge</option>
          <option value='4'>Dispute</option>
          <option value='5'>Unknown</option>
        </select> */}

        <input
          type='date'
          name='fromDate'
          value={filters.fromDate}
          onChange={handleFilterChange}
        />

        <input
          type='date'
          name='toDate'
          value={filters.toDate}
          onChange={handleFilterChange}
        />
      </div>

      <div className='map-container'>
        <MapView positions={mapPositions} />
      </div>

      <div className='chart-container'>
        <Charts fuelData={fuelData} />
      </div>
    </div>
  );
}

export default Dashboard;
