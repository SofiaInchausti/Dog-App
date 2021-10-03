import React from 'react';
import "./Dog.css";
import { Link } from 'react-router-dom';

export default function Dog({ name, image, temperament, id }) {
    return <div>
        <div className="cards">
            <Link to={`dogs/${id}`} className='link'> <h4 >{name}</h4></Link>
            <img src={image ? image : "https://bitsofco.de/content/images/2018/12/broken-1.png"} alt="dog"></img>
            <h3 className="temperamentsH5">Temperaments</h3>
            <div className="temperaments">
                {temperament ? temperament.map(d => <p key={d} className="temperamentsName" >{d.charAt(0).toUpperCase() + d.slice(1)}</p>) : "This dog no has temperament added"}
            </div>
        </div>

    </div>
}