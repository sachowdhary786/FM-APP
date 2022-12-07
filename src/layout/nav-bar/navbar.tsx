import React from "react";
import Link from "next/link";

import style from './navbar.module.scss';

function NavBar() {
    return (
        <div className={style['nav-container']}>
            <button className={style['nav-button']}>
                <Link className={style['nav-link']} href="/">Home</Link>
            </button>
            <button className={style['nav-button']}>
                <Link className={style['nav-link']} href="/players">Players</Link>
            </button>
            <button className={style['nav-button']}>
                <Link className={style['nav-link']} href="/about">About</Link>
            </button>
        </div>
    )
}

export default NavBar; 