import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// Leaflet ki CSS import karna mat bhulna (Aapne App.jsx me already ki hai, jo ki achhi baat hai!)

const MapComponent = () => {
  const position = [28.6139, 77.2090]; // Example: New Delhi ka latitude & longitude

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%", zIndex: 0 }}>
      {/* Ye Map ka design (Tiles) fetch karta hai */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Ye Map par Red color ka pin (Marker) lagata hai */}
      <Marker position={position}>
        <Popup>
          Aapki Delivery Location yahan hai!
        </Popup>
      </Marker>
    </MapContainer>
  );
};
export default MapComponent;