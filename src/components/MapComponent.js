import React, { useRef, useState } from "react";
import MapGL, { Marker } from "react-map-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import "mapbox-gl/dist/mapbox-gl.css";

const schools = [
  { id: 1, name: "School A", lat: 40.75, lon: -74.0 },
  { id: 2, name: "School B", lat: 40.72, lon: -73.98 },
  { id: 3, name: "School C", lat: 40.74, lon: -73.95 },
];

const MapComponent = () => {
  const mapRef = useRef(null);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const draw = new MapboxDraw(); // Initialize Mapbox Draw

  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
console.log(MAPBOX_TOKEN, 'TOKNENEN')
  const handleDrawCreate = (e) => {
    const drawnPolygon = e.features[0];
    const polygonCoords = drawnPolygon.geometry.coordinates;

    // Filter schools within the drawn area using Turf.js
    const schoolsInside = schools.filter((school) => {
      const point = turf.point([school.lon, school.lat]);
      const polygon = turf.polygon(polygonCoords);
      return turf.booleanPointInPolygon(point, polygon);
    });

    setFilteredSchools(schoolsInside); // Update the filtered schools
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapGL
        ref={mapRef}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          latitude: 40.73,
          longitude: -73.99,
          zoom: 12,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onLoad={() => console.log("Map loaded successfully")}
        // onLoad={(event) => {
        //   const map = event.target;
        //   map.addControl(draw, "top-left"); // Add the Draw control
        //   map.on("draw.create", handleDrawCreate); // Attach event listener
        // }}
      >
        {/* Render filtered schools */}
        {filteredSchools.map((school) => (
          <Marker key={school.id} latitude={school.lat} longitude={school.lon}>
            <div style={{ color: "red", fontSize: "20px" }}>📍</div>
          </Marker>
        ))}
      </MapGL>
    </div>
  );
};

export default MapComponent;
