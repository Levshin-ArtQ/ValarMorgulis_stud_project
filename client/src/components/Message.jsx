import React, { useState } from "react";
import useApi from "../hooks/useApi";
import { useEffect } from "react";

import axios from "axios";

const Message = () => {
  const { data, error, loading, fetchData } = useApi();

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Загрузка данных
    fetchData(`/api/messages`);
    const fetchedData = async () => {
      const result = await axios(`/api/players/`);
      setPlayers(result.data);
    };
    fetchedData().then(() => console.log('data loaded')).catch((err) => console.log(err));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <h2>Messages {data.length}</h2>
      <ul>
        {data.map((object) => (
          <li key={object.id}>
            {object.messageText}
          </li>
        ))}
      </ul>
      <h2>Players {players.length}</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.name} - {player.playerclass}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Message;
