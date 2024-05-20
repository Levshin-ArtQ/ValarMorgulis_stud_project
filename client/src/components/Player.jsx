import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Player = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const result = await axios('/api/players');
      setPlayers(result.data);
    };

    fetchPlayers();
  }, []);

  return (
    <div>
      <h2>Players</h2>
      <ul>
        {players.map(player => (
          <li key={player.id}>{player.name} - {player.playerclass} </li>
        ))}
      </ul>
    </div>
  );
};

export default Player;
