/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { BsInfoCircle } from 'react-icons/bs';
import {
  Navbar, Nav,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../../utils/context/authContext';
import {
  MainNavBar, DefaultRecipes, MethodInfoModal,
} from '../../../components';
import { createRecipefromMethod, getDefaultRecipesByMethod, getRecipe } from '../../../utils/data/apiData/recipes';
import { getSingleMethod } from '../../../utils/data/apiData/methods';
import { createOwnerRecipe, getCreatedMethodRecipes } from '../../../utils/data/apiData/owner';
import Recipes from '../../../components/cards/Recipes';

export default function MethodRecipes() {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [recipes, setRecipes] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const [method, setMethod] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getRoutedData = () => {
    getSingleMethod(id).then((data) => setMethod(data));
    getDefaultRecipesByMethod(id).then((data) => setRecipes(data));
    if (user) {
      getCreatedMethodRecipes(id).then((data) => setUserRecipes(data));
    }
  };
  const handleClick = () => {
    if (!user) {
      router.push('/settings');
    } else {
      const payload = {
        methodId: method.id,
      };
      createRecipefromMethod(payload).then((recipeObj) => {
        getRecipe(recipeObj.id).then((obj) => {
          createOwnerRecipe(obj, user).then(() => {
            router.push(`/create/recipes/${obj.id}`);
          });
        });
      });
    }
  };
  useEffect(() => {
    getRoutedData();
  }, [user]);
  return (
    <>
      <Navbar className="navbar">
        <Nav.Link onClick={router.back}>
          <button className="btn-sm" type="button">&#8249; Methods</button>
        </Nav.Link>
        <div className="page-title">
          {method.name}
        </div>
        <Nav.Link className="nav-info">
          <BsInfoCircle onClick={handleShow} />
        </Nav.Link>
        <Nav.Link onClick={handleClick} className="nav-cta">
          <IoIosAddCircleOutline />
        </Nav.Link>
      </Navbar>
      {userRecipes
        ? (
          userRecipes.map(((recipe) => (
            <Recipes key={recipe.recipe_id.id} recipeObj={recipe} render={getRoutedData} />
          )))
        )
        : (<><h2>Hello</h2></>)}
      {recipes.map((recipe) => (
        <DefaultRecipes key={recipe.id} recipeObj={recipe} />
      ))}
      <MethodInfoModal method={method} show={show} handleClose={handleClose} />
      <MainNavBar />
    </>
  );
}
