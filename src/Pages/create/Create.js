import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {fromFirebase} from '../../Firebase/config'
import { useTheme } from '../../Hooks/useTheme'
import './Create.css'

export default function Create() {
    const [title,setTitle]=useState('')
    const [cookingTime,setCookingTime]=useState('')
    const [ingredients,setIngredients]=useState('')
    let [ingredientsArray,setIngredientsArray]=useState('')
    const [instructions,setInstructions]=useState('')

    const {mode}=useTheme()
    const navigate=useNavigate()

    //splitting ing's-string and then saving
    useEffect(()=>{
        ingredientsArray=ingredients.split(',')
        setIngredientsArray(ingredientsArray)
    },[ingredients])

    const submitHandler=async(e)=>{
        e.preventDefault()
        const data= {title,ingredients:ingredientsArray,method:instructions,cookingTime:cookingTime+' minutes'}
        // try adding to database and if it fails then consoling error
        try{
            await fromFirebase.collection('recipes').add(data)
            navigate('/')
        }catch{
            console.log("error occured while adding...")
        }
    }
    return (
        <div className={`create-recipe ${mode?"dark":null}`}>
             <form className={`form ${mode?"dark":null}`}>
                <input type="text" required placeholder='Title:' onChange={e=>setTitle(e.target.value.toUpperCase())} value={title}/>
                <input type="number" required placeholder='Cooking Time in Minutes:' onChange={e=>setCookingTime(e.target.value)} value={cookingTime}/>
                <input type="text" required placeholder='Ingredients Used->Separate by a comma' onChange={e=>setIngredients(e.target.value)} value={ingredients}/>
                <textarea required placeholder='Cooking Instructions:' onChange={e=>setInstructions(e.target.value)} value={instructions} rows="6"/>
                <button type='submit' className='save-recipe-btn' onClick={submitHandler}>Save Recipe.</button>
            </form>
        </div>
    )
}
