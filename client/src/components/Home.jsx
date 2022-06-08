import React from "react";
import {getPokemons,getTypes,filterType,filterOrigin,filterName,filterAttack,cleanPokemons} from "../redux/actions";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Card from "./Card";
import {Link} from "react-router-dom";
import styles from "./Home.module.css"
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import Error from "./Error";
import Loader from "./Loader";

function Home() {
  const dispatch = useDispatch()
  const pokemons = useSelector((state)=>state.pokemons)
  const types = useSelector((state)=>state.types)
  const [currentPage, setCurrentPage] = useState(1)
  const [pokemonsInPage, setPokemonsInPage] = useState(12)
  const [order,setOrder] = useState("")
  const loading = useSelector((state)=>state.loading)
  const max = pokemons.length / pokemonsInPage


  useEffect(()=>{
    dispatch(getPokemons())
    dispatch(getTypes())
  },[dispatch])

  function handleClick(e){
    e.preventDefault();
    dispatch(cleanPokemons())
    dispatch(getPokemons())
    setCurrentPage(1)
  }

  function handleFilterType(e){
    e.preventDefault()
    dispatch(filterType(e.target.value))
    setCurrentPage(1)
  }

  function handleFilterOrigin(e){
    e.preventDefault()
    dispatch(filterOrigin(e.target.value))
    setCurrentPage(1)
  }

  function handleFilterName(e){
    e.preventDefault()
    dispatch(filterName(e.target.value))
    setOrder(e.target.value)
    setCurrentPage(1)
  }

  function handleFilterAttack(e){
    e.preventDefault()
    dispatch(filterAttack(e.target.value))
    setOrder(e.target.value)
    setCurrentPage(1)
  }

    return (
      <div className={styles.page}>
        <div className={styles.navbar}>
          <Link to={"/"} className={styles.links}><h3>Exit</h3></Link>
           <div className={styles.searchBar}>
           <SearchBar className={styles.sb} setCurrentPage={setCurrentPage}/>
           </div>
          <Link to={"/create"} className={styles.links}><h3>Create</h3></Link>
        </div>
        <div className={styles.filters}>
         <select className={styles.filter} value="disabled" onChange={e=>{handleFilterType(e)}}>
            <option value={""}>Type</option>
            <option value={"all"}>All Types</option>
            {
             types && types.map(e=>{
               return (
                  <option value={e.name} key={e.name}>{e.name}</option>
                )
             })
            }
         </select>
         <select className={styles.filter} value="disabled" onChange={e=>{handleFilterOrigin(e)}}>
           <option value={""}>Origin</option>
           <option value={"all"}>All</option>
           <option value={"api"}>API</option>
            <option value={"created"}>Created</option>
         </select>
         <select className={styles.filter} value="disabled" onChange={e=>{handleFilterName(e)}}>
           <option value={""}>Name</option>
            <option value={"A-Z"}>A-Z</option>
           <option value={"Z-A"}>Z-A</option>
         </select>
         <select className={styles.filter} value="disabled" onChange={e=>{handleFilterAttack(e)}}>
          <option value={""}>Attack</option>
           <option value={"stronger"}>+ Attack</option>
           <option value={"weaker"}>- Attack</option>
         </select>
         <button onClick={e=>{handleClick(e)}}>Refresh All Filters</button>
        </div>


          <div className={styles.pokemons}>
             <div className={styles.pokemonContainer}>
              {
               loading? <Loader/> : !pokemons.length? <Error/> : pokemons.slice((currentPage-1) * pokemonsInPage,(currentPage-1)* pokemonsInPage + pokemonsInPage).map((e)=>{
                 return (
                    <div className="pokemon" key={e.id}>
                    <Link className={styles.linkcard} to={`/home/${e.id}`}>
                     <Card
                      name={e.name}
                      img={e.img}
                      types={e.types} 
                       />
                    </Link>   
                   </div>
                  )
               })
              }
            </div>
        </div>
        <div className={styles.paginado}>
              {loading? <Loader/> : !pokemons.length? null : <Paginado currentPage={currentPage} setCurrentPage={setCurrentPage} max={max}/>}
        </div>
      </div>
    );
  }

  export default Home;
  