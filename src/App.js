import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import L from 'leaflet';
import './App.css';

function App() {
    const [position, setPosition] = useState(null);
    const markerIcons = new L.Icon({
        iconUrl: markerIcon,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
    });

    useEffect(() => {
        // Получаем текущее местоположение пользователя
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setPosition([latitude, longitude]);
        });
    }, []);

    return (
        <div className="app">
            <h1 className="title">Отслеживание геолокации</h1>
            {position && (
                <MapContainer center={position} zoom={13} className="map">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position} icon={markerIcons}>
                        <Popup>
                            Текущее местоположение
                        </Popup>
                    </Marker>
                </MapContainer>
            )}
        </div>
    );
}

export default App;
