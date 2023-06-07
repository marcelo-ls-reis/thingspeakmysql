import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Atualiza a cada 5 segundos


    return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://api.thingspeak.com/channels/2068822/feeds.json?api_key=O4UO2E3ETQILY3RJ&results=1'
      );
  
      const feeds = response.data.feeds;
      const formattedData = feeds.map(feed => ({
        entry_id: feed.entry_id,
        time: feed.created_at,
        temperature: parseFloat(feed.field1),
        humidity: parseFloat(feed.field2),
      }));
      setData(formattedData);
      console.log(data.feeds)
  
      // Envia os dados para a API
      formattedData.forEach(({ entry_id, temperature, humidity }) => {
        axios.post('http://localhost:3001/data', { entry_id, temperature, humidity })
          .then(response => console.log(response.data))
          .catch(error => console.error(error));
      });
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <h1>Projeto IOT 4º DSM</h1>
      <LineChart width={1000} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temperature" stroke="red" name="Temperature (°C)" />
        <Line type="monotone" dataKey="humidity" stroke="blue" name="Humidity (%)" />
      </LineChart>
    </div>
  );
};

export default App;
