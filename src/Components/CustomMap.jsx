import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "../utils/leaflet";

const CustomMap = ({ link, capital, country, latlng, zoom }) => {
  const position = [latlng[0], latlng[1]];

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={true}
      className="map"
    >
      <TileLayer
        attribution={`<a href="${link}">View ${capital} in OpenStreetMap</a>`}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={icon}>
        <Popup>
          <b>{capital}</b>, city and capital of <b>{country}</b>.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default CustomMap;
