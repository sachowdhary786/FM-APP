import React, { useEffect, useState } from 'react';
import style from './player-details.module.scss';
import Image from 'next/image';

const Player = (props) => (
  <div className={style['player-card']}>
    {props.player.image ? (
      <div className={style['player-image']}>
        <Image src={props.player.image} alt={props.player.name} fill sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"/>
      </div>
    ) :
      <div className={style['player-noImage']} />
    }
    <div className={style['player-detail']}>
      {props.player.name ? (
        <span className={style.name}>{props.player.name}</span>
      ) : <span className={style.name}>&nbsp;</span>}
      <span className={style.surname}>{props.player.surname}</span>
      <span className={style.nationality}>{props.player.nationality}</span>
    </div>
  </div>
)

export default function PlayerList() {
  const [state, setState] = useState({
    loading: true,
    error: null
  })
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function getPlayers() {
      const respsonse = await fetch('http://localhost:5000/records/');
      if (!respsonse.ok) {
        const message = `An error occured: ${respsonse.statusText}`;
        window.alert(message);
        return;
      }
      const players = await respsonse.json();
      setPlayers(players);
      setState({ loading: false, error: null })
    }
    getPlayers();

    return;
  }, [players.length]);

  function playerList(filterPos: string) {
    const filteredPlayers = players.filter(player => player.position === filterPos);
    return filteredPlayers.map((player) => {
      return (
        <Player player={player} key={player._id} />
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