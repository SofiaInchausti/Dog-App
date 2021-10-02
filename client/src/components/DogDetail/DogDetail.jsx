import { useEffect } from "react"
import {useParams } from 'react-router-dom'
import { getDogById } from "../../actions"
import {useDispatch} from 'react-redux'
import { useSelector } from "react-redux"
import './DogDetail.css';
import { Link } from "react-router-dom"
import { getClean } from "../../actions"


export default function DogDetail() {
   
    const {id} = useParams();
    const dispatch=useDispatch();

    useEffect( () => {
        dispatch(getDogById(id))
        
    return () => {
        dispatch(getClean())
      
    }
    }, [id,dispatch])

  
      
    const dog=useSelector((state=>state.dogDetail))
    

    return <div className="backDetail">
        <div className="divButton">
         <Link to="/dogs">
            <button className="buttonBack">Home</button>
            </Link>   
        </div> 
        <div className="divDetail">          
        {              
        dog && dog.length?      
        
        <div className="cardDetail">            
                <h2>{dog[0].name}</h2>
            
             <img src={dog[0].image ? dog[0].image : "https://bitsofco.de/content/images/2018/12/broken-1.png"} alt="Img not found" /> 
            <h3>Temperaments</h3>
            <div className="tempDetail">
           {dog[0].temperaments?.map(e=><p>-{e.charAt(0).toUpperCase()+e.slice(1)}</p>)}
           </div>
            <h3>Average Height</h3>
            <p>{dog[0]?.height}</p>
            <h3>Average Weight</h3>
            <p>{dog[0]?.weight}</p>
            <h3>Average life span</h3>            
            <p>{dog[0]?.lifeSpan}</p>
        </div> : 
        <div className='loading'>
        <img src='https://cdn.dribbble.com/users/226874/screenshots/3298060/banjo-dribbble.gif' width="700" height="500" alt="" />
        <div><span>Loading...</span></div>
        </div> 

        }
        </div>
        
    </div>  
}