import React, { useMemo } from "react";
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

function MapView({ positions }) {
  // Determine center based on positions or use a default
  const center = useMemo(() => {
    if (positions && positions.length > 0) {
      return {
        lat: positions[0].StartPos.Latitude,
        lng: positions[0].StartPos.Longitude,
      };
    }
    return { lat: -7.3316233, lng: 112.7067116 }; // Default to first position in previous example
  }, [positions]);

  // Create path from positions
  const positionPath = useMemo(() => {
    return positions.map((pos) => [
      pos.StartPos.Latitude,
      pos.StartPos.Longitude,
    ]);
  }, [positions]);

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "80vh", width: "100%" }}
      placeholder={<MapPlaceholder />}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {/* Vehicle Path Polyline */}
      {positionPath.length > 1 && (
        <Polyline
          positions={positionPath}
          color='blue'
          weight={3}
        />
      )}

      {positions.map((position, index) => {
        const markerPosition = [
          position.StartPos.Latitude,
          position.StartPos.Longitude,
        ];

        return (
          <Marker
            key={index}
            position={markerPosition}
          >
            <Popup>
              <div>
                <strong>Vehicle Position {index + 1}</strong>
                <br />
                <strong>Vehicle ID:</strong> {position.StartPos.VehicleID}
                <br />
                <strong>Time:</strong> {position.StartTime}
                <br />
                <strong>Address:</strong> {position.StartPos.Address}
                <br />
                <strong>Speed:</strong> {position.StartPos.Speed} km/h
                <br />
                <strong>Location:</strong>(
                {position.StartPos.Latitude.toFixed(4)},{" "}
                {position.StartPos.Longitude.toFixed(4)})
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default MapView;
