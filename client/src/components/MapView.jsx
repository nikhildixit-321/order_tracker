import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent = () => {
  const position = [28.6139, 77.2090]; 

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%", zIndex: 0 }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          Aapki Delivery Location yahan hai!
        </Popup>
      </Marker>
    </MapContainer>
  );
};
export default MapComponent;