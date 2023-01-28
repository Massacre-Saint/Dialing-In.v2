import React from 'react';
import PropTypes from 'prop-types';
import { MdDeleteForever } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { useAuth } from '../../utils/context/authContext';

export default function EditDeleteStepsButtons({
  handleDelete, handleShow, recipeObj, author,
}) {
  const { user } = useAuth();
  return (
    <div className="card-delete">
      {recipeObj.published || author.uid !== user.uid
        ? (
          ''
        )
        : (
          <>
            <button type="button" onClick={handleDelete} aria-label="delete"><MdDeleteForever /></button>
            <button type="button" className="btn-stripped" onClick={handleShow} aria-label="edit"><AiFillEdit /></button>
          </>
        )}
    </div>
  );
}
EditDeleteStepsButtons.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
  recipeObj: PropTypes.shape({
    published: PropTypes.bool,
  }).isRequired,
  author: PropTypes.shape({
    uid: PropTypes.string,
  }),
};

EditDeleteStepsButtons.defaultProps = {
  author: PropTypes.shape({
    uid: '',
  }),
};
