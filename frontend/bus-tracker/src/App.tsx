import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMqtt } from './hooks/useMQTT';

function App() {
  const { data, status } = useMqtt();

  // Começamos com uma posição padrão (UFF de Rio das Ostras) caso o GPS ainda não tenha enviado nada
  const [position, setPosition] = useState<[number, number]>([-22.505253, -41.9206433]);

  // Sempre que chegar um dado novo (data), atualizamos a posição
  useEffect(() => {
    if (data && data.gps.location) {
      // O Leaflet usa [lat, lng]
      const newPos: [number, number] = [data.gps.location.lat, data.gps.location.lng];
      setPosition(newPos);
    }
  }, [data]);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Barra de status simples */}
      <div style={{ padding: '10px', background: '#222', color: '#fff', fontFamily: 'sans-serif' }}>
        <strong>Status:</strong> {status} | 
        <strong> Satélites:</strong> {data?.gps.num_satellites ?? 0} | 
        <strong> Vel:</strong> {data?.gps.speed_kmh ?? 0} km/h
      </div>

      <MapContainer center={position} zoom={15} style={{ flex: 1 }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* O Marcador agora usa a posição dinâmica */}
        <Marker position={position}>
          <Popup>
            Estou aqui!<br />
            Atualizado em: {data?.gps.timestamp_utc}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;