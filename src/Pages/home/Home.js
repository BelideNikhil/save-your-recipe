import useFetch from '../../Hooks/useFetch'
import RecipeList from '../../Components/RecipeList'

export default function Home() {
    const {data:recipes, isPending,failure:error}=useFetch('http://localhost:3000/recipes')
    return (
        <div>
            {isPending?<div>Loading...</div>:null}
            {error?error:null}
            {recipes?<RecipeList recipes={recipes}/>:null}
        </div>
    )
}
