import React, { useEffect, useState } from 'react';
import style from './player-details.module.scss';
import PlayerCard from '../player-card/player-card';

export default function PlayerList() {
  const [state, setState] = useState({
    loading: true,
    error: null
  })
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function getPlayers() {
      const response = await fetch(`${process.env.RECORDS_URI}`);
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const players = await response.json();
      setPlayers(players);
      setState({ loading: false, error: null })
    }
    getPlayers();

    return;
  }, []);

  function playerList(filterPos: string) {
    const filteredPlayers = players.filter(player => player.position === filterPos);
    return filteredPlayers.map((player) => {
      return (
        <PlayerCard
          name={player.name}
          surname={player.surname}
          nationality={player.nationality}
          image={player.image}
          key={player._id}
        />
      )
    })
  }

  return (
    <>
      {state.loading ? <div className={style['content-container']}>Loading ... </div> :
        <>
          <div className={style['content-container']}>
            <h3>Goalkeepers</h3>
            <div className={style['player-container']}>
              {playerList('Goalkeeper')}
            </div>
          </div>
          <div className={style['content-container']}>
            <h3>Defenders</h3>
            <div className={style['player-container']}>
              {playerList('Defender')}
            </div>
          </div>
          <div className={style['content-container']}>
            <h3>Midfielders</h3>
            <div className={style['player-container']}>
              {playerList('Midfielder')}
            </div>
          </div>
          <div className={style['content-container']}>
            <h3>Forwards</h3>
            <div className={style['player-container']}>
              {playerList('Forward')}
            </div>
          </div>
        </>
      }
    </>
  )
}