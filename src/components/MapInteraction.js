import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

const MapInteraction = ({ onNext }) => {
  const [map, setMap] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWlsbHlnb3VjaGVyIiwiYSI6ImNtM3F3ZW5rYzBzdzYyam4wYTFhMzFkMnAifQ.GfzkDJv55IBNYDtcdFXN7w";

    const mapInstance = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40],
      zoom: 9,
    });

    const draw = new MapboxDraw();
    mapInstance.addControl(draw);

    mapInstance.on("draw.create", (e) => {
      const polygon = e.features[0];
      setSelectedArea(polygon.geometry.coordinates);
    });

    setMap(mapInstance);
    return () => mapInstance.remove();
  }, []);

  return (
    <div>
      <h2>Where are you looking for schools?</h2>
      <p>Position the map where you are looking for schools.</p>
      <div id="map" style={{ height: "60vh", width: "100%", marginBottom: "20px" }} />
      <button onClick={() => onNext(selectedArea)} disabled={!selectedArea}>
        Next
      </button>
    </div>
  );
};

export default MapInteraction;
