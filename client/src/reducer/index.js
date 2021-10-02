import{GET_DOGS,GET_DOG_BY_ID,GET_TEMPERAMENTS,DOG_CREATE,GET_DOG_BY_NAME,FILTER_BY_WEIGHT,
    FILTER_BY_TEMPERAMENTS,FILTER_BY_CREATED,FILTER_BY_DES_ASC} from '../actions/constants'

var initialState={
    dogs:[],
    dogDetail:[],
    dogTemperaments:[],
    filterDogs:[]
}


function reducer(state=initialState,action){
    switch(action.type){
        
            
        case GET_DOGS:
            return{
                ...state,
                dogs:action.payload,
                filterDogs:action.payload
            }
            
        case GET_DOG_BY_ID:
            return{
                ...state,
                dogDetail:action.payload
            }

        case GET_TEMPERAMENTS:
            return{
                ...state,
                dogTemperaments:action.payload
            }
        case DOG_CREATE:{
            return{
                ...state,
                dogs: [...state.dogs,action.payload]
            }
        }
        case GET_DOG_BY_NAME:{
            return{
               ...state,
                dogs: action.payload
            }
        }
        case FILTER_BY_TEMPERAMENTS:{
            var arr=[...state.dogs]
           
            var aux=[]

            if(action.payload!=="all"){
                for(let i = 0; i<arr.length; i++) {
                    if(arr[i].temperaments){ 
                       if(arr[i].temperaments.filter(e => e.toLowerCase().includes(action.payload.toLowerCase()) === true ).length > 0) {
                        aux.push(arr[i])
                   } 
                }
            }
                        
        }
            
            return{
                ...state,
                dogs: action.payload==="all"? state.filterDogs:[...aux]
            }
        }
        case FILTER_BY_CREATED:{
            var aux=[...state.dogs]
            if(action.payload==="created"){
                console.log("entree created",aux)
                aux= aux.filter((e)=>{if(typeof(e.id)=="string")return e})
                console.log(aux)

            }
            if(action.payload==="apiDogs"){
                console.log("entree created",action.payload)
                aux=aux.filter((e)=>{if(typeof(e.id)!="string")return e})

            }
           
            return{
                ...state,
               dogs: action.payload==="all" ? state.filterDogs :[...aux] 
           }
            
        }
        case  FILTER_BY_DES_ASC:{
            const ascDescFilter = action.payload==="za"? state.dogs.sort((a, b) => {
                if(a.name < b.name) {
                    return 1
                } else {
                    return - 1
                }
            }) :
            state.dogs.sort((a, b) => {
                    if(a.name > b.name) {
                        return 1
                    } else {
                        return - 1
                    }
                }) 

                console.log(ascDescFilter,"acaa como",action)
                return{
                    ...state,
                    dogs: [...ascDescFilter]
                }
        }
        case  FILTER_BY_WEIGHT:{
            var aux=[...state.dogs]
            console.log(aux)
            if(action.payload==="max"){
                aux=aux.sort((a, b) => {
                if(Number(a.weight[0]) < Number(b.weight[0])) {
                    return 1
                } else {
                    return - 1
                    }
                }
                )
            }
            if(action.payload==="min"){
                aux= aux.sort((a, b) => {
                    if(Number(a.weight[0]) > Number(b.weight[0])){
                        return 1
                    } else {
                        return - 1
                    }
                })
            }
            return{
            ...state,
            dogs:action.payload==="all" ? state.filterDogs :[...aux] 
            }
        }

            default:return state
        }
       
    
}

export default reducer;

