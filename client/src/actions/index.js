import axios from 'axios'
import {DOGS_URL,TEMPERAMENT_URL} from '../constants'
import {GET_DOGS,GET_TEMPERAMENTS,GET_DOG_BY_ID,DOG_CREATE,GET_DOG_BY_NAME,
    FILTER_BY_DES_ASC,FILTER_BY_CREATED,FILTER_BY_WEIGHT,FILTER_BY_TEMPERAMENTS} from './constants'

export function getDogs(){
    return function(dispatch){
        return axios.get(DOGS_URL)
        .then((dogs)=>{
            dispatch({
                type:GET_DOGS,
                payload:dogs.data
            })
            
        })
    }
}

export function getTemperaments() {
    return function(dispatch){
     return axios.get(TEMPERAMENT_URL)
    .then((temperaments) => {       
        dispatch(
            {
                type:GET_TEMPERAMENTS,
                payload:temperaments.data

            }
        )
        
    })
}}

export function getDogById(id) {
    try{
        return function(dispatch){
            return axios.get(DOGS_URL+id)
            .then((dogById) => {
                dispatch({
                    type:GET_DOG_BY_ID,
                    payload:dogById.data
                })
            })
        }
    }
    catch(error){
        console.log(error)
    }
}

export function postDog(dog) {  
    return function(dispatch){
        return axios.post(DOGS_URL,dog)
        .then((dogCreated) => {
            console.log(dogCreated,"acaaaaaa")
            dispatch({
                type:DOG_CREATE,
                payload:dogCreated.data
            })
        })
    }
    
}

export function getDogByName(name){
    try{
        return function(dispatch){
            return axios.get(DOGS_URL+"?name="+name)
            .then ((dogByName)=>{
                dispatch({
                    type:GET_DOG_BY_NAME,
                    payload:dogByName.data
                })
            })
            }
    }
    catch(err){
        return("Dog not available")
    }
   
    
}

export function filterDogByDesAsc(type){
    return{
        type:FILTER_BY_DES_ASC,
        payload:type
    }
}

export function filterDogByDogCreated(type){
    return{
        type:FILTER_BY_CREATED,
        payload:type
        
    }
}

export function filterDogByTemperament(temperament){
    return{
        type: FILTER_BY_TEMPERAMENTS,
        payload:temperament
        
    }
}


export function filterDogByWeight(type){
    return{
        type:FILTER_BY_WEIGHT,
        payload:type
    }
}

export function getClean(){
    return{
        type:GET_DOG_BY_ID,
        payload:[]
    }
}