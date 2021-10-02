import { useSelector } from "react-redux"
import {useState, useEffect} from 'react'
import React from 'react';
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import Dog from "../Dog/Dog"
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";
import { getDogs,filterDogByDesAsc,filterDogByDogCreated, filterDogByWeight,filterDogByTemperament} from "../../actions";
import "./Dogs.css"

export default function Dogs() {
  const dogs = useSelector(state => state.dogs)  
  const temperaments=useSelector(state=>state.dogTemperaments)
  const dispatch = useDispatch()  
  const [currentPage,setCurrentPage]=useState(1);//empieza por pagina 1
  const [dogsPerPage]=useState([9]);// cuantos perros por pagina
  const indexOfLastDog=currentPage*dogsPerPage;//ultimo perro primer caso 1*9
  const indexOfFirstDog=indexOfLastDog-dogsPerPage;//primer perro 9-9=0
  const currentDogs=dogs.slice(indexOfFirstDog,indexOfLastDog);//aca hago el corte de mi arreglo de dogs
  const paginate=(pageNumber)=> setCurrentPage(pageNumber)

  
  useEffect(() => {
    dispatch(getDogs())   
  },[dispatch] )

  const allDogs=(e)=>{
    e.preventDefault()
    dispatch(getDogs())

  }

  const filterByCreated=(e)=>{  
    e.preventDefault() 
    dispatch(filterDogByDogCreated(e.target.value))
  }

  const filterAscDesc=(e)=>{
    e.preventDefault()
    dispatch(filterDogByDesAsc(e.target.value))
  }

  const filterByWeight=(e)=>{
    e.preventDefault()
    dispatch(filterDogByWeight(e.target.value))
  }

  const filterByTemperament=(e)=>{    
    e.preventDefault()
    dispatch(filterDogByTemperament(e.target.value))
  }


  // const [totalDogs, setTotalDogs]=useState([]);
  const [filteredDogs,setFilteredDogs]=useState([])

  // const [filterByTemperament,setFilterByTemperament]=useState([])

  var temperament=""
  var value=""

  function onInputChange (e){
    temperament=e.target.value.charAt(0).toUpperCase()+e.target.value.slice(1);
  } 
  function onInputChangeValue (e){
    value=e.target.value
   
  } 


    function filDogies(str, arr) {
      console.log("entrreee")
      let aux = [];
       for(let i = 0; i<arr.length; i++) {
         if(arr[i].temperaments){ 
            if(arr[i].temperaments.filter(e => e.includes(str) === true ).length > 0) {
              aux.push(arr[i])
            } 
             
       }
     
      }
      
        setFilteredDogs([...aux])
        
        // return aux
      }
    // function filterByCreated(){
    //   var aux=[...dogs]
    //   aux=aux.filter((e)=>{if(typeof(e.id)=="string")return e})
    //   setFilteredDogs([...aux])
    // }

    console.log(dogs)
    
   


 
  return <div  class="dogBackground">
       <div> 
        <Search/>  
        <label className="label" htmlFor="">Filters</label>        
        <select className="selects" name="temperament" onChange={e=>filterByTemperament(e)}>
        <option value="">Temperaments</option>
        <option value="all">All</option>      
        {temperaments.map((temp)=>{
          return <option key={temp.id} value={temp.name && temp.name.charAt(0).toUpperCase()+temp.name.slice(1)}>{temp.name && temp.name.charAt(0).toUpperCase()+temp.name.slice(1)}</option>
        })}      
        </select>
        <select className="selects" onChange={e=> filterAscDesc(e)}>
          <option value="">Asc-Desc</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>

        <select className="selects" onChange={e=>filterByCreated(e)}>
        <option value="">By created</option>
         <option value="all">All</option>
          <option value="created">Created Dogs</option>
          <option value="apiDogs">Api Dogs</option>
        </select>

        <select className="selects" onChange={e=>filterByWeight(e)}>
        <option value="">By weight</option>
         <option value="all">All</option>
          <option value="max">Max</option>
          <option value="min">Min</option>
        </select>
    
       <Link to="/dogs/add"><button class="buttonDog">Create Dog</button></Link>
       <button class="buttonDog" onClick={(e)=>allDogs(e)}>All Dogs</button>
       </div>
       <div className="container">
      {
        currentDogs.map((d)=>{
            return <div  key={d?.id}>
            <Dog name={d?.name} id={d?.id} image={d?.image} temperament={d?.temperaments}/>
            </div>
            })
      }
      </div>
      <div class="divPagination">
      <Pagination dogsPerPage={dogsPerPage} totalDogs={dogs.length} paginate={paginate}/>
      </div>
    </div>
  
};



