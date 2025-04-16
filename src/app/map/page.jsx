// app/map/page.js
"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const Map = dynamic(() => import("@/components/MapComponent"), { ssr: false });

export default function MapPage() {
  return (
    <div className="h-screen">
      <h1 className="text-2xl font-bold text-center py-4 bg-black text-white">Interactive Map</h1>
      <Map />
    </div>
  );
}
