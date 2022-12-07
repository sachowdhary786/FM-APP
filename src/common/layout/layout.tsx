import React from "react";
import Footer from "./footer/footer";
import NavBar from "./nav-bar/navbar";
import styles from './layout.module.scss';


const Layout = (props: { children: any; }) => {

    return (
        <>
            <div className={styles.container}>
                <NavBar />
                {props.children}
                <Footer />
            </div>
        </>
    )
}

export default Layout;