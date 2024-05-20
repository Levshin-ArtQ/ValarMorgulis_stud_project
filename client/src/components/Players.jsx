// import React from "react";
// import useApi from "../hooks/useApi";
// import { useEffect } from "react";

// const Players = () => {
//   const { data, error, loading, fetchData } = useApi();

//   useEffect(() => {
//     fetchData("/api/players");
//   }, [fetchData]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;
//   else return <div>
//     <h2>Players</h2>
//     <ul>
//       {data.map(player => (
//         <li key={player.id}>{player.name} - {player.playerclass} </li>
//       ))}
//     </ul>
//   </div>;
// };

// export default Players;