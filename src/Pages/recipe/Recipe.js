import {useParams} from 'react-router-dom'
import useFetch from '../../Hooks/useFetch'
import { useTheme } from '../../Hooks/useTheme';
import './Recipe.css'

export default function Recipe() {
    const {id}=useParams();
    const url='http://localhost:3000/recipes/'+ id
    const {data:recipe,isPending,failure:error}=useFetch(url)
    const{mode}=useTheme()

    return (
        <div className={`recipe ${mode?"dark":null}`}>
            {isPending?<div>Loading...</div>:null}
            {error?<div>{error}</div>:null}
            {recipe?
            <div className={`single-recipe ${mode?"dark":null}`}>
                <h1>{recipe.title}</h1>
                <h2>{recipe.cookingTime}</h2>
                <h3>{recipe.ingredients.map(each=><li key={Math.random()*100000}>{each}</li>)}</h3>
                <h4>{recipe.method}</h4>
            </div>:null}
        </div>
    )
}
