import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { useTheme } from '../../Hooks/useTheme';
import {fromFirebase} from '../../Firebase/config'
import './Recipe.css'

export default function Recipe() {
    let [recipe,setRecipe]=useState(null)
    let [isPending,setIsPending]=useState(false)
    let [error,setError]=useState(null)

    const {id}=useParams();
    const{mode}=useTheme()

    useEffect(()=>{
        setIsPending(true)
        fromFirebase.collection('recipes').doc(id).get()
        .then(doc=>{
            if(doc.exists){
                setRecipe({...doc.data()})
            }else{
                setError('Not found')
            }
        })
        .catch(err=>setError(err))
    },[id])

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
