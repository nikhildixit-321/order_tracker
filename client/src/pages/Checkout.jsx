import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet icon
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

// Custom hook to handle map clicks
function LocationSelector({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

// Component to smoothly change map view when coordinates change
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const product = location.state?.productdetails;
  
  // Default delivery location (New Delhi)
  const [deliveryPos, setDeliveryPos] = useState([28.6139, 77.2090]);
  const [loading, setLoading] = useState(false);

  // Get User's Current Location on Load
  useEffect(() => {
    handleGetCurrentLocation();
  }, []);

  const handleGetCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setDeliveryPos([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting location: ", error);
          alert("Aapki current location nahi mil payi. Kripya browser ko location access allow karein.");
        }
      );
    } else {
      alert("Aapka browser Geolocation support nahi karta.");
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          product,
          deliveryLocation: { lat: deliveryPos[0], lng: deliveryPos[1] } 
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Direct navigation to tracking without alert for a smoother feel
        navigate(`/tracking/${data.orderId}`, { 
          state: { 
            destination: deliveryPos,
            restaurantLocation: [data.restaurantLocation.lat, data.restaurantLocation.lng]
          } 
        });
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <div className="text-center mt-20 font-bold text-2xl">Koi product select nahi kiya! Go back to Home.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8 mt-10">
       {/* Left Side - Delivery Address & Map */}
       <div className="w-full md:w-2/3 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-extrabold mb-1 text-gray-900">Select Delivery Location</h2>
              <p className="text-gray-500">Click on the map to pin your exact delivery address.</p>
            </div>
            <button 
              onClick={handleGetCurrentLocation}
              className="flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg font-semibold transition-colors border border-blue-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              Locate Me
            </button>
          </div>
          
          <div className="h-96 bg-gray-100 rounded-xl overflow-hidden mb-6 border border-gray-200">
            <MapContainer center={deliveryPos} zoom={15} style={{ height: "100%", width: "100%", zIndex: 0 }}>
              <ChangeView center={deliveryPos} zoom={15} />
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationSelector setPosition={setDeliveryPos} />
              <Marker position={deliveryPos} />
            </MapContainer>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="font-semibold text-gray-700">Selected Coordinates:</p>
            <p className="text-sm text-gray-500">{deliveryPos[0].toFixed(5)}, {deliveryPos[1].toFixed(5)}</p>
          </div>
       </div>

       {/* Right Side - Bill Details */}
       <div className="w-full md:w-1/3 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Order Summary</h2>
          
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
             <img src={product.thumbnail || product.images?.[0] || "https://via.placeholder.com/150"} alt="img" className="w-20 h-20 object-contain bg-gray-50 rounded-lg p-2" />
             <p className="font-semibold text-gray-800 line-clamp-2">{product.title}</p>
          </div>
          
          <div className="flex justify-between mb-3 text-gray-600">
             <span>Item Total</span>
             <span className="font-medium">${product.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4 text-green-600">
             <span>Delivery Fee</span>
             <span className="font-medium">FREE</span>
          </div>
          
          <div className="border-t border-gray-200 my-4"></div>
          
          <div className="flex justify-between font-extrabold text-2xl mb-8 text-gray-900">
             <span>Total Amount</span>
             <span>${product.price.toFixed(2)}</span>
          </div>

          <button 
            onClick={handlePayment} 
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all duration-300 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700 hover:shadow-xl hover:-translate-y-1'}`}
          >
             {loading ? 'Placing Order...' : 'Place Order'}
          </button>
       </div>
    </div>
  );
};

export default Checkout;
