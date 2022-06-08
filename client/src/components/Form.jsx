import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import styles from "./Form.module.css";
import {cleanDetail, cleanPokemons, getPokemons,getTypes, postPokemon} from "../redux/actions";


function Form(){
    const dispatch = useDispatch()
    const allPokemons = useSelector((state)=>state.allPokemons)
    const types = useSelector((state)=>state.types)
    const [errors,setErrors] = useState({})
    const [input,setInput] = useState({
        name:"",
        life:"",
        strength:"",
        defense:"",
        speed:"",
        height:"",
        weight:"",
        img:"",
        type: []
    })

    useEffect(()=>{
        dispatch(getPokemons())
        dispatch(getTypes())
    },[dispatch])

    
    function validate(input){
        let errors = {};
        let existent = false;
        allPokemons.map(poke=> poke.name === (input.name.toLowerCase()) ? existent = true : null)
        if(existent){
            errors.name = "That pokemon already exists"
        } if(!/^[a-z]+$/.test(input.name) ){
            errors.name = "Only lower-case letters are accepted"
        } if(input.name.length > 12){
            errors.name = "Max 12 letters"
        } if(!input.name){
            errors.name = "Name required"
        } if(!input.life || !/^0*([0-9]|[1-8][0-9]|9[0-9]|1[0-9]{2}|2[0-4][0-9]|250)$/.test(input.life)){
            errors.life = "250 max"
        } if(!input.life){
            errors.life = "HP required"
        } if (!input.strength || !/^0*([0-9]|[1-8][0-9]|9[0-9]|1[0-9]{2}|2[0-4][0-9]|250)$/.test(input.strength)) {
            errors.strength = '250 max';
        } if (!input.strength) {
            errors.strength = 'Attack required';
        } if (!input.defense || !/^0*([0-9]|[1-8][0-9]|9[0-9]|1[0-9]{2}|2[0-4][0-9]|250)$/.test(input.defense)) {
            errors.defense = '250 max';
        } if (!input.defense) {
            errors.defense = 'Defense required';
        } if (!input.speed || !/^0*([0-9]|[1-8][0-9]|9[0-9]|1[0-9]{2}|2[0-4][0-9]|250)$/.test(input.speed)) {
            errors.speed = '250 max';
        } if (!input.speed) {
            errors.speed = 'Speed required';
        } if (!input.height || !/^0*([0-9]|[1-8][0-9]|9[0-9]|1[0-9]{2}|2[0-4][0-9]|250)$/.test(input.height)) {
            errors.height = '250 max';
        } if (!input.height) {
            errors.height = 'Height required';
        } if (!input.weight || !/^0*([0-9]|[1-8][0-9]|9[0-9]|1[0-9]{2}|2[0-4][0-9]|250)$/.test(input.weight)) {
            errors.weight = '250 max';
        } if (!input.weight) {
            errors.weight = 'Weight required';
        } if (!input.img.length) {
            errors.img = 'Link image required';
        } if (!/([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|jpeg|avatars|png|svg|.jpeg|jpg|encrypted)(\?[^\s[",><]*)?/g.test(input.img)) {
            errors.img = 'Try with other link';
        } if (!input.img) {
            errors.img = 'Image required'
        } if (input.type.length === 0 || input.type === undefined) {
            errors.type = 'Type required';
        }
        return errors;
    }
    
    function handleDelete(el){
        let arr = input.type.filter(e=>e !== el)
        setErrors(validate({
            ...input,
            type: arr
        }))
        setInput({
            ...input,
            type: arr
        })
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleSelect(e){
        setErrors(validate({
            ...input,
            type: [...input.type, e.target.value]
        }))
        if(e.target.value === input.type[0] && input.type.length < 2){
            alert("Can´t choose same type again")
        }else if(input.type.length < 2){
            setInput({
                ...input,
                type: [...input.type, e.target.value]
            })
        }else{
            alert("You can only choose 2 types")
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(postPokemon(input))
        alert("Pokemon created successfully")
        setInput({
          name:"",
          life:"",
          strength:"",
          defense:"",
          speed:"",
          height:"",
          weight:"",
          img:"",
         type: []
        })
        dispatch(cleanPokemons())
        dispatch(cleanDetail())
    }

    return(
        <div className={styles.createPage}>
            <div className={styles.navbar}>
                <Link to={"/home"} className={styles.link}><h1 className={styles.home}>Home</h1></Link>
            </div>
            <div className={styles.createContainer}>
             <div className={styles.create}>
                <h1>CREATE POKEMON</h1>
                <form action="" method="post" onSubmit={(e)=>handleSubmit(e)} autoComplete="off">
                    <div className={styles.input}>
                       <label>Nombre:</label>
                       <input name="name" value={input.name} onChange={(e)=>handleChange(e)} type="text" className={styles.inputName}></input>
                       <span>{errors.name && (<p className="error">{errors.name}</p>)}</span>
                    </div>
                    <div className={styles.input}>
                       <label>Life:</label>
                       <input name="life" value={input.life} onChange={(e)=>handleChange(e)} type="number"></input>
                       <span>{errors.life && (<p className="error">{errors.life}</p>)}</span>
                    </div>
                    <div className={styles.input}>
                       <label>Attack:</label>
                       <input name="strength" value={input.strength} onChange={(e)=>handleChange(e)} type="number"></input>
                       <span>{errors.strength && (<p className="error">{errors.strength}</p>)}</span>
                    </div>
                    <div className={styles.input}>
                       <label>Defense:</label>
                       <input name="defense" value={input.defense} onChange={(e)=>handleChange(e)} type="number"></input>
                       <span>{errors.defense && (<p className="error">{errors.defense}</p>)}</span>
                    </div>
                    <div className={styles.input}>
                       <label>Speed:</label>
                       <input name="speed" value={input.speed} onChange={(e)=>handleChange(e)} type="number"></input>
                       <span>{errors.speed && (<p className="error">{errors.speed}</p>)}</span>
                    </div>
                    <div className={styles.input}>
                       <label>Height:</label>
                       <input name="height" value={input.height} onChange={(e)=>handleChange(e)} type="number"></input>
                       <span>{errors.height && (<p className="error">{errors.height}</p>)}</span>
                    </div>
                    <div className={styles.input}>
                       <label>Weight:</label>
                       <input name="weight" value={input.weight} onChange={(e)=>handleChange(e)} type="number"></input>
                       <span>{errors.weight && (<p className="error">{errors.weight}</p>)}</span>
                    </div>
                    <div className={styles.input}>
                       <label>Types:</label>
                           <select onChange={(e)=>handleSelect(e)} value="disabled">
                               <option value="">Type</option>
                              {
                                   types.map(t=>(<option key={t.name} name="type" value={t.name}>{t.name}</option>))
                              }
                          </select>
                           <span>{errors.type && (<p className="error">{errors.type}</p>)}</span>
                        <div className={styles.typeSelectedContainer}>
                           {
                               (input.type.length > 0) && input.type.map(e=>
                               <div key={e}>
                                   <div className={styles.divTypeSelected}>
                                       <p className={styles.pTypeSelected}>{e.toUpperCase()}</p>
                                       <button className={styles.xButton} onClick={()=>handleDelete(e)}>x</button>
                                   </div>
                               </div>)
                           }
                        </div>
                    </div>
                    <div className={styles.input}>
                       <label>Img:</label>
                       <input name="img" value={input.img} onChange={(e)=>handleChange(e)} type="url"></input>
                       <span>{errors.img && (<p className="error">{errors.img}</p>)}</span>
                       {
                           input.img && !errors.img && <img  alt="pokemon" src={input.img} height="100px" width="100px"></img>
                       }
                    </div>
                    <div>
                        <button className={styles.createButton} disabled={errors.name || errors.life || errors.strength || errors.speed || errors.defense || errors.height || errors.weight || errors.type || errors.img|| input.name === "" ? true : false} type="submit">Create</button>
                    </div>
                </form>
             </div>
            </div>
        </div>
    )
}

export default Form;