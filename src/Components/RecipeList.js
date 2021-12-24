import {NavLink} from 'react-router-dom'
import { useTheme } from '../Hooks/useTheme'
import './RecipeList.css'

export default function RecipeList({recipes}) {
    const {color,mode}=useTheme()
    return (
        <div className={`recipe-list ${mode?"dark":null}`}>
            {recipes.map(eachRecipe=>(
                <div key={eachRecipe.id} className="recipe-card">
                    <h3>Title : {eachRecipe.title}</h3>
                    <h4>Cooking Time: {eachRecipe.cookingTime}</h4>
                    <div>Instructions: {eachRecipe.method.substring(0,100)+"..."}</div>
                    <NavLink to={`/recipes/${eachRecipe.id}`} className="read-more">Read More...</NavLink>
                </div>
            ))}
        </div>
    )
}
