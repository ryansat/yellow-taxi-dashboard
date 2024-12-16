import "./TripList.css";
function TripList({ trips }) {
  return (
    <div className='trip-list-container'>
      <h2 className='trip-list-title'>Trip List</h2>
      <ul className='trip-list'>
        {trips.map((trip, index) => (
          <li
            key={index}
            className='trip-item'
          >
            <div className='trip-fuel-summary'>
              <h3>Fuel Consumption Summary</h3>
              <div className='summary-item'>
                <strong>Start Level:</strong>{" "}
                {trip.fuelLevel ? `${trip.fuelLevel.toFixed(2)} L` : "N/A"}
              </div>
              <div className='summary-item'>
                <strong>End Level:</strong>{" "}
                {trip.endFuelLevel
                  ? `${trip.endFuelLevel.toFixed(2)} L`
                  : "N/A"}
              </div>
              <div className='summary-item'>
                <strong>Total Consumption:</strong>{" "}
                {trip.consumption ? `${trip.consumption.toFixed(2)} L` : "N/A"}
              </div>
            </div>

            <div className='trip-details'>
              <div className='detail-item'>
                <strong>Time:</strong>{" "}
                {new Date(trip.StartTime).toLocaleString()}
              </div>
              <div className='detail-item'>
                <strong>Speed:</strong> {trip.StartPos.Speed.toFixed(2)} km/h
              </div>
              <div className='detail-item'>
                <strong>Location:</strong> {trip.StartPos.Address || "N/A"}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TripList;
