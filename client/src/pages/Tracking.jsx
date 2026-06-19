import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import { io } from "socket.io-client";
import "leaflet/dist/leaflet.css";

// Fix for default Leaflet icon issue in React
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Custom icon for Home (Destination)
const HomeIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Custom icon for Store (Restaurant)
const StoreIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Custom icon for Delivery Partner (Bike)
const BikeIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2956/2956934.png",
  iconSize: [35, 35],
  iconAnchor: [17, 17],
});

// Component to auto-fit the map to show both start and end points
const BoundsMap = ({ start, end }) => {
  const map = useMap();
  useEffect(() => {
    if (start && end) {
      map.fitBounds([start, end], { padding: [50, 50] });
    }
  }, [map, start, end]);
  return null;
};

const Tracking = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Locations from state or fallback
  const restaurantLocation = location.state?.restaurantLocation || [28.6100, 77.2000];
  const destination = location.state?.destination || [28.6150, 77.2100];
  
  // State for Delivery Boy's live position
  const [deliveryPos, setDeliveryPos] = useState(restaurantLocation);
  const [isConnected, setIsConnected] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);

  useEffect(() => {
    const socket = io("http://localhost:8000");

    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit('join-tracking', id);
    });

    socket.on("location-update", (data) => {
      setDeliveryPos([data.lat, data.lng]);
    });

    socket.on("order-delivered", (data) => {
      setIsDelivered(true);
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-1">Live Order Tracking</h2>
            <p className="text-gray-500 font-medium">Order ID: #{id}</p>
          </div>
          
          {isDelivered ? (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold flex items-center gap-2">
              <span>🎉</span> Order Delivered!
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full border border-amber-100">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-amber-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-sm font-bold text-amber-800">
                {isConnected ? "On the way" : "Connecting..."} 
              </span>
            </div>
          )}
        </div>

        {/* Map Container */}
        <div className="h-[500px] rounded-2xl overflow-hidden border-2 border-gray-100 relative shadow-inner">
          <MapContainer 
            center={restaurantLocation} 
            zoom={14} 
            style={{ height: "100%", width: "100%", zIndex: 0 }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Auto fit map */}
            <BoundsMap start={restaurantLocation} end={destination} />

            {/* Dotted line showing route */}
            <Polyline positions={[restaurantLocation, destination]} color="#f59e0b" weight={4} dashArray="10, 10" />

            {/* Store/Restaurant Marker */}
            <Marker position={restaurantLocation} icon={StoreIcon}>
              <Popup><strong>Restaurant</strong></Popup>
            </Marker>

            {/* Destination Marker */}
            <Marker position={destination} icon={HomeIcon}>
              <Popup><strong>Your Location</strong></Popup>
            </Marker>

            {/* Delivery Partner Marker (Bike) */}
            <Marker position={deliveryPos} icon={BikeIcon}>
              <Popup><strong>Delivery Partner</strong> <br/> is on the way!</Popup>
            </Marker>
            
          </MapContainer>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
              <h3 className="font-semibold text-gray-500 mb-1">Expected Arrival</h3>
              <p className="text-3xl font-black text-gray-900">{isDelivered ? "Delivered" : "15-20 Mins"}</p>
           </div>
           <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
              <h3 className="font-semibold text-gray-500 mb-1">Delivery Partner</h3>
              <p className="text-xl font-bold text-gray-900">Ramesh Kumar</p>
              <div className="text-amber-500 font-bold text-sm mt-1">★ 4.8</div>
           </div>
           <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
              <h3 className="font-semibold text-gray-500 mb-2">Need Help?</h3>
              <button className="bg-slate-900 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-800 transition-colors w-full">
                Call Partner
              </button>
           </div>
        </div>
        
        {isDelivered && (
          <div className="mt-8 text-center">
            <button onClick={() => navigate('/')} className="bg-amber-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-amber-700 transition-colors">
              Order Again
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Tracking;