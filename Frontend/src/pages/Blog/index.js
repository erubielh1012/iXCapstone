import React, {useState, useEffect} from "react";
import { useParams, Link } from 'react-router-dom';

import "./index.css";

import blogService from "../../services/blogService";
import Loading from "../../components/Loading";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Categories from "../../components/Categories";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";

export default function BlogPage() {
  const { blogId } = useParams();

    const [blog, setBlog] = useState();
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const blog = await blogService.fetchBlogById(blogId);
          setBlog(blog);
          setIsSuccess(true);
          setMessage(blog.message);
          setIsLoading(false);
        } catch (error) {
          setIsError(true);
          setMessage(error.message || error);
          setIsLoading(false);
        }
      };
      
      fetchData();
      }, [blogId]);
    
      const resetSuccess = () => {
        setIsSuccess(false);
        setMessage("");
      }
    
      const resetError = () => {
        setIsError(false);
        setMessage("");
      }
    
      if (isLoading || !blog) {
        return <Loading />;
      }
    
      return (
        <>
          <Navbar />
          <main className="container">
            <img src={blog.image} className="my-5 w-75 " alt="..." />
            <div className="row g-5">
              <div className="col-md-8">
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
              <div className="author col-md-4 text-decoration-none" to={"/profile/" +blog.author.id}>
                <div className="position-sticky my-5" style={{ top: "2rem" }}>
                  <div className="p-4 mb-3 bg-body-secondary rounded text-center">
                    <h4 className="fst-italic">About the author</h4>
                    <img src={blog.author.image} className="avatar " alt="..." />
                    <p>{blog.author.bio.substring(0, 100)}...</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
          <SuccessToast
            show={isSuccess}
            message={message}
            onClose={resetSuccess}
          />
          <ErrorToast
            show={isError}
            message={message}
            onClose={resetError}
          />
        </>
      );
    }