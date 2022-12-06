import React from 'react';
import Layout from '../src/common/layout/layout';
import style from './players.module.scss';

import { PlayerData } from '../src/common/components/player-details/player-details';

export default function Players() {
    return (
        <Layout>
            <div className={style.players}>
                <PlayerData />
            </div>
        </Layout>
    )
}
