/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useAuth } from '../../../utils/context/authContext';
import MethodEquipCard from '../../../components/read/MethodEquipCard';
import EquipmentCard from '../../../components/read/EquipmentCard';
import { getAllEquipment } from '../../../utils/data/apiData/mergeData';

export default function ShowEquip() {
  const router = useRouter();
  const { user } = useAuth();
  const { firebaseKey } = router.query;
  const [methodEquip, setMethodEquip] = useState([]);
  const [recipeEquip, setRecipeEquip] = useState([]);
  const renderEquipment = () => {
    getAllEquipment(firebaseKey).then((obj) => {
      setRecipeEquip(obj.recipe);
      setMethodEquip(obj.method);
    });
  };
  useEffect(() => {
    renderEquipment();
  }, [user]);
  return (
    <>
      <Navbar>
        <Nav.Link>
          Back
        </Nav.Link>
        <Container>
          <Navbar.Brand>
            Equipment
          </Navbar.Brand>
          <Nav.Link>
            <IoIosAddCircleOutline />
          </Nav.Link>
        </Container>
      </Navbar>
      <div>
        <h2>Method Equipment</h2>
        <div>
          {methodEquip.map((obj) => (
            <MethodEquipCard key={obj.firebaseKey} obj={obj} />
          ))}
        </div>
        <div>
          <h2>Recipe Equipment</h2>
          <div>
            {recipeEquip.map((obj) => (
              <EquipmentCard key={obj.firebaseKey} />
            ))}
          </div>
        </div>
      </div>

    </>
  );
}
