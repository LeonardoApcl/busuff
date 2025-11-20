import { useEffect, useState } from 'react';
import mqtt from 'mqtt';
import type { BusDataPayload } from '../types';

// Configurações do Broker (WebSockets)
const BROKER_URL = 'ws://broker.hivemq.com:8000/mqtt';
const TOPIC = 'mqtt_iot_123321/busuff';

export function useMqtt() {
  // Estado para guardar o último pacote de dados recebido
  const [data, setData] = useState<BusDataPayload | null>(null);
  // Estado para mostrar se estamos conectados ou não
  const [status, setStatus] = useState<string>('Desconectado');

  useEffect(() => {
    setStatus('Conectando...');
    
    // Conecta ao broker via WebSockets
    const client = mqtt.connect(BROKER_URL);

    client.on('connect', () => {
      console.log('Conectado ao MQTT Broker via WS!');
      setStatus('Conectado');
      client.subscribe(TOPIC);
    });

    client.on('message', (_topic, message) => {
      try {
        // Converte o buffer de mensagem para string e depois para JSON
        const parsedData = JSON.parse(message.toString()) as BusDataPayload;
        setData(parsedData);
      } catch (error) {
        console.error('Erro ao processar mensagem MQTT:', error);
      }
    });

    client.on('error', (err) => {
      console.error('Erro de conexão:', err);
      setStatus('Erro de conexão');
    });

    // Cleanup: Fecha a conexão quando o componente for desmontado (fechar aba/mudar página)
    return () => {
      if (client.connected) {
        client.end();
      }
    };
  }, []);

  return { data, status };
}