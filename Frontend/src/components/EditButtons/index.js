import React from 'react';

import './index.css';

export default function EditButtons({onEdit, onDelete, onNavigate, inBlogs}) {
  return (
    <>
    <button
      style={{
        position: "absolute",
        top: "10px",
        right: "85px",
        border: "none",
        zIndex: 1,
      }}
      type="button"
      className={inBlogs ? "btn btn-dark" : "btn btn-outline-dark" }
      onClick={onEdit}
    >
      <i className="bi bi-pencil-fill"></i>
    </button>
    <button
      style={{
        position: "absolute",
        top: "10px",
        right: "45px",
        border: "none",
        zIndex: 1,
      }}
      type="button"
      className={inBlogs ? "btn btn-dark" : "btn btn-outline-dark" }
      onClick={onDelete}
    >
      <i className="bi bi-trash-fill"></i>
    </button>
    <button
      style={{
        position: "absolute",
        top: "10px",
        right: "5px",
        border: "none",
        zIndex: 1,
      }}
      type="button"
      className={inBlogs ? "btn btn-dark" : "btn btn-outline-dark" }
      onClick={onNavigate}
    >
      <i className='bi bi-arrows-fullscreen'></i>
    </button>
  </>
  )
}