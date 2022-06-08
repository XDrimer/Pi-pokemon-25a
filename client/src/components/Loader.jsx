import React from "react";
import loading from "../imgs/loader.gif"
import styles from "./Loader.module.css"

function Loader(){
    return (
        <div className={styles.loader}>
            <img alt="loading" src={loading}></img>
            <h1>Waiting...</h1>
        </div>
    )
}

export default Loader;