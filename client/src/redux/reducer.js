let initialState = {
    allPokemons: [],
    pokemons: [],
    types: [],
    detail: [],
    loading: true
}

function reducer(state=initialState,action){
    switch(action.type){
        case "GET_POKEMONS":
            return {
                ...state, 
                pokemons: action.payload,
                allPokemons: action.payload,
                loading: false
            } 
        case "GET_TYPES":
            return {
                ...state, types: action.payload
            }   
        case "FILTER_TYPE":
            const typeFilter = action.payload === "all" ? state.allPokemons : state.allPokemons.filter(el=>el.types[0] === action.payload || el.types[1] === action.payload)
            return{
                ...state,
                pokemons: typeFilter 
            }
        case "FILTER_NAME":
            let sortedPokemonsName = action.payload === "A-Z" ? state.pokemons.sort(function(a,b){
                if(a.name>b.name) return 1
                if(a.name<b.name) return -1
                return 0
            }) : state.pokemons.sort(function(a,b){
                if(a.name>b.name) return -1
                if(a.name<b.name) return 1
                return 0
            })
            return {
                ...state,
                pokemons: sortedPokemonsName
            }
        case "FILTER_ORIGIN":
            const originFilter = action.payload === "all" ? state.allPokemons : action.payload === "api" ? state.allPokemons.filter(e=> !e.hasOwnProperty("createdInDb")) : action.payload === "created" ? state.allPokemons.filter(e=>e.hasOwnProperty("createdInDb")) : null
            return{
                ...state,
                pokemons: originFilter
            }
        case "FILTER_ATTACK":
            let sortedPokemonsStrength =action.payload === "stronger" ? state.pokemons.sort(function(a,b){
                if(a.strength>b.strength) return -1
                if(a.strength<b.strength) return 1
                return 0
            }) : state.pokemons.sort(function(a,b){
                if(a.strength>b.strength) return 1
                if(a.strength<b.strength) return -1
                return 0
            })
            return {
                ...state,
                pokemons: sortedPokemonsStrength
            }
        case "GET_POKENAME": 
            return {
                ...state,
                pokemons: [action.payload],
                loading: false
            }
        case "CLEAN_POKEMONS":
            return {
                ...state,
                pokemons: [],
                loading: true
            }
        case "GET_DETAIL":
            return{
                ...state,
                detail: action.payload
            }
        case "CLEAN_DETAIL":
            return {
                ...state,
                detail: []
            }
        default: return state;    
    }
}

export default reducer;