import React from "react";
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from "../context/auth";
import { token } from "morgan";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SearchInput from "./Forms/SearchInput";
import useCategory from "../hooks/useCategory";
import { useCart } from "../context/CartContext";
import { Badge } from 'antd'
const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const categories = useCategory();
    const navigate = useNavigate();
    const handleLogout = () => {
        setAuth({
            ...auth, user: null,
            token: ''
        })

        localStorage.removeItem('auth');



    }


    return (
        <>


            <nav className="navbar navbar-expand-md fixed-top ">
                <div className="container-fluid ">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo01"
                        aria-controls="navbarTogglerDemo01"
                        aria-expanded="true"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse " id="navbarTogglerDemo01">


                        <img
                            className="h-30 auto imgHeader"
                            src={'/Designer.png'}
                            alt="Travel Companion Connect"
                            style={{
                                width: "3.5rem ",
                                height: "3rem",
                                borderRadius: "8px",
                                padding: "5px",





                            }}
                        />

                        <Link to="/" className="navbar-brand ">
                            Happiness Harbor
                        </Link>



                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                            <li

                                className="nav-item ">
                                <NavLink to="/" className="nav-link  ">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to={"/categories"}
                                    data-bs-toggle="dropdown"
                                >
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to={"/categories"}>
                                            All Categories
                                        </Link>
                                    </li>
                                    {categories?.map((c) => (
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to={`/category/${c.slug}`}
                                            >
                                                {c.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            {
                                !auth.user ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink to="/register" className="nav-link ">

                                                SignUp

                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/login" className="nav-link ">

                                                SignIn

                                            </NavLink>
                                        </li>
                                    </>

                                ) : (<>
                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {auth?.user?.name}
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li> <NavLink
                                                to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                                                    }`}
                                                className="dropdown-item "
                                            >
                                                Dashboard
                                            </NavLink></li>

                                            <li><NavLink onClick={handleLogout} to="/login" className="dropdown-item">SignOut

                                            </NavLink></li>

                                        </ul>
                                    </li>


                                </>)
                            }

                            <li className="nav-item">

                                <NavLink to="/cart" className="nav-link">

                                    Cart ({cart?.length})


                                </NavLink>

                            </li>

                            <li className="nav-item  ">
                                <SearchInput />
                            </li>


                        </ul>

                    </div>
                </div>
            </nav>





        </>
    )
}

export default Header;