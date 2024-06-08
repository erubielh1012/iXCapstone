import React, { useEffect, useState, useMemo } from 'react';
import { Modal } from 'bootstrap';

import Categories from '../Categories';
import Loading from '../../components/Loading';
import SuccessToast from '../../components/SuccessToast';
import ErrorToast from '../../components/ErrorToast';

export default function AddEditBlogModal({ 
    addBlog, 
    editBlog, 
    categories, 
    createBlog, 
    updateBlog,
    onClose,
}) {

    const user = JSON.parse(localStorage.getItem("user"));

    const modalEl = document.getElementById("addEditBlogModal")
    // const addEditModal = new Modal(addEditModalDom);
    const addEditModal = useMemo(() => {
        return modalEl ? new Modal(modalEl) : null;
      }, [modalEl]);

    const [blog, setBlog] = useState();

    useEffect(() => {
        if (addBlog) {
            setBlog(addBlog);
            addEditModal.show();
        } else if (editBlog) {
            setBlog(editBlog);
            addEditModal.show();
        } 
    }, [addBlog, editBlog, addEditModal]);

    const resetBlog = () => {
        setBlog({
            image: "",
            title: "",
            description: "",
            categories: [],
            content: [],
            authorId: user?.id,
        });
    };

    const onCloseModal = () => {
        resetBlog();
        addEditModal?.hide();
        onClose();
    };

    const onSubmit = (e) => {
        console.log("has submitted");
        e?.preventDefault();
        if (isFormValid()) {
            console.log("Form was valid");
            if (addBlog) {
                createBlog(blog);
            } else if (editBlog) {
                updateBlog(blog);
            }
            resetBlog();
            addEditModal?.hide();
        } else { console.log("Form was NOT valid"); }
    };

    const isFormValid = () => {
        const form = document.getElementById("blogForm");
        // form?.elements[1].setCustomValidity(hasCategories ? "" : "Invalid");
        form?.classList?.add("was-validated");
        return form?.checkValidity();
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div
            className="modal fade"
            id="addEditBlogModal"
            aria-labelledby="addEditBlogModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 
                            className="modal-title fs-5" 
                            id="addEditBlogModalLabel">
                            {(addBlog && "Add AA Blog") || "Edit Blog"}
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={onCloseModal}
                        ></button>
                    </div>
                <div className="modal-body">
                    <form id="blogForm">
                        <div className="input-group mb-3">
                            <label
                                className="input-group-text"
                                htmlFor="categoryInputSelect"
                            >Categories</label>
                            <select
                                className="form-select"
                                id="categoryInputSelect"
                                onChange={(e) => {
                                    const category = categories?.find(
                                        (x) => x.id === e.target.value
                                    );
                                    if (!category) {
                                        return;
                                    }
                                    if (blog?.categories?.find((x) => x.id === category.id)) {
                                        return;
                                    }
                                    const blogUpdate = {
                                        ...blog,
                                        categories: [...blog.categories, category],
                                    };
                                    setBlog(blogUpdate);
                                }}
                                required={editBlog ? false : true}
                            >
                                {categories?.map((category, index) => {
                                    return (
                                        <option key={index} value={category.id}>
                                            {category.title}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <Categories
                                categories={blog?.categories}
                                removeCategory={(category) => {
                                    setBlog({
                                        ...blog,
                                        categories: blog?.categories.filter(
                                            (x) => x.id !== category.id
                                        ),
                                    });
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={blog?.title}
                                onChange={(e) => {
                                    setBlog({ ...blog, title: e.target.value });
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
                                value={blog?.description}
                                onChange={(e) => {
                                    setBlog({ ...blog, description: e.target.value });
                                }}
                                required
                            />
                            <div className="valid-feedback">Looks good!</div>
                        </div>
                        <label htmlFor="description" className="form-label">
                            Content
                        </label>
                        {blog?.content?.map((section, index) => {
                            return (
                            <div className="p-3" key={index}>
                                <div className="mb-3">
                                        <label
                                            htmlFor={"sectionHeader" + index}
                                            className="form-label"
                                        >
                                            Section Header
                                        </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={"sectionHeader" + index}
                                        value={section.sectionHeader}
                                        onChange={(e) => {
                                            const updatedContent = blog.content.map(
                                                (section, secIndex) => {
                                                if (index === secIndex) {
                                                    return {
                                                    ...section,
                                                    sectionHeader: e.target.value,
                                                    };
                                                }
                                                return section;
                                                }
                                            );
                                            setBlog({ ...blog, content: updatedContent });
                                        }}
                                        required
                                    />
                                    <div className="valid-feedback">Looks good!</div>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor={"sectionText" + index}
                                        className="form-label"
                                    >
                                        Section Text
                                    </label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    id={"sectionText" + index}
                                    value={section.sectionText}
                                    onChange={(e) => {
                                        const updatedContent = blog.content.map(
                                            (section, secIndex) => {
                                                if (index === secIndex) {
                                                    return {
                                                        ...section,
                                                        sectionText: e.target.value,
                                                    };
                                                }
                                                return section;
                                            }
                                        );
                                        setBlog({ ...blog, content: updatedContent });
                                    }}
                                    required
                                />
                                <div className="valid-feedback">Looks good!</div>
                                </div>
                            </div>
                            );
                        })}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            {blog?.content?.length > 0 && (
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    style={{
                                        position: "absolute",
                                        bottom: "45px",
                                        right: "10px",
                                        zIndex: "1",
                                    }}
                                    onClick={() => {
                                        const blogUpdate = {
                                            ...blog,
                                            content: blog?.content.slice(0, -1),
                                        };
                                        setBlog(blogUpdate);
                                    }}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            )}
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => {
                                    const blogUpdate = {
                                    ...blog,
                                    content: [
                                        ...blog?.content,
                                        { sectionHeader: "", sectionText: "" },
                                    ],
                                    };
                                    setBlog(blogUpdate);
                                }}
                            >
                            <i className="bi bi-plus-circle"></i>
                            </button>
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
        <SuccessToast
            show={isSuccess}
            message={message}
        />
        <ErrorToast
            show={isError}
            message={message}
        />
    </div>
    )
}