const { Router } = require('express');
const {Pokemon, Type} = require("../db");
const axios = require("axios")

const router = Router();

router.get("/",async (req,res,next)=>{
    // try{
    // const types1 = await axios(`https://pokeapi.co/api/v2/type`);
    // const types2 = types1.data.results.map(e=>axios.get(e.url))
    // const types3 = await Promise.all(types2)
    // const typesComplete = types3.map(e=>{
    //     return{
    //         id: e.data.id,
    //         name: e.data.name
    //     }
    // })
    // await typesComplete.forEach(e => {
    //     Type.findOrCreate({
    //         where:{
    //             ID: e.id,
    //             name: e.name
    //         }
    //     })
    //     console.log(e.name)
    // });
    // let types = await Type.findAll()
    // console.log(types)
    // res.json(types)
    // }catch(err){
    //     next(err);
    // }

    try{
        const typesDb = await Type.findAll();

        if(!typesDb.length){
            const types1 = await axios(`https://pokeapi.co/api/v2/type`);
             const types2 = types1.data.results.map(e=>axios.get(e.url))
             const types3 = await Promise.all(types2)
             const typesComplete = types3.map(e=>{
                  return{
                      ID: e.data.id,
                      name: e.data.name
                  }
              })
            await Type.bulkCreate(typesComplete);
            const newCallTypesDb = await Type.findAll();
            return res.status(200).json(newCallTypesDb);
        }

        res.status(200).json(typesDb);

    }catch(err){
        next(err)
    }
})

module.exports = router;
