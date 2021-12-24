import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../Hooks/useFetch'
import { useTheme } from '../../Hooks/useTheme'
import './Create.css'

export default function Create() {
    const [title,setTitle]=useState('')
    const [cookingTime,setCookingTime]=useState('')
    const [ingredients,setIngredients]=useState('')
    const [ingredientArray,setIngArray]=useState([])
    const [instructions,setInstructions]=useState('')

    const {mode}=useTheme()

    const {saveData,data}=useFetch('http://localhost:3000/recipes',"POST")
    const navigate=useNavigate()

    useEffect(()=>{
        const ing=ingredients.split(',')
        setIngArray(ing)
    },[ingredients])

    useEffect(()=>{
        if(data){
            navigate('/')
        }
    },[data])

    function submitHandler(e){
        e.preventDefault()
        saveData({title,ingredients:ingredientArray,method:instructions,cookingTime:cookingTime+' minutes.'})
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
