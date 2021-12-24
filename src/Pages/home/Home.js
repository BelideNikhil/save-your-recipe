import { useState,useEffect } from 'react'
import {fromFirebase} from '../../Firebase/config'
import RecipeList from '../../Components/RecipeList'

export default function Home() {
    let [recipes,setRecipes]=useState(null)
    let [isPending,setIsPending]=useState(false)
    let [error,setError]=useState(null)

    useEffect(()=>{
        setIsPending(true)
        const cancelSubscriptions= fromFirebase.collection('recipes').onSnapshot((snapshot=>{
            if(snapshot.empty){
                setIsPending(false)
                setError("Nothing found")
            }else{
                let recipes=[]
                snapshot.docs.forEach(recipe=>recipes.push({id:recipe.id,...recipe.data()}))
                setRecipes(recipes)
                setIsPending(false)
            }
        }),(err)=>setError(err))

        return ()=>cancelSubscriptions()
    },[])

    return (
        <div>
            {isPending?<div>Loading...</div>:null}
            {error?<p>{error}</p>:null}
            {recipes?<RecipeList recipes={recipes}/>:null}
        </div>
    )
}
