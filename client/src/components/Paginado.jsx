import React from "react";
import {useState} from "react";
import styles from "./Paginado.module.css"

function Paginado({currentPage,setCurrentPage,max}){
const [input,setInput] = useState(1)
    function handleRight(){
        setCurrentPage(parseInt(currentPage)+1)
        setInput(parseInt(input) + 1)
    }

    function handleLeft(){
        setCurrentPage(parseInt(currentPage)-1)
        setInput(parseInt(input) - 1)
    }

    function handleInput(e){
        if(e.keyCode === 13 ){
            if(input > 0 && input <= Math.ceil(max)){
                setCurrentPage(input)
            }
        }
    }

    function handleInputChange(e){
        e.preventDefault()
        setInput(e.target.value)
    }

    return(
        <div className={styles.pagination}>
            <div className={styles.container}>
               <button onClick={()=>handleLeft()} disabled={currentPage <= 1} className={styles.leftButton}>{"<"} </button>
               <input autoComplete="off" value={input} onChange={(e)=>handleInputChange(e)} onKeyDown={(e)=>handleInput(e)} name="page" className={styles.input}/>
               <p className={styles.p}>of {Math.ceil(max)}</p>
               <button onClick={()=>handleRight()} disabled={currentPage >= max} className={styles.rightButton}>{">"} </button>
            </div>
        </div>
    )
}

export default Paginado;