import { useSelector } from "react-redux"
import { useState, useEffect } from 'react'
import React from 'react';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Dog from "../Dog/Dog"
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";
import { getDogs, filterDogByDesAsc, filterDogByDogCreated, filterDogByWeight, filterDogByTemperament } from "../../actions";
import "./Dogs.css"

export default function Dogs() {
  const dogs = useSelector(state => state.dogs)
  const temperaments = useSelector(state => state.dogTemperaments)
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState([9]);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);
  const paginate = (pageNumber) => setCurrentPage(pageNumber)


  useEffect(() => {
    dispatch(getDogs())
  }, [dispatch])

  const allDogs = (e) => {
    e.preventDefault()
    dispatch(getDogs())

  }

  const filterByCreated = (e) => {
    e.preventDefault()
    dispatch(filterDogByDogCreated(e.target.value))
  }

  const filterAscDesc = (e) => {
    e.preventDefault()
    dispatch(filterDogByDesAsc(e.target.value))
  }

  const filterByWeight = (e) => {
    e.preventDefault()
    dispatch(filterDogByWeight(e.target.value))
  }

  const filterByTemperament = (e) => {
    e.preventDefault()
    dispatch(filterDogByTemperament(e.target.value))
  }

  return <div className="dogBackground">
    <div>
      <Search />
      <label className="label" htmlFor="">Filters</label>
      <select className="selects" name="temperament" onChange={e => filterByTemperament(e)}>
        <option value="">Temperaments</option>
        <option value="all">All</option>
        {temperaments.map((temp) => {
          return <option key={temp.id} value={temp.name && temp.name.charAt(0).toUpperCase() + temp.name.slice(1)}>{temp.name && temp.name.charAt(0).toUpperCase() + temp.name.slice(1)}</option>
        })}
      </select>
      <select className="selects" onChange={e => filterAscDesc(e)}>
        <option value="">Asc-Desc</option>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
      </select>

      <select className="selects" onChange={e => filterByCreated(e)}>
        <option value="">By created</option>
        <option value="all">All</option>
        <option value="created">Created Dogs</option>
        <option value="apiDogs">Api Dogs</option>
      </select>

      <select className="selects" onChange={e => filterByWeight(e)}>
        <option value="">By weight</option>
        <option value="all">All</option>
        <option value="max">Max</option>
        <option value="min">Min</option>
      </select>

      <Link to="/dogs/add"><button className="buttonDog">Create Dog</button></Link>
      <button className="buttonDog" onClick={(e) => allDogs(e)}>All Dogs</button>
    </div>
    <div className="container">
      {
        currentDogs.map((d) => {
          return <div key={d.id}>
            <Dog name={d?.name} id={d?.id} image={d?.image} temperament={d?.temperaments} />
          </div>
        })
      }
    </div>
    <div className="divPagination">
      <Pagination dogsPerPage={dogsPerPage} totalDogs={dogs.length} paginate={paginate} />
    </div>
  </div>

};



