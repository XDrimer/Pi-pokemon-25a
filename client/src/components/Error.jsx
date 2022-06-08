import React from "react";
import errorimg from "../imgs/error.gif"
import styles from "./Error.module.css"

function Error(){
    return(
        <div className={styles.notFoundContainer}>
            <div className={styles.notFound}>
              <img  alt="error" src={errorimg}></img>
              <h1>Not pokemons found</h1>
            </div>
        </div>
    )
}

export default Error;