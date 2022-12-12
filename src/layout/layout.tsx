import React from "react";
import NavBar from "../components/nav-bar/navbar";
import styles from './layout.module.scss';


const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <NavBar />
      {children}
    </div>
  )
}

export default Layout;