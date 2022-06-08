const { Router } = require('express');
const {Pokemon, Type} = require("../db");
const {getDbPokes, getApiPokes, getAllPokes, getPokeByName, getPokeById} = require("./functions/functions");
const axios = require("axios");
const router = Router();


router.get("/",async (req,res,next)=>{
    const {name} = req.query;
    try{
        if(name){
            let poke = await getPokeByName(name)
            return res.status(200).json(poke)
        }
        let pokemons = await getAllPokes()
        return res.status(200).json(pokemons)
    }catch(err){
        next(err)
    }
})

router.get("/:id",async (req,res,next)=>{
    const {id} = req.params;

    try{
        let poke = await getPokeById(id);
        return res.status(200).json(poke)
    }catch(err){
        next(err)
    }
})

router.post("/",async(req,res,next)=>{
    try{
    const {name,life,strength,defense,speed,height,weight,img,type} = req.body;

    let newPokemon = await Pokemon.create({
        name,
        life,
        strength,
        defense,
        speed,
        height,
        weight,
        img
    })

    let databaseType = await Type.findAll({
        where: {
            name: type
        }
    }) 

    newPokemon.addType(databaseType);

    res.status(200).send("Pokemon created successfully")
    }catch(err){
         next(err)
    }
})
console.log("a")
module.exports = router;
