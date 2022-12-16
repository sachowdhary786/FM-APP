import React from "react";
import Link from "next/link";

import style from './navbar.module.scss';

function NavBar() {
  return (
    <div className={style['nav-container']}>
      <Link className={style['nav-link']} href="/">
        <button className={style['nav-button']} tabIndex={-1}>
          Home
        </button>
      </Link>
      <Link className={style['nav-link']} href="/players">
        <button className={style['nav-button']} tabIndex={-1}>
          Players
        </button>
      </Link>
      <Link className={style['nav-link']} href="/blog/">
        <button className={style['nav-button']} tabIndex={-1}>
          Blog
        </button>
      </Link>
      <Link className={style['nav-link']} href="/login">
        <button className={style['nav-button']} tabIndex={-1}>
          Login
        </button>
      </Link>
    </div >
  )
}

export default NavBar; 