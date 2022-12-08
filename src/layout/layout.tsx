import React from "react";
import Footer from "./footer/footer";
import NavBar from "./nav-bar/navbar";
import styles from './layout.module.scss';


const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <NavBar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout;