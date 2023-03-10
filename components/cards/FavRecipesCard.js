/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { GiCoffeeBeans } from 'react-icons/gi';
import { IoTimeSharp, IoWaterSharp } from 'react-icons/io5';
import { Image } from 'react-bootstrap';
import { MdDeleteForever } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { deleteOwnerRecipe } from '../../utils/data/apiData/owner';

export default function FavRecipesCard({ recipeObj, render }) {
  const router = useRouter();
  const { user } = useAuth();
  const convertTime = (total) => {
    if (total >= 3600) {
      const result = new Date(total * 1000).toISOString().slice(11, 19);
      return result;
    }
    const result = new Date(total * 1000).toISOString().slice(14, 19);
    return result;
  };
  const handleClick = () => {
    router.push(`/create/process/${recipeObj.recipe_id.id}`);
  };
  const handleDelete = (e) => {
    e.stopPropagation();
    deleteOwnerRecipe(recipeObj.id);
    render();
  };
  useEffect(() => {
  }, [recipeObj]);
  return (
    <>
      <div className="recipe-card" onClick={() => { handleClick(); }} onKeyDown={handleClick} role="button" tabIndex={0}>
        <div>
          <div className="recipe-title">{recipeObj.recipe_id.recipe_name}</div>
          <div>
            {
              recipeObj.recipe_id.default
                ? ('')
                : (
                  <div>
                    <Image className="user-photo-small" referrerPolicy="no-referrer" src={recipeObj.user_id.image_url} />
                    {recipeObj.user_id.name}
                  </div>
                )
            }
            <span>
              <IoTimeSharp />
              {convertTime(recipeObj.recipe_id.brew_time)}&nbsp;&nbsp;
            </span>
            <span>
              <GiCoffeeBeans />
              {recipeObj.recipe_id.dose}g&nbsp;&nbsp;
            </span>
            <span>
              <IoWaterSharp />
              {recipeObj.recipe_id.weight}g&nbsp;&nbsp;
            </span>
            {
                  recipeObj.user_id.uid === user.uid
                    ? (
                      <button aria-label="delete" className="card-delete btn-stripped card-delete-btn" onClick={handleDelete} type="button"><MdDeleteForever /></button>
                    )
                    : (
                      ''
                    )
                }
          </div>
        </div>
      </div>
    </>
  );
}

FavRecipesCard.propTypes = {
  recipeObj: PropTypes.shape(
    {
      id: PropTypes.number,
      recipe_id: PropTypes.shape(
        {
          brew_time: PropTypes.number,
          default: PropTypes.bool,
          dose: PropTypes.number,
          grind_id: PropTypes.shape(
            {
              grind_size: PropTypes.string,
              id: PropTypes.number,
              image_url: PropTypes.string,
              order: PropTypes.number,
            },
          ).isRequired,
          id: PropTypes.number,
          method_id: PropTypes.shape(
            {
              description: PropTypes.string,
              dose_max: PropTypes.number,
              dose_min: PropTypes.number,
              id: PropTypes.number,
              image_url: PropTypes.string,
              name: PropTypes.string,
              weight_max: PropTypes.number,
            },
          ).isRequired,
          published: PropTypes.bool,
          recipe_name: PropTypes.string,
          weight: PropTypes.number,
        },
      ).isRequired,
      user_id: PropTypes.shape(
        {
          id: PropTypes.number,
          image_url: PropTypes.string,
          name: PropTypes.string,
          uid: PropTypes.string,
        },
      ).isRequired,
    },
  ).isRequired,
  render: PropTypes.func,
};
FavRecipesCard.defaultProps = {
  render: () => {},
};
