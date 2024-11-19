/* eslint-disable react/prop-types */
// src/components/MapView.js
import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import MapPlaceholder from "./MapPlaceholder";
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
  lat: 40.7128,
  lng: -74.006,
};

// eslint-disable-next-line react/prop-types
function MapView({ trips }) {
  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "80vh", width: "1000%" }}
      placeholder={<MapPlaceholder />}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {trips.map((trip, index) => {
        const pickupPosition = [
          parseFloat(trip.pickup_latitude),
          parseFloat(trip.pickup_longitude),
        ];
        const dropoffPosition = [
          parseFloat(trip.dropoff_latitude),
          parseFloat(trip.dropoff_longitude),
        ];

        return (
          <React.Fragment key={index}>
            <Polyline
              positions={[pickupPosition, dropoffPosition]}
              color='blue'
            />
            <Marker position={pickupPosition}>
              <Popup>
                <strong>Pickup</strong>
                <br />
                {`Time: ${trip.pickup_datetime}`}
                <br />
                {`Location: (${trip.pickup_latitude}, ${trip.pickup_longitude})`}
              </Popup>
            </Marker>
            <Marker position={dropoffPosition}>
              <Popup>
                <strong>Drop-off</strong>
                <br />
                {`Time: ${trip.dropoff_datetime}`}
                <br />
                {`Location: (${trip.dropoff_latitude}, ${trip.dropoff_longitude})`}
              </Popup>
            </Marker>
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
}

export default MapView;
