/* eslint-disable react/prop-types */
import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const center = {
  lat: -8.1165,
  lng: 112.1505,
};

// eslint-disable-next-line react/prop-types
function MapView({ trips }) {
  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {trips.map((trip, index) => {
        const startPosition = [trip.StartPos.Latitude, trip.StartPos.Longitude];
        const endPosition = [trip.EndPos.Latitude, trip.EndPos.Longitude];

        return (
          <React.Fragment key={index}>
            <Polyline
              positions={[startPosition, endPosition]}
              color='blue'
            />
            <Marker position={startPosition}>
              <Popup>
                <strong>Start Position</strong>
                <br />
                {`Time: ${new Date(trip.StartTime).toLocaleString()}`}
                <br />
                {`Speed: ${trip.StartPos.Speed} km/h`}
                <br />
                {`Location: (${trip.StartPos.Latitude}, ${trip.StartPos.Longitude})`}
                {trip.StartPos.Address && (
                  <>
                    <br />
                    {`Address: ${trip.StartPos.Address}`}
                  </>
                )}
              </Popup>
            </Marker>
            <Marker position={endPosition}>
              <Popup>
                <strong>End Position</strong>
                <br />
                {`Time: ${new Date(trip.EndTime).toLocaleString()}`}
                <br />
                {`Speed: ${trip.EndPos.Speed} km/h`}
                <br />
                {`Location: (${trip.EndPos.Latitude}, ${trip.EndPos.Longitude})`}
                {trip.EndPos.Address && (
                  <>
                    <br />
                    {`Address: ${trip.EndPos.Address}`}
                  </>
                )}
              </Popup>
            </Marker>
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
}

export default MapView;
