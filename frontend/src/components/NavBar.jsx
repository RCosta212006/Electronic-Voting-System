import { Link } from "react-router-dom";

function NavBar() {
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
                                About
                            </Link>
                        </li>
                    </ul>
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
                </div>
            </div>
        </nav>
    );
}

export default NavBar;