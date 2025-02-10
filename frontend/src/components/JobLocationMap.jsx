// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // ✅ Fix: Set default marker icon
// const customIcon = L.icon({
//   iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
//   iconSize: [25, 41], 
//   iconAnchor: [12, 41], 
//   popupAnchor: [1, -34],
// });

// function JobLocationMap({ address, lat, lng }) {
//   // ✅ Fix: Prevent rendering until lat/lng are valid
//   if (!lat || !lng) {
//     return <p>Loading map...</p>;
//   }

//   return (
//     <div className="w-full h-60 mt-4 rounded-lg shadow-lg overflow-hidden">
//       <MapContainer center={[lat, lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <Marker position={[lat, lng]} icon={customIcon}>
//           <Popup>{address} <br /> Click to zoom.</Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// }

// export default JobLocationMap;

