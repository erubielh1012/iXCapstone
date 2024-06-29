import React, { useMemo, useEffect } from "react";
import { Modal } from "bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { 
  deleteCategory, 
  resetSuccessAndError,
  setDeleteCategory 
} from "../../features/categoriesSlice";

export default function DeleteCategoryModal() {
  const dispatch = useDispatch();
  const {
    deleteCat
  } = useSelector((state) => state.categories)

  const modalEl = document.getElementById("deleteCategoryModal");
  const deleteCategoryModal = useMemo(() => {
    return modalEl ? new Modal(modalEl) : null;
  }, [modalEl]);

  useEffect(() => {
    if (deleteCat) {
      deleteCategoryModal?.show();
    }
  }, [deleteCat, deleteCategoryModal]);

  const onCloseModal = () => {
    dispatch(resetSuccessAndError());
    dispatch(setDeleteCategory(null));
    deleteCategoryModal?.hide();
  };

  const onDelete = () => {
    dispatch(deleteCategory(deleteCat));
    dispatch(resetSuccessAndError());
    deleteCategoryModal?.hide();
  };

  return (
    <div
      className="modal fade"
      id="deleteCategoryModal"
      aria-labelledby="deleteCategoryModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="deleteCategoryModalLabel">
              Delete Category
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onCloseModal}
            ></button>
          </div>
          <div className="modal-body">
            <p>Are You sure you want to delete this Category?</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h5 style={{ marginLeft: "8px" }}>{deleteCat?.title}</h5>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCloseModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}