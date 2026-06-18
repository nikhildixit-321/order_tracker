import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { io } from "socket.io-client";
import "leaflet/dist/leaflet.css";

// Fix for default Leaflet icon issue in React
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const Tracking = () => {
  const { id } = useParams();
  
  // State for Delivery Boy's live position (Default to New Delhi)
  const [deliveryPos, setDeliveryPos] = useState([28.6139, 77.2090]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // 1. Connect to backend socket
    const socket = io("http://localhost:3000"); // Backend address

    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Connected to live tracking server!");
    });

    // 2. Listen for 'location-update' event
    socket.on("location-update", (data) => {
      // Backend is sending data as { lat: ..., lng: ... }
      setDeliveryPos([data.lat, data.lng]);
    });

    // 3. Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Live Order Tracking</h2>
            <p className="text-gray-500">Order ID: #{id}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="text-sm font-medium text-gray-600">
              {isConnected ? "Live Tracking Active" : "Connecting..."}
            </span>
          </div>
        </div>

        {/* Map Container */}
        <div className="h-96 rounded-xl overflow-hidden border border-gray-200">
          <MapContainer 
            center={deliveryPos} 
            zoom={15} 
            style={{ height: "100%", width: "100%", zIndex: 0 }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Moving Marker */}
            <Marker position={deliveryPos}>
              <Popup>
                <strong>Delivery Partner</strong> <br/> is on the way!
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="mt-6 flex gap-4">
           <div className="flex-1 bg-amber-50 rounded-lg p-4 border border-amber-100">
              <h3 className="font-semibold text-amber-800">Expected Time</h3>
              <p className="text-2xl font-bold text-amber-600">15-20 Mins</p>
           </div>
           <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-100">
              <h3 className="font-semibold text-gray-800">Current Coordinates</h3>
              <p className="text-sm text-gray-600 mt-1">Lat: {deliveryPos[0].toFixed(4)}</p>
              <p className="text-sm text-gray-600">Lng: {deliveryPos[1].toFixed(4)}</p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Tracking;