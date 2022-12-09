import React from "react";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav-bar/navbar";
import styles from './app-layout.module.scss';


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