import { useState, useEffect } from "react";
import MapView from "../components/MapView";
import Charts from "../components/Charts";
import "./Dashboard.css";

function Dashboard() {
    const [trips, setTrips] = useState([]);
    const [mapPositions, setMapPositions] = useState([]);
    const [fuelData, setFuelData] = useState(null);
    const [filters, setFilters] = useState({
        fromDate: "2024-12-01",
        toDate: "2024-12-17",
        vehicleId: "11115",
    });
    const [isLoading, setIsLoading] = useState(false);

    const fetchFuelData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/fuel/report/${filters.vehicleId}?fromDate=${filters.fromDate}&toDate=${filters.toDate}`
            );
            const { data } = await response.json();
            setFuelData(data);
        } catch (error) {
            console.error("Error fetching fuel data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchVehiclePositions = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/position/report/${filters.vehicleId}?fromDate=${filters.fromDate}&toDate=${filters.toDate}`
            );
            const { data } = await response.json();
            setMapPositions(data);
        } catch (error) {
            console.error("Error fetching vehicle positions:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        fetchFuelData();
        fetchVehiclePositions();
    };

    return (
        <div className="dashboard-container">
            <div className="filters">
                <input
                    type="date"
                    name="fromDate"
                    value={filters.fromDate}
                    onChange={handleFilterChange}
                />

                <input
                    type="date"
                    name="toDate"
                    value={filters.toDate}
                    onChange={handleFilterChange}
                />

                <input
                    type="text"
                    name="vehicleId"
                    value={filters.vehicleId}
                    onChange={handleFilterChange}
                    placeholder="Vehicle ID"
                />

                <button onClick={handleSubmit}>Submit</button>
            </div>

            <div className="map-container">
                {isLoading ? (
                    <div className="loading-overlay">
                        <div className="loading-spinner"></div>
                    </div>
                ) : (
                    <MapView positions={mapPositions} />
                )}
            </div>

            <div className="chart-container">
                {isLoading ? (
                    <div className="loading-overlay">
                        <div className="loading-spinner"></div>
                    </div>
                ) : (
                    <Charts fuelData={fuelData} />
                )}
            </div>
        </div>
    );
}

export default Dashboard;