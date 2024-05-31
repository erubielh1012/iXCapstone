export default function ProfilePage() {
    const [blogs, setBlogs] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      const getAuthorBlogs = async () => {
        try {
          setIsLoading(true);
          const blogs = await blogService.fetchBlogsByAuthorId(authorId);
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
  
    if (isLoading) {
      return <Loading />;
    }
  
    return (
      <>
        <Navbar />
        <div className="container">
          <AuthorDetails />
          <p className="page-subtitle">Author Blog Posts</p>
          <BlogList blogPosts={authorBlogs} />
          <Footer />
        </div>
        <EditProfileModal />
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