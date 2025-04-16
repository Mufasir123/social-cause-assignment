"use client";

import { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ngoList } from "@/data/ngos";
import { useState } from "react";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function FlyTo({ lat, lng }) {
  const map = useMap();
  map.flyTo([lat, lng], 10);
  return null;
}

export default function MapPage() {
  const [selectedNGO, setSelectedNGO] = useState(null);
  const popupRefs = useRef({});

  return (
    <div className="relative h-screen w-screen bg-black">
      {/* Map */}
      <MapContainer
        center={[22.9734, 78.6569]}
        zoom={5}
        scrollWheelZoom={true}
        className="absolute inset-0 z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {ngoList.map((ngo, idx) => (
          <Marker
            key={idx}
            position={[ngo.lat, ngo.lng]}
            icon={markerIcon}
            eventHandlers={{
              add: (e) => {
                popupRefs.current[ngo.name] = e.target.getPopup();
              },
            }}
          >
            <Popup>
              <div className="w-52">
                <h2 className="font-bold text-lg mb-1">{ngo.name}</h2>
                <p className="text-sm mb-2">{ngo.description}</p>
                <a
                  href={ngo.website}
                  target="_blank"
                  className="text-blue-400 hover:underline text-sm"
                >
                  Visit Website
                </a>
              </div>
            </Popup>
            {selectedNGO?.name === ngo.name && <FlyTo lat={ngo.lat} lng={ngo.lng} />}
          </Marker>
        ))}
      </MapContainer>

      {/* Sidebar */}
      <div className="absolute left-0 top-0 z-10 h-full w-80 bg-black bg-opacity-80 p-4 overflow-y-auto text-white shadow-xl">
        <h2 className="text-xl font-semibold mb-4">NGO Locations</h2>
        {ngoList.map((ngo, idx) => (
          <div
            key={idx}
            className="mb-4 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition"
            onClick={() => {
              setSelectedNGO(ngo);
              setTimeout(() => {
                popupRefs.current[ngo.name]?.openOn(
                  popupRefs.current[ngo.name]?._map
                );
              }, 300);
            }}
          >
            <h3 className="font-bold">{ngo.name}</h3>
            <p className="text-sm text-gray-300">{ngo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
