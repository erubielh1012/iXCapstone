import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Categories from "../../components/Categories";

import "./index.css";

export default function ShowBlog({ blog }) {

    if (!blog) return;
    
  return (
    <main className="container" >
        <div className="row g-5">
            <div className="col-md-8">
                <img src={blog.image} className="mt-5 w-100 rounded" alt="..." style={{boxShadow: "0 5px 10px 5px grey"}} />
                <article className="blog-post">
                <div className="my-5">
                    <h2 className="blog-post-title">{blog.title}</h2>
                    <p className="blog-post-meta">
                    {blog.updatedAt.slice(0, 10)} by{" "}
                    <Link className="text-decoration-none" to={"/profile/" + blog.author.id}>
                        {blog.author.firstName} {blog.author.lastName}
                    </Link>
                    </p>
                    <p>{blog.description}</p>
                    <Categories categories={blog.categories} />
                </div>
                <hr />
                {blog.content.map((content, index) => {
                    return (
                    <div key={index} className="my-5">
                        <h2 className="my-3">{content.sectionHeader}</h2>
                        <p>{content.sectionText}</p>
                    </div>
                    );
                })}
                </article>
            </div>
            <div className="author col-md-4 text-decoration-none" to={"/profile/" + blog.author.id}>
                <div className="position-sticky my-5" style={{ top: "2rem" }}>
                <div className="p-4 mb-3 bg-body-secondary rounded text-center">
                    <h4 className="fst-italic">About the author</h4>
                    <img src={blog.author.image} width="100%" height="100%" className="avatar " alt="..." />
                    <p>{blog.author.bio.substring(0, 100)}...</p>
                </div>
                </div>
            </div>
        </div>
    </main>
  )
}

ShowBlog.propTypes = {
    blog: PropTypes.object.isRequired,
}