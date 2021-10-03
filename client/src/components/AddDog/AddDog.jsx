import {useState, useEffect} from 'react'
import { getTemperaments } from '../../actions'
import { postDog } from '../../actions'
import {useDispatch} from 'react-redux'
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import "./AddDog.css"


function validateDog(dog){   
    let errorsDog={};
    if (dog.heightMin<1){
        errorsDog.heightMin="Min height is required"
    }
    if (dog.heightMax<1){
        errorsDog.heightMax="Max height is required"
    }
    if (dog.weightMin<1){
        errorsDog.weightMin="Max weight is required"
    }
    if ( dog.weightMax<1){
        errorsDog.weightMax="Min weight is required"
    }
    if ( dog.lifeSpanMin<1){
        errorsDog.lifeSpanMin="Min life Span is required"
    }
    if (dog.lifeSpanMax<1){
        errorsDog.lifeSpanMax="Max life Span is required"
    }
    return errorsDog;
}



export default function AddDog(){
    const dispatch=useDispatch();
    const [errorsFromDog,setErrorsFromDog]=useState({})
    const temperaments=useSelector(state=>state.dogTemperaments)  
    
    const [dog, setDog] = useState({
        name:"",
        image: "",
        temperaments: [],
        heightMin:"",
        heightMax:"",
        weightMin:"",
        weightMax:"",
        lifeSpanMin:"",
        lifeSpanMax:""
    })
    
    useEffect(() => {
       dispatch(getTemperaments())
    }, [dispatch])

    
    function onInputChange(e) {
        setErrorsFromDog(validateDog({
            ...dog,
            [e.target.name]:e.target.value
        }))
        setDog({
            ...dog,
            [e.target.name]:e.target.value
        })
       
    
    }
  
    function onInputTemperament(e) {
        setErrorsFromDog(validateDog({
            ...dog,
            temperaments:[...dog.temperaments,e.target.value]
        }))
       
        setDog({
            ...dog,
            temperaments:[...dog.temperaments,e.target.value]
     })
    }
    
    
    async function handleSubmit(e) {
       const newDog={
           name:dog.name,
           image:dog.image,
           temperaments:dog.temperaments,
           height:dog.heightMin+"-"+dog.heightMax,
           weight:dog.weightMin+" - "+dog.weightMax,
           lifeSpan:dog.lifeSpanMin+"-"+dog.lifeSpanMax
       }
        e.preventDefault()
        console.log("doggg",newDog)
        dispatch(postDog(newDog))
        alert('Dog created')
        setDog({
        name:"",
        image: "",
        temperaments: [],
        heightMin:"",
        heightMax:"",
        weightMin:"",
        weightMax:"",
        lifeSpanMin:"",
        lifeSpanMax:""
        })
        setErrorsFromDog({
            name:"",
            temperaments: [],
            heightMin:"",
            heightMax:"",
            weightMin:"",
            weightMax:"",
            lifeSpanMin:"",
            lifeSpanMax:""
        })
    }
    
    return( 
        <div className="back">
       <div className="buttonContainer">
       <Link to="/dogs">
            <button className="buttonBack">Back</button>
        </Link>
        </div>
        <div className="formContent">
        <div className="form">        
        <form onSubmit={(e)=>handleSubmit(e)}>            
        <p>
        <label htmlFor="">Name </label>
        <input
            required
            className={errorsFromDog.name ? 'danger':'formInput'}
            type="text"
            name="name"
            value={dog.name}
            placeholder="Dog name"
            onChange={(e)=>onInputChange(e)}/>
            {errorsFromDog.name && (
            <p className="description">{errorsFromDog.name}</p>
        )}
        </p>
        
        <p> 
        <label htmlFor="" >Image </label>
        <input
            className="formInput"
            type="text"
            name="image"
            value={dog.image}
            placeholder="Dog url image"
            onChange={(e)=>onInputChange(e)}/>
        </p>
        <p>
        <label htmlFor="">Height (cm) </label>
        <input
            required 
            className={errorsFromDog.heightMin ? 'dangerValue':'formInputValue'}
            type="number"
            name="heightMin"
            value={dog.heightMin}
            placeholder="Min. height"
            onChange={(e)=>onInputChange(e)}/>
           
        <input
            required
            className={errorsFromDog.heightMax ? 'dangerValue' : 'formInputValue'} 
            type="number"
            name="heightMax"
            value={dog.heightMax}
            placeholder="Max. height"
            onChange={(e)=>onInputChange(e)}/>
           
        </p>

        <div className="flex">
        {errorsFromDog.heightMin && (
            <p className="description">{errorsFromDog.heightMin}</p>
             )}
        {errorsFromDog.heightMax && (
            <p className="description">{errorsFromDog.heightMax}</p>
             )}

        </div>

        <p>
        <label htmlFor="">Weight (kg) </label>
        <input
            required
            className={errorsFromDog.weightMin ? 'dangerValue' : 'formInputValue'} 
            type="number"
            name="weightMin"
            value={dog.weightMin}
            placeholder="Min. wheight"
            onChange={(e)=>onInputChange(e)}/>
        <input
            required
            className={errorsFromDog.weightMax ? 'dangerValue' : 'formInputValue'} 
            type="number"
            name="weightMax"
            value={dog.weightMax}
            onChange={(e)=>onInputChange(e)}
            placeholder="Max. wheight"/>
        </p>

        <div class="flex">
        {errorsFromDog.weightMin && (
            <p className="description">{errorsFromDog.weightMin}</p>
             )}
        {errorsFromDog.weightMax && (
            <p className="description">{errorsFromDog.weightMax}</p>
             )}

        </div>
        <p>

            <label htmlFor="">Life Span </label>
        <input
            required
            className={errorsFromDog.lifeSpanMin? 'dangerValue' : 'formInputValue'} 
            type="number"
            name="lifeSpanMin"
            value={dog.lifeSpanMin}
            placeholder="Min. life span"
            onChange={(e)=>onInputChange(e)}/>        
        <input
            required
            className={errorsFromDog.lifeSpanMax ? 'dangerValue' : 'formInputValue'} 
            type="number"
            name="lifeSpanMax"
            value={dog.lifeSpanMax}
            placeholder="Max. life span"
            onChange={(e)=>onInputChange(e)}/>
            
            </p>
            <div class="flex">
            {errorsFromDog.lifeSpanMin && (
            <p className="description">{errorsFromDog.lifeSpanMin}</p>
             )}
            {errorsFromDog.lifeSpanMax && (                
            <p className="description">{errorsFromDog.lifeSpanMax}</p>
             )}
             
            </div>

        <select required name="temperaments" className="formInput"onChange={(e)=>onInputTemperament(e)} defaultValue="">
            <option value="">Choose temperaments</option>
            {temperaments.map((temp)=>(
                <option key={temp.id} name={temp.name} value={temp.name}>{temp.name?.charAt(0).toUpperCase()+temp.name?.slice(1)}</option>
            ))}
        </select>
       
        <div>
            {errorsFromDog.temperaments ? <p className="description">{errorsFromDog.temperaments}</p> :
            
            dog.temperaments.map((e)=>( <p key={e.id}>{e.charAt(0).toUpperCase()+ e.slice(1)+"  "}</p>))}
            </div>
       
          
        <button  className="inputSubmit" type="submit">Create my dog!</button>
    </form>
    </div>
    </div>
    </div>
    )
}