import React from "react";
import styles from "./SearchBar.module.css";
import {useState} from "react";
import { useDispatch } from "react-redux";
import {getPokemonName, cleanPokemons} from "../redux/actions";

function SearchBar({setCurrentPage}){
    const [input,setInput] = useState("")
    const dispatch = useDispatch()

    function handleChange(e){
        e.preventDefault()
        setInput(e.target.value)
    }

    function getPokemon(e){
        e.preventDefault()
        dispatch(cleanPokemons())
        dispatch(getPokemonName(input.toLowerCase()))
        setInput("")
        setCurrentPage(1)
    }

    return (
        <div className={styles.container}>
            <input onChange={(e)=>handleChange(e)} value={input} type="text" placeholder="Search pokemon..."></input>
            <button onClick={(e)=>getPokemon(e)} type="submit">Search</button>
        </div>
    ) 
}

export default SearchBar;