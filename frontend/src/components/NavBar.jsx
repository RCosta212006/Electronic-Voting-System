function NavBar() {
    return (
        <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid position-relative">
                <a className="navbar-brand" href="#">Game_DSA_Awards</a>

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
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Categorias</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Creators</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                    </ul>
                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-success" type="button">Login</button>
                        <button className="btn btn-outline-success" type="button">Sign up</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;