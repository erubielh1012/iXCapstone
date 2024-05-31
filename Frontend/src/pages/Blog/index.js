import React, {useState, useEffect} from "react";
import { useParams, Link } from 'react-router-dom';
// Link

import blogService from "../../services/blogService";
import Loading from "../../components/Loading";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Categories from "../../components/Categories";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";

export default function BlogPage() {
  let {blogId} = useParams();

    const [blog, setBlog] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            setIsLoading(true);
            const blog = await blogService.fetchBlogById(blogId);
            setBlog(blog.data);
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
            <img src={blog.image} className="my-3 cover-img" alt="..." />
            <div className="row g-5">
              <div className="col-md-8">
                <article className="blog-post">
                  <div className="my-5">
                    <h2 className="blog-post-title">{blog.title}</h2>
                    <p className="blog-post-meta">
                      {blog.updatedAt.slice(0, 10)} by{" "}
                      <Link to={"/profile/" + blog.author.id}>
                        {blog.author.firstName} {blog.author.lastName}
                      </Link>
                    </p>
                    <p>{blog.description}</p>
                    <Categories blogPost={blog} />
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
              <div className="author col-md-4" onClick={"navigateToAuthorProfile"}>
                <div className="position-sticky my-5" style={{ top: "2rem" }}>
                  <div className="p-4 mb-3 bg-light rounded">
                    <h4 className="fst-italic">About the author</h4>
                    <img src={blog.author.image} className="avatar" alt="..." />
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