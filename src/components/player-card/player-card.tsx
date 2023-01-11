import React, { FC, useState } from 'react';
import Image from 'next/image';
import { animated, useSpring } from '@react-spring/web'
import style from './player-card.module.scss'
import { PlayerCardProps } from './player-card.type';

const PlayerCard: FC<PlayerCardProps> = (props) => {
  //Animation Handlers
  const [flipped, set] = useState(false)
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg`,
    config: { mass: 5, tension: 500, friction: 80 }
  })

  function flipCard() {
    set(state => !state)
  }


  return (
    <>
      <div onClick={flipCard} className={style['player-card-outer']}>
        <animated.div className={[style['player-card'], style.front].join(' ')}
          style={{ opacity: opacity.to(o => 1 - o), transform }}>
          {props.image ? (
            <div className={style['player-image']}>
              <Image
                src={props.image}
                alt={props.name}
                fill
                sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
              />
            </div>
          ) :
            <div className={style['player-noImage']} />
          }
          <div className={style['player-detail']} >
            {props.name ? (
              <span className={style.name}>{props.name}</span>
            ) : <span className={style.name}>&nbsp;</span>
            }
            < span className={style.surname} > {props.surname}</span>
            <span className={style.nationality}>{props.nationality}</span>
          </div>
        </animated.div>
        <animated.div
          className={[style['player-card'], style.back].join(' ')}
          style={{ opacity, transform }}
        >
          {props.name}
        </animated.div>
      </div>
    </>
  )
}

export default PlayerCard