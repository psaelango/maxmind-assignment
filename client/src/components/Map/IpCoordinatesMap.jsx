import React, { useEffect, useRef, useState } from "react";
import MapboxGl from "mapbox-gl";

function IPCoordinatesMap(props) {
  const { ipAddressesInfo } = props;
  const [mapData, setMapData] = useState(ipAddressesInfo);

  const Mapcontainer = useRef(null);
  const map = useRef(null);

  const initMap = () => {
    if (map.current) return; // initialize map only once
    MapboxGl.accessToken =
      "pk.eyJ1IjoicHNhZWxhbmdvIiwiYSI6ImNpejV6end5bzA2ZjEzM3A4NTE3NnM5YXMifQ.OH-2rxal0YdBVhJTAab4fg";
    map.current = new MapboxGl.Map({
      container: Mapcontainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [11.5, 29.95],
      zoom: 0,
    });
    map.current.on("load", function () {
      map.current.resize();
    });
  };

  const removeMarkers = () => {
    const mapMarkers = document.getElementsByClassName("mapboxgl-marker");
    while (mapMarkers.length > 0) {
      mapMarkers[0].parentNode.removeChild(mapMarkers[0]);
    }
  };

  const addMarkers = (ipAddressesInfo) => {
    for (let i = 0; i < ipAddressesInfo.length; i++) {
      const { latitude, longitude, ipAddress, cityName } = ipAddressesInfo[i];
      if (longitude && latitude) {
        const coordinates = [longitude, latitude];
        const marker = document.createElement("div");
        marker.className = "map-marker";
        new MapboxGl.Marker(marker)
          .setLngLat(coordinates)
          .setPopup(
            new MapboxGl.Popup({ offset: 25 }).setText(`${ipAddress}`).setHTML(
              `
                <strong>City:</strong> ${cityName},<br />
                <strong>IP:</strong> ${ipAddress}
              `
            )
          )
          .addTo(map.current);
      }
    }
  };

  useEffect(() => {
    initMap();
  }, []);

  useEffect(() => {
    setMapData(ipAddressesInfo);
  }, [ipAddressesInfo]);

  useEffect(() => {
    removeMarkers();
    addMarkers(mapData);
  }, [mapData]);

  return (
    <div style={{ width: "500px", height: "500px", margin: "20px" }}>
      <div
        ref={Mapcontainer}
        id="map"
        style={{ position: "relative", width: "inherit", height: "inherit" }}
      />
    </div>
  );
}

export default IPCoordinatesMap;
