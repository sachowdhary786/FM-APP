import React from 'react';
import Layout from '../src/common/layout/layout';

import PlayerList from '../src/common/components/player-details/player-details';

export default function Players() {
    return (
        <Layout children={undefined} >
            <PlayerList />
        </Layout >
    )
}
