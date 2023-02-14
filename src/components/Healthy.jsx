import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";

export default function Healthy() {

  const [healthy, setHealthy] = useState([]);

  useEffect(() => {
    getHealthy();
  }, []);

  const getHealthy = async () => {

    const check = localStorage.getItem("healthy");

      if(check){
        setHealthy(JSON.parse(check));
      } else {
          const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
          const data = await api.json();
          localStorage.setItem("healthy", JSON.stringify(data.recipes));
          setHealthy(data.recipes)
          console.log(data.recipes)
      }
  };

  return (
    <div>
      <Wrapper>
        <h3>Healthy Recipes</h3>
          <Splide 
            options = {{
              perPage: 4,
              drag: 'free',
              gap: '1.5rem',
            }}> 
            {healthy.map((recipe) => {
              return(   
                <SplideSlide key={recipe.id}>
                    <Card>
                      <Link to = {"/recipe/" + recipe.id}>
                        <p>{recipe.title}</p>
                        <img src = {recipe.image} alt={recipe.title}/>
                        <Gradient />
                      </Link>
                    </Card>
                </SplideSlide>
              );
            })}
          </Splide>
      </Wrapper>
    </div>
  );
}


const Wrapper = styled.div`
margin: 4rem 0rem;
`;

const Card = styled.div`
margin-top: 1rem;
min-height: 13rem;
border-radius: 2rem;
overflow: hidden;
position: relative;

img{
  border-radius: 2rem;
  position: absolute;
  left:0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

p{
  position: absolute;
  z-index: 10;
  left: 50%;
  bottom: 0%;
  transform: translate(-50%, 0%);
  color: white;
  width: 100%;
  text-align: center;
  font-width: 600;
  font-size: 0.8rem;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
`;

const Gradient = styled.div`
z-index: 3;
position: absolute;
width: 100%;
height: 100%;
background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;