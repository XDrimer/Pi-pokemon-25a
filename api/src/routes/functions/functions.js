const {Pokemon, Type} = require("../../db");
const axios = require("axios");
const e = require("express");

//---------------------------------------
//Busca los pokemones de la base de datos
//---------------------------------------

async function getDbPokes(){
    let pokes = await Pokemon.findAll({
        include:{
            model: Type,
            attributes: ["name"],
            through:{
                attributes: [],
            }
        }
    })
    return pokes;
}

//-----------------------------
//Busca los pokemones de la API
//-----------------------------

async function getApiPokes(){
    let pokes1= await axios("https://pokeapi.co/api/v2/pokemon?offset=40&limit=20")
    let pokes2 = await axios(pokes1.data.next)
    let pokesC = await axios(pokes2.data.next)
    let pokes3 = pokes1.data.results.concat(pokes2.data.results).concat(pokesC.data.results)
    let pokes4 = await Promise.all(pokes3.map(async(e)=>{
        let call = await axios(e.url)

        return {
            id:call.data.id,
            name:call.data.name,
            strength:call.data.stats[1].base_stat,
            img:call.data.sprites.versions["generation-v"]["black-white"].animated.front_default,
            types:call.data.types.map(e=>{
                return e.type.name
                
            })
        }
    }));
    return pokes4;
}

//-----------------------------
//Combina la busqueda de los pokemones de la DB con los de la API y los devuelve
//-----------------------------

async function getAllPokes(){
    let dbpokes = await getDbPokes()
    dbpokes = dbpokes.map(e=>{
        return{
            id:e.ID,
            name:e.name,
            strength:e.strength,
            img:e.img,
            types:e.types.map(e=>e.name),
            createdInDb: true
        }
    })
    let apipokes = await getApiPokes()
    return apipokes.concat(dbpokes)
}

//-----------------------------
//Busca pokemon por nombre
//-----------------------------

async function getPokeByName(name){
    let dbpokes = await getDbPokes()
    dbpokes = dbpokes.filter(e=>e.name == name)

try{
    if(dbpokes.length){
        return {
            id:dbpokes[0].ID,
            name:dbpokes[0].name,
            strength:dbpokes[0].strength,
            img:dbpokes[0].img,
            types:dbpokes[0].types.map(e=>e.name)
        }

    } 

    let pokenameAPI = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`)
    if(!!pokenameAPI.data.name){
        return {
                id:pokenameAPI.data.id,
                name:pokenameAPI.data.name,
                strength:pokenameAPI.data.stats[1].base_stat,
                img:pokenameAPI.data.sprites.versions["generation-v"]["black-white"].animated.front_default,
                types:pokenameAPI.data.types.map(e=>{
                    return e.type.name
                })
        }
    }
    }catch(err){
        throw new Error("Pokemon not found")
    }
}

//-----------------------------
//Busca pokemon por ID
//-----------------------------

async function getPokeById(id){
    let dbpokes = await getDbPokes()
    dbpokes = dbpokes.filter(e=>e.ID == id)
    if(dbpokes.length){
        return{
                id:dbpokes[0].ID,
                name:dbpokes[0].name,
                life:dbpokes[0].life,
                strength:dbpokes[0].strength,
                defense:dbpokes[0].defense,
                speed:dbpokes[0].speed,
                height:dbpokes[0].height,
                weight:dbpokes[0].weight,
                img:dbpokes[0].img,
                types:dbpokes[0].types.map(e=>e.name)
        }
    } 

    let pokenameAPI = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
    if(!!pokenameAPI.data.name){
        return {
                id:pokenameAPI.data.id,
                name:pokenameAPI.data.name,
                life:pokenameAPI.data.stats[0].base_stat,
                strength:pokenameAPI.data.stats[1].base_stat,
                defense:pokenameAPI.data.stats[2].base_stat,
                speed:pokenameAPI.data.stats[5].base_stat,
                height:pokenameAPI.data.height,
                weight:pokenameAPI.data.weight,
                img:pokenameAPI.data.sprites.front_default,
                types:pokenameAPI.data.types.map(e=>{
                    return e.type.name
                })
        }
    }else{
        throw new Error("No se ah encontrado un pokemon con ese id")
    }
}

module.exports = {
    getDbPokes,
    getApiPokes,
    getAllPokes,
    getPokeByName,
    getPokeById
}
