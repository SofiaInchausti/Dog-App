import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { getDogByName } from "../../actions";
import "./SearchBar.css"


export default function Search() {
    const dispatch = useDispatch()
    const [inputName, setInputName] = useState("")
    function handleInput(e) {
        e.preventDefault()
        setInputName(e.target.value)

    }
    function onSubmit(e) {
        e.preventDefault()
        dispatch(getDogByName(inputName))
        setInputName("")
    }
    return (
        <div>
            <input type="text" className="inputSearch" placeholder="Search dog breed" onChange={(e) => handleInput(e)} />
            <button type="submit" className="search" onClick={(e) => onSubmit(e)}>Search</button>
        </div>
    )


}
