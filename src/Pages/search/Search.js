import { useLocation } from 'react-router-dom'
import { useEffect,useState} from 'react'
import useFetch from '../../Hooks/useFetch'
import RecipeList from '../../Components/RecipeList'
import { useTheme } from '../../Hooks/useTheme'
import './Search.css'

export default function Search() {
    const searchedWord=new URLSearchParams(useLocation().search).get('q')
    const url='http://localhost:3000/recipes?q='+searchedWord
    const {data:recipes,isPending,failure:error}=useFetch(url)
    const [filtered,setFiltered]=useState(null)
    const {mode}=useTheme()

    useEffect(()=>{
        if(recipes){
            setFiltered(recipes.filter(each=>(each.title.split(' ').includes(searchedWord))))
        }
    },[recipes])

    return(
        <div>
            {isPending?<div>:Loading</div>:null}
            {error?error:null}
            {filtered?
            <div>
                <h2 className={`search-results ${mode?"dark":null}`}>Recipes with " {searchedWord} "</h2>
                <RecipeList recipes={filtered}/>
            </div>:null}
        </div>)
}
