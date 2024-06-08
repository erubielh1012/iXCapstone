// import logo from './logo.svg';
// This is a test

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
// import "bootstrap-icons/font/bootstrap-icons.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CategoriesPage from "./pages/Categories";
import BlogsPage from './pages/Blogs';
import HomePage from './pages/Home';
import BlogPage from "./pages/Blog";
import ProfilePage from "./pages/Profile";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

import './App.css';

const routes = [
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/Home/",
    element: <HomePage/>,
  },
  {
    path: "/Blogs/",
    element: <BlogsPage/>,
  },
  {
    path: "/Blogs/:categoryId?",
    element: <BlogsPage/>,
  },
  {
    path: "/Blog/:blogId",
    element: <BlogPage/>,
  },
  {
    path: "/Categories/",
    element: <CategoriesPage/>,
  },
  {
    path: "/Profile/:authorId",
    element: <ProfilePage/>,
  },
  {
    path: "/Login",
    element: <LoginPage />,
  },
  {
    path:"/Register",
    element: <RegisterPage/>
  }
];
const router = createBrowserRouter(routes);

function App() {
  return <
    RouterProvider router = {router}
  />;
}

export default App;
