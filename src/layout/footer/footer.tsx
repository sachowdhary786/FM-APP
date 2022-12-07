import React from "react";
import Link from "next/link";

import style from './footer.module.scss';

function Footer() {
    return (
        <footer className={style.footer}>
            <ul>
                <li>
                    <Link href='/'>Home</Link>
                </li>
            </ul>
        </footer>
    )
}

export default Footer; 