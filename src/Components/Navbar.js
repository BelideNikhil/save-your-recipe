import { useState } from 'react'
import {NavLink,useNavigate} from 'react-router-dom'
import { useTheme } from '../Hooks/useTheme'
import './Navbar.css'


export default function Navbar() {
  const [search,setSearch]=useState('')
  const navigate=useNavigate()
  const {color,mode,changeColor,changeMode}=useTheme()


  function searchHandler(e){
    e.preventDefault()
    navigate(`/search?q=${search}`)
    setSearch('')
  }
  
  return (
      <ul className='navbar' style={{backgroundColor:color}}>
        <NavLink to="/" className="logo">Your Recipes</NavLink>
        <ul className='right-data'>
          <li className='search-recipe'>
            <NavLink to="">
              <form onSubmit={searchHandler}>
                <input disabled type="text" placeholder='Under Construction...' onChange={(e)=>setSearch(e.target.value.toUpperCase())} value={search}/>
              </form>
            </NavLink>
          </li>
          <li className="create-btn"><NavLink to="/create">Create Recipe</NavLink></li>
        </ul>
      </ul>
  )
}
