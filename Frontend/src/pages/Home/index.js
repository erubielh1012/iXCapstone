import React, {useEffect, useState} from "react";

import Heading from "../../components/Heading";
import Navbar from "../../components/Navbar";
import BlogGrid from "../../components/BlogGrid";
import Footer from "../../components/Footer";
import SubHeading from "../../components/SubHeading";
import CategoryList from "../../components/CategoryList";
import Loading from "../../components/Loading";

import blogService from "../../services/blogService"
import categoryService from "../../services/categoryService";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const [message, setMessage] = useState("nada");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const blogsRes = await blogService.fetchBlogs();
        const catRes = await categoryService.fetchCategories();

        setBlogs(blogsRes);
        setCategories(catRes.data);

        setIsSuccess(true);
        setMessage(blogsRes.message);
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
        setMessage(err.message);
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const resetSuccess = () => {
    setIsSuccess(false);
    setMessage("nada");
  }

  const resetError = () => {
    setIsError(false);
    setMessage("nada");
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <Heading />
       <div className="container">
        <SubHeading subHeading={"Recent Blog Posts"} />
        <BlogGrid blogPosts={blogs}></BlogGrid>
        <SubHeading subHeading={"Categories"} />
        <CategoryList categories={categories}></CategoryList>
        <Footer />
      </div>
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