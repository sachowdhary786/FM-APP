import React, { useEffect, useState } from 'react';
import style from './player-details.module.scss';

const Player = (props) => (
  <div className={style['player-card']}>
    <div className={style['player-image']} style={{ backgroundImage: `url(${props.player.image})` }} />
    <div className={style['player-detail']}>
      <span className={style.name}>{props.player.name}</span>
      <span className={style.surname}>{props.player.surname}</span>
      <span className={style.nationality}>{props.player.nationality}</span>
    </div>
  </div>
)

export default function PlayerList() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function getPlayers() {
      const respsonse = await fetch('http://localhost:5000/record/');

      if (!respsonse.ok) {
        const message = `An error occured: ${respsonse.statusText}`;
        window.alert(message);
        return;
      }
      const players = await respsonse.json();
      setPlayers(players);
    }
    getPlayers();

    return;
  }, [players.length]);

  async function deletePlayer(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: 'DELETE'
    })

    const newPlayers = players.filter((el) => el._id !== id);
    setPlayers(newPlayers);
  }

  function playerList() {
    return players.map((player) => {
      return (
        <Player player={player} deletePlayer={() => deletePlayer(player._id)} key={player._id} />
      )
    })
  }

  return (
    <>
      <h3>Player List</h3>
      <div className={style['player-container']}>
        {playerList()}
      </div>
    </>
  )
}