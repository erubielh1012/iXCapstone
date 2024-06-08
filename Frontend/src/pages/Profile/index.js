import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import BlogList from "../../components/BlogList";
import Footer from "../../components/Footer";

import { useParams, Link } from "react-router-dom";

// import "./index.css";

import blogService from "../../services/blogService";
import authService from "../../services/authService";
import AddEditBlogModal from "../../components/AddEditBlogModal";
import EditProfileModal from "../../components/EditProfileModal";
import Loading from "../../components/Loading";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";
import DeleteBlogModal from "../../components/DeleteBlogModal";

export default function ProfilePage() {
    const { authorId } = useParams();

    const [blogs, setBlogs] = useState([]);
    const [author, setAuthor] = useState();
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      const getAuthorInfo = async () => {
        try {
          setIsLoading(true);
          const author = await authService.getAuthorInfo(authorId);
          setAuthor(author.data);
          setIsSuccess(true);
          setMessage(author.message);
          setIsLoading(false);
        } catch (error) {
          setIsError(true);
          setIsLoading(false);
          setMessage(error.message || error);
        }
      };
      getAuthorInfo();
      const getAuthorBlogs = async () => {
        try {
          setIsLoading(true);
          const blogs = await blogService.fetchBlogsByAuthorId(authorId);
          // this might set a problem when there are multiple of blogs, this author only has one and grabs the author info from that one
          setBlogs(blogs.data);
          setIsSuccess(true);
          setMessage(blogs.message);
          setIsLoading(false);
        } catch (error) {
          setIsError(true);
          setIsLoading(false);
          setMessage(error.message || error);
        }
      };
      getAuthorBlogs();
    }, [authorId]);
  
    const resetSuccess = () => {
      setIsSuccess(false);
      setMessage("");
    }
  
    const resetError = () => {
      setIsError(false);
      setMessage("");
    }

    const AuthorDetails = (author) => {
      <div className="author col-md-4">
        <div className="position-sticky my-5" style={{ top: "2rem" }}>
          <div className="p-4 mb-3 bg-light rounded">
            <h4 className="fst-italic">About the Author</h4>
            <h1>{author.firstName}{author.lastName}</h1>
            <p>{author.bio}</p>
            <img src={author.image} className="avatar" alt="..." />
            <p>{author.bio}</p>
          </div>
        </div>
      </div>
    }
  
    if (isLoading) {
      return <Loading />;
    }
  
    return (
      <>
        <Navbar />
        <div className="container">
          <AuthorDetails author={author} />
          <p className="page-subtitle">Author Blog Posts</p>
          <BlogList blogPosts={blogs} />
          <Footer />
        </div>
        {/* <EditProfileModal /> */}
        <AddEditBlogModal />
        <DeleteBlogModal />
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