import L from "leaflet";
import locationIcon from "../assets/images/location.png";

export const icon = new L.Icon({
  iconUrl: locationIcon,
  iconRetinaUrl: locationIcon,
  popupAnchor: [-0, -0],
  iconSize: [32, 32],
});
