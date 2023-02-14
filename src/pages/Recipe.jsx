import { useState, useEffect } from 'react'
import styled from 'styled-components'; 
import { useParams } from 'react-router-dom';

export default function Recipe() {

    const [recipeInfo, setRecipeInfo] = useState({});

    const [active, setActive] = useState(['cooking instructions']);

    let params = useParams();

    const fetchRecipe = async() => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
        const recipeData = await data.json();
        setRecipeInfo(recipeData);
    };

    useEffect(() => {
        fetchRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.name]);
    
  return (
    <RecipeInfoWrap>
        <div>
            <h2>{recipeInfo.title}</h2>
            <img src= {recipeInfo.image} alt=""/>
        </div>
        <Info>
            <Button className = {active === "cooking instructions" ? "active" : ''} onClick={()=> {setActive("cooking instructions")}}>
                Cooking Instructions
            </Button>
            <Button className = {active === "ingredients" ? "active" : ''} onClick={()=> {setActive("ingredients")}}>
                Ingredients 
            </Button>
            {active==='cooking instructions' && (
                <div>
                    <h2 dangerouslySetInnerHTML={{__html: recipeInfo.summary}}></h2>
                    <h2 dangerouslySetInnerHTML={{__html: recipeInfo.instructions}}></h2>
                </div>
            )}
            
            {active === 'ingredients' && (
                <ul>
                    {recipeInfo.extendedIngredients.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.original}</li>
                    ))};
                </ul>
            )};

        </Info>
    </RecipeInfoWrap>
  )
}

const RecipeInfoWrap = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;
    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    

    h2{
        margin-bottom: 2rem;

    }

    li{
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul{
        margin-top: 2rem;
    }
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white
    border: 2px solid black;
    border-radius: 15px;
    margin-right: 2rem;
    margin-bottom: 2rem;
    font-weight: 600;
`;

const Info = styled.div`
    margin-left: 10rem;
       `;