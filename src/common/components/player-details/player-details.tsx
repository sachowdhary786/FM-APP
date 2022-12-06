import React from "react";
import style from './player-details.module.scss'
import { playerData } from '../../../../json/data'
import { headerData } from '../../../../json/data'

export const PlayerData = () => {
    return (
        <div className={style['player-container']}>
            {headerData.map((header, key) => {
                return (
                    <div className={style.col} key={key}>
                        <h1>{header.name}</h1>
                    </div>
                )
            })}
            {playerData.map((data, key) => {
                return (
                    <div key={key} className={style['player-detail']}>
                        <div className={style.col}>
                            <p className={style['player-name']}>
                                {data.name}
                            </p>
                        </div>
                        <div className={style.col}>
                            <p className={style['player-nationality']}>
                                {data.nationality}
                            </p>
                        </div>
                        <div className={style.col}>
                            <p className={style['player-nationality']}>
                                {data.position}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}