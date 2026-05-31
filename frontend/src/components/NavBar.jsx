import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { isAuthenticated, logoutUser } from "../services/authService";

function NavBar() {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(isAuthenticated());

    useEffect(() => {
        function syncAuthState() {
            setAuthenticated(isAuthenticated());
        }

        window.addEventListener("auth-changed", syncAuthState);
        window.addEventListener("storage", syncAuthState);

        return () => {
            window.removeEventListener("auth-changed", syncAuthState);
            window.removeEventListener("storage", syncAuthState);
        };
    }, []);

    function handleSignOut() {
        logoutUser();
        setAuthenticated(false);
        window.dispatchEvent(new Event("auth-changed"));
        navigate("/login");
    }

    return (
        <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid position-relative">
                <Link className="navbar-brand fw-bold" to="/">Game_DSA_Awards</Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarToggler"
                    aria-controls="navbarToggler"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarToggler">
                    <ul className="navbar-nav mx-lg-auto mb-2 mb-lg-0 nav-center">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/categories">
                                Categorias
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/creators">
                                Creators
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/about">
                                About us
                            </Link>
                        </li>
                    </ul>
                    {authenticated ? (
                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-outline-danger"
                                type="button"
                                onClick={handleSignOut}
                            >
                                Sign out
                            </button>
                        </div>
                    ) : (
                        <div className="d-flex gap-2">
                            <Link to="/login">
                                <button className="btn btn-outline-success">
                                    Login
                                </button>
                            </Link>

                            <Link to="/register">
                                <button className="btn btn-success">
                                    Sign up
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
