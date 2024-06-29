import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { 
  createCategory,
  updateCategory,
  setAddCategory,
  setEditCategory,
  resetSuccessAndError
 } from "../../features/categoriesSlice";

export default function AddEditCategoryModal() {

  const dispatch = useDispatch();
  const { addCategory, editCategory } = useSelector((state) => state.categories);
  
  const modalEl = document.getElementById("addEditModal");
  const addEditModal = useMemo(() => {
    return modalEl ? new Modal(modalEl) : null;
  }, [modalEl]);

  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (addCategory) {
      setCategory(addCategory);
      addEditModal?.show();
    } else if (editCategory) {
      setCategory(editCategory);
      addEditModal?.show();
    }
  }, [addEditModal, addCategory, editCategory]);

  const onSubmit = (e) => {
    e?.preventDefault();
    if (isFormValid()) {
      if (addCategory) {
        dispatch(createCategory(category));
      } else if (editCategory) {
        dispatch(updateCategory(category));
      }
      dispatch(resetSuccessAndError());
      addEditModal?.hide();
    }
  };

  const onCloseModal = () => {
    dispatch(setAddCategory(null));
    dispatch(setEditCategory(null));
    addEditModal.hide();
  };

  const isFormValid = () => {
    const form = document.getElementById("categoryForm");
    form?.classList?.add("was-validated");
    return form?.checkValidity();
  };

  return (
    <div
      className="modal fade"
      id="addEditModal"
      aria-labelledby="addEditCategoryModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addEditCategoryModalLabel">
              {(addCategory && "Add Category") || "Edit Category"}
            </h1>
            <button
              type="button"
              className="btn-close"
              onClick={onCloseModal}
            ></button>
          </div>
          <div className="modal-body">
            <form id="categoryForm">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={category?.title}
                  onChange={(e) => {
                    setCategory({ ...category, title: e.target.value });
                  }}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={category?.description}
                  onChange={(e) => {
                    setCategory({ ...category, description: e.target.value });
                  }}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="mb-3">
                <label htmlFor="color" className="form-label">
                  Color Hexadecimal
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="color"
                  value={category?.color}
                  onChange={(e) => {
                    setCategory({ ...category, color: e.target.value });
                  }}
                  required
                ></input>
                <div className="valid-feedback">Looks good!</div>
              </div>
            </form>
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
              className="btn btn-outline-success"
              onClick={onSubmit}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}