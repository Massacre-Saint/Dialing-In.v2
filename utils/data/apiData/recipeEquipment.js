import axios from 'axios';
import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getRecipeEquipment = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/recipe_equip?recipeId=${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch((error) => reject(error));
});

const getUserRecipeEquipment = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/recipeEquipment.json?orderBy="recipeId"&equalTo="${firebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});
const getSingleEquipment = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/recipeEquipment/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateEquipment = (data, id) => new Promise((resolve, reject) => {
  const equip = {
    type: data.type,
    name: data.name,
    setting: data.setting,
    recipe_id: data.recipeId,
  };
  fetch(`${dbUrl}/recipe_equip/${id}`, {
    method: 'PUT',
    body: JSON.stringify(equip),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const createEquip = (data) => new Promise((resolve, reject) => {
  const equip = {
    type: data.type,
    name: data.name,
    setting: data.setting,
    recipe_id: data.recipeId,
  };
  fetch(`${dbUrl}/recipe_equip`, {
    method: 'POST',
    body: JSON.stringify(equip),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deleteEquipment = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/recipe_equip/${id}`, {
    method: 'DELETE',
  }).then(resolve).catch(reject);
});

export {
  getRecipeEquipment, getSingleEquipment, deleteEquipment, updateEquipment, createEquip, getUserRecipeEquipment,
};
