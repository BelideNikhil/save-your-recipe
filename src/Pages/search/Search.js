import { useLocation } from 'react-router-dom'
import { useEffect,useState} from 'react'
import RecipeList from '../../Components/RecipeList'
import { useTheme } from '../../Hooks/useTheme'
import './Search.css'

export default function Search() {
    let [recipes,setRecipes]=useState(null)
    let [isPending,setIsPending]=useState(false)
    let [error,setError]=useState(null)
    let [filtered,setFiltered]=useState(null)

    const {mode}=useTheme()

    const searchedWord=new URLSearchParams(useLocation().search).get('q')
    return(
        <div>
            {isPending?<h3 className='loading'>Loading...</h3>:null}
            {error?<p>{error}</p>:null}
            {filtered?
            <div>
                <h2 className={`search-results ${mode?"dark":null}`}>Recipes with " {searchedWord} "</h2>
                <RecipeList recipes={filtered}/>
            </div>:<div className='search-results'>No Recipes with " {searchedWord} "</div>}
        </div>)
}
