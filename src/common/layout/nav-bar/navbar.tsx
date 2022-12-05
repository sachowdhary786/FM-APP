import React from "react";
import Link from "next/link";

import styles from './navbar.module.scss';

function NavBar() {
    return (
        <div className={styles['nav-container']}>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/players">Players</Link>
                </li>
            </ul>
        </div>
    )
}

export default NavBar; 