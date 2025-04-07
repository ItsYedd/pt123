// Map.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { getCoordinatesFromAddress } from '../ultils/Common/geocode'

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component để fly đến vị trí mới
const FlyToLocation = ({ position }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo(position, 13);
    }, [position, map]);
    return null;
};

const Map = ({ address }) => {
    const [position, setPosition] = useState([21.0285, 105.8542]); // Hà Nội

    useEffect(() => {
        if (address) {
            getCoordinatesFromAddress(address).then((coords) => {
                if (coords) setPosition(coords);

            });
        }
    }, [address]);

    return (
        <MapContainer center={position} zoom={13} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
                <Popup>{address}</Popup>
            </Marker>
            <FlyToLocation position={position} />
        </MapContainer>
    );
};

export default Map;
