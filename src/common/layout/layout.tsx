import React from "react";
import Footer from "./footer/footer";
import NavBar from "./nav-bar/navbar";
import styles from './layout.module.scss';


export default function Layout({ children }) {
    return (
        <>
            <div className={styles.container}>
                <NavBar />
                <main>{children}</main>
                <Footer />
            </div>
        </>
    )
}