// src/pages/Dashboard.js
import MapView from "../components/MapView";
import TripList from "../components/TripList";
import Charts from "../components/Charts";
import { useState, useEffect } from "react";
import "./Dashboard.css"; // Import CSS file

function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [filters, setFilters] = useState({
    time: "",
    fare: "",
    distance: "",
    paymentType: "",
  });

  useEffect(() => {
    const fetchData = async () => {
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
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
      <div className='map-container'>
        <MapView trips={trips} />
      </div>
      <div className='content-container'>
        <div className='charts'>
          <Charts trips={trips} />
        </div>
        <div className='trip-list'>
          <TripList trips={trips.slice(0, 10)} />
        </div>
      </div>
      <div className='filters'>
        <input
          type='datetime-local'
          name='time'
          value={filters.time}
          onChange={handleFilterChange}
          placeholder='Pickup Time'
        />
        <input
          type='number'
          name='fare'
          value={filters.fare}
          onChange={handleFilterChange}
          placeholder='Fare Amount'
        />
        <input
          type='number'
          name='distance'
          value={filters.distance}
          onChange={handleFilterChange}
          placeholder='Trip Distance'
        />
        <select
          name='paymentType'
          value={filters.paymentType}
          onChange={handleFilterChange}
        >
          <option value=''>All Payment Types</option>
          <option value='CRD'>Credit Card</option>
          <option value='CSH'>Cash</option>
          <option value='NOC'>No Charge</option>
          <option value='DIS'>Dispute</option>
          <option value='UNK'>Unknown</option>
        </select>
      </div>
    </div>
  );
}

export default Dashboard;
