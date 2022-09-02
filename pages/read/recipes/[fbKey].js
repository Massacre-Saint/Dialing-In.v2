/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosAddCircleOutline } from 'react-icons/io';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getMethodRecipesDefault } from '../../../utils/data/apiData/mergeData';
import { createRecipe, getRecipe } from '../../../utils/data/apiData/userRecipes';
import Recipes from '../../../components/read/Recipes';
import { useAuth } from '../../../utils/context/authContext';

export default function MethodRecipes() {
  const { user } = useAuth();
  const router = useRouter();
  const { fbKey } = router.query;
  const [recipes, setRecipes] = useState([]);
  const [method, setMethod] = useState({});
  const getRoutedRecipes = () => {
    getMethodRecipesDefault(fbKey).then((methodObj) => {
      setMethod(methodObj);
      setRecipes(methodObj.defaultRecipes);
    });
  };
  const handleClick = () => {
    if (!user) {
      router.push('/settings');
    } else {
      getRoutedRecipes();
      const payload = {
        uid: user.uid,
        methodId: method.fbKey,
      };
      createRecipe(payload).then((recipeObj) => {
        getRecipe(recipeObj.data.firebaseKey).then((obj) => {
          router.push(`/create/recipes/${obj.firebaseKey}`);
        });
      });
    }
  };
  useEffect(() => {
    getRoutedRecipes();
  }, [user]);
  return (
    <>
      <Navbar>
        <Nav.Link onClick={router.back}>
          <IoIosArrowBack />
          Methods
        </Nav.Link>
        <Container>
          <Navbar.Brand>
            <Image
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {method.name} Recipes
          </Navbar.Brand>
        </Container>
        <Nav.Link onClick={handleClick}>
          <IoIosAddCircleOutline />
        </Nav.Link>
      </Navbar>
      <div>
        {recipes.map((recipe) => (
          <Recipes key={recipe.fbKey} methodObj={method} recipeObj={recipe} />
        ))}
      </div>
    </>
  );
}
