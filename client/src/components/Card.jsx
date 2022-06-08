import React from "react";
import styles from "./Card.module.css"

function Card({name,img,types}){


    return(
        <div className={styles.card}>
            <h3>{name}</h3>
            <img src={img} alt={name}></img>
            <div>
                {
                    types?.map(el=>{
                    return <p  key={el} value={el} className={styles.type}>{el}</p>})
                }
            </div>
        </div>
    )
}

export default Card;