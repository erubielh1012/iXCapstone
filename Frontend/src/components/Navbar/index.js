import React from "react";
import { Link, useNavigate } from "react-router-dom";

// import HomePage from './pages/Home';
// import BlogsPage from "../../pages/Blogs";
// import CategoriesPage from "../../pages/Categories";


export default function Navbar() {
  
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate =  useNavigate();

    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">iX Software Engineering Blog</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Categories">Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Blogs">Blogs</Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/About">About</link>
              </li> */}
              {user && user.token ? (
                <li className="nav-item">
                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="bi bi-person-circle"></i>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link
                          className=" dropdown-item"
                          aria-current="page"
                          to={"/profile/" + user.id}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          style={{ cursor: "pointer" }}
                          className="dropdown-item"
                          onClick={() => {
                            localStorage.removeItem("user");
                            navigate("/login");
                          }}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : null}
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    );
}