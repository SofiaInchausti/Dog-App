import React from 'react';
import "./Pagination.css"

export default function  Pagination ({dogsPerPage,totalDogs,paginate}){
    const pageNumbers=[];
    for (let index = 1; index <= Math.ceil(totalDogs/dogsPerPage);index++){
        pageNumbers.push(index)
    } 
    return(
        <nav>
            <ul className="pagination"> 
                {pageNumbers && pageNumbers.map(number=>(
                    <li key={number}>
                        <a onClick={()=>paginate(number)} >
                            {number}
                        </a>

                   </li>
                ))}
            </ul>
        </nav>

        )
        
    }

