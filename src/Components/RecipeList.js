import {NavLink} from 'react-router-dom'
import { useTheme } from '../Hooks/useTheme'
import { fromFirebase } from '../Firebase/config'
import deleteIcon from '../Assets/delete.svg'

import './RecipeList.css'

export default function RecipeList({recipes}) {
    const {mode}=useTheme()
    const deleteRecipe=(id)=>{
        fromFirebase.collection('recipes').doc(id).delete()
    }
    return (
        <div className={`recipe-list ${mode?"dark":null}`}>
            {recipes.map(eachRecipe=>(
                <div key={eachRecipe.id} className="recipe-card">
                    <img src={deleteIcon} alt="delete-recipe" className='delete-recipe' onClick={()=>deleteRecipe(eachRecipe.id)}/>
                    <h3>Title : {eachRecipe.title}</h3>
                    <h4>Cooking Time: {eachRecipe.cookingTime}</h4>
                    <div>Instructions: {eachRecipe.method.substring(0,100)+"..."}</div>
                    <NavLink to={`/recipes/${eachRecipe.id}`} className="read-more">Read More...</NavLink>
                </div>
            ))}
        </div>
    )
}
