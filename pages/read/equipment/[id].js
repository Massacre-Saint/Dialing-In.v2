/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Navbar, Nav,
} from 'react-bootstrap';
import { useAuth } from '../../../utils/context/authContext';
import { MethodEquipCard, EquipmentCard, EquipmentModal } from '../../../components';
import { getRecipe } from '../../../utils/data/apiData/recipes';
import getMethodEquipment from '../../../utils/data/apiData/methodEquipment';
import { getRecipeEquipment } from '../../../utils/data/apiData/recipeEquipment';
import { getSingleOwnerRecipe } from '../../../utils/data/apiData/owner';

export default function ShowEquip() {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const [recipe, setRecipe] = useState({});
  const [methodEquip, setMethodEquip] = useState([]);
  const [recipeEquip, setRecipeEquip] = useState([]);
  const [author, setAuthor] = useState({});
  const renderEquipment = () => {
    getRecipe(id).then((obj) => {
      setRecipe(obj);
      getMethodEquipment(obj.method_id.id).then(setMethodEquip);
      getRecipeEquipment(id).then(setRecipeEquip);
    });
  };
  const getAuthor = () => {
    getSingleOwnerRecipe(id).then((obj) => {
      setAuthor(obj.user_id);
    });
  };
  const handleBack = () => {
    router.back();
  };
  useEffect(() => {
    renderEquipment();
    getAuthor();
  }, [user]);
  return (
    <>
      <Navbar className="navbar">
        <Nav.Link onClick={handleBack}>
          <button className="btn-sm" type="button">&#8249; Back</button>
        </Nav.Link>
        <div className="page-title">
          Equipment
        </div>
      </Navbar>
      <div className="recipe-equip-header">
        <h2>Method Equipment</h2>
        <div className="cards-container">
          {methodEquip.map((obj) => (
            <MethodEquipCard key={obj.id} obj={obj} />
          ))}
        </div>
        {recipeEquip.length
          ? (
            <>
              <div className="recipe-equip-header">
                <h2>Recipe Equipment</h2>
                <div className="steps">
                  {recipeEquip.map((obj) => (
                    <EquipmentCard key={obj.id} onUpdate={renderEquipment} author={author} recipe={recipe} obj={obj} />
                  ))}
                </div>
              </div>
              <div>
                <EquipmentModal recipe={recipe} recipeEquip={recipeEquip} author={author} onUpdate={renderEquipment} />
              </div>
            </>
          )
          : (
            <EquipmentModal author={author} recipe={recipe} recipeEquip={recipeEquip} onUpdate={renderEquipment} />
          )}
      </div>

    </>
  );
}
