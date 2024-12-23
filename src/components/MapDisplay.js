import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const MapBoxMap = () => {
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWlsbHlnb3VjaGVyIiwiYSI6ImNtM3F3ZW5rYzBzdzYyam4wYTFhMzFkMnAifQ.GfzkDJv55IBNYDtcdFXN7w";

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40], // Default center
      zoom: 9, // Default zoom
    });

    // Add Mapbox Geocoder (search bar)
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Search for a location", // Placeholder text
    });

    // Add the geocoder to the map
    map.addControl(geocoder, "top-left");

    // Listen for geocoder result events
    geocoder.on("result", (e) => {
      console.log("Selected location:", e.result.center);
      map.flyTo({
        center: e.result.center, // Move map to selected location
        zoom: 12, // Adjust zoom level
      });
    });

    return () => map.remove(); // Cleanup the map on unmount
  }, []);

  return (
    <div
      id="map"
      style={{
        height: "80vh",
        width: "100%",
        border: "1px solid #ddd",
        borderRadius: "5px",
      }}
    />
  );
};

export default MapBoxMap;
