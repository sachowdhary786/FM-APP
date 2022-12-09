import React from "react";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav-bar/navbar";
import styles from './blog-layout.module.scss';


const blogLayout = ({ children }) => {
  return (
    <div className={styles['blog-container']}>
      <NavBar />
      {children}
      <Footer />
    </div>
  )
}

export default blogLayout;