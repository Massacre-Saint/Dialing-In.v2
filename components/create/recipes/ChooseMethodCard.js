/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useAuth } from '../../../utils/context/authContext';
import { updateRecipe } from '../../../utils/data/apiData/userRecipes';
import { getSingleRecipeMethod } from '../../../utils/data/apiData/mergeData';

export default function ChooseMethodCard({ recipeObj }) {
  const { user } = useAuth();
  const [recipeMethod, setRecipeMethod] = useState({});
  const router = useRouter();
  const payload = {
    firebaseKey: recipeObj.firebaseKey,
    uid: user.uid,
    methodId: null,
    grindId: null,
    waterTemp: null,
    recipeName: null,
    weight: null,
    dose: null,
  };

  const handleClick = () => {
    if (recipeObj.methodId) {
      if (window.confirm('Choosing another method will reset recipe?')) {
        updateRecipe(recipeObj.firebaseKey, payload).then(() => router.push({
          pathname: '/create/recipes/method/chooseMethod',
          query: { data: recipeObj.firebaseKey },
        }));
      }
    } else {
      (router.push({
        pathname: '/create/recipes/method/chooseMethod',
        query: { data: recipeObj.firebaseKey },
      })
      );
    }
  };

  useEffect(() => {
    if (recipeObj.methodId) {
      getSingleRecipeMethod(recipeObj.firebaseKey).then((methodObj) => {
        setRecipeMethod(methodObj);
      });
    }
  }, [recipeObj]);
  return (
    <>
      <Card style={{ width: 'auto' }} onClick={handleClick}>
        <Card.Body>
          <Card.Title>Method:</Card.Title>
          <Card.Text>{recipeMethod ? (recipeMethod?.methodObj?.name) : 'no method'}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
ChooseMethodCard.propTypes = {
  recipeObj: PropTypes.shape({
    methodId: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

ChooseMethodCard.defaultProps = {
  recipeObj: PropTypes.shape({
    firebaseKey: '',
    methodId: '',
  }),
};
