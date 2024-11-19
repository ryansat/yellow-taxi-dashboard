/* eslint-disable react/prop-types */
// src/components/TripList.js

// eslint-disable-next-line react/prop-types
function TripList({ trips }) {
  return (
    <div>
      <h2>Trip List</h2>
      <ul>
        {trips.map((trip, index) => (
          <li key={index}>
            <strong>Fare:</strong> ${trip.fare_amount} -{" "}
            <strong>Distance:</strong> {trip.trip_distance} miles
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TripList;
