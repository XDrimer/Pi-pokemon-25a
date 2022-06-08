import React, { useEffect } from "react";
import {useDispatch,useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import {getPokemonById, cleanDetail} from "../redux/actions";
import Error from "./Error";
import styles from "./Detailed.module.css";
import {Link} from "react-router-dom";

function Detailed(){

    const {id} = useParams();
    const dispatch = useDispatch();
    const detail = useSelector((state)=>state.detail);

    useEffect(()=>{
        dispatch(cleanDetail())
        dispatch(getPokemonById(id))
    },[dispatch])

    return(
        <div className={styles.container}>
            <nav className={styles.nav}>
                <Link  className={styles.link} to={"/home"}>
                    <h3>Home</h3>
                </Link>
            </nav>
            <div className={styles.pokemonDetailContainer}>
            {
                detail ? 
                <div className={styles.detailedPokemon}>
                    <div className={styles.details}>
                       <p className={styles.id}>Pokemon ID: {detail.id}</p>
                       <h1>{detail.name}</h1> 
                       <img src={detail.img}  alt="pokemon" height="200px" width="200px"></img>
                       <div className={styles.stats}>
                         Stats:
                         <p>HP: {detail.life}</p>
                         <p>Attack: {detail.strength}</p>
                         <p>Defense: {detail.defense}</p>
                         <p>Speed: {detail.speed}</p>
                         <p>Height: {detail.height}</p>
                         <p>Weight: {detail.weight}</p>
                     </div>
                     <div className={styles.typeContainer}>
                         {
                            detail.types?.map(e=>{
                                return <p key={e} className={styles.type} value={e}>{e}</p>})
                         }
                     </div>
                    </div>
                </div>
                : <Error/>
            }
            </div>
        </div>
    )
}

export default Detailed;