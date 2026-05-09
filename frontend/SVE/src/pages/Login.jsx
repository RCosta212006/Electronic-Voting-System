import loginImage from "../images/Game_Awards_Login.jpg";
import logoImage from "../images/Logo.png";
import "../css/Login.css";

function Login() {
    return (
        <section className="login-page">
            <div className="container-fluid h-100">
                <div className="row h-100">

                    <div className="col-sm-6 text-black login-left">
                        <div className="logo-container">
                            <img
                                src={logoImage}
                                alt="Game DSA Awards"
                                className="login-logo"
                            />
                        </div>

                        <div className="login-form-container">
                            <form className="login-form">
                                <h1 className="fw-normal mb-4">Log in</h1>

                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="emailinput"
                                        className="form-control form-control-lg"
                                    />
                                    <label className="form-label" htmlFor="form2Example18">
                                        Email address
                                    </label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type="password"
                                        id="passwordinput"
                                        className="form-control form-control-lg"
                                    />
                                    <label className="form-label" htmlFor="form2Example28">
                                        Password
                                    </label>
                                </div>

                                <div className="pt-1 mb-4">
                                    <button className="btn btn-info btn-lg" type="button">
                                        Login
                                    </button>
                                </div>

                                <p className="small mb-5">
                                    <a className="text-muted" href="#!">
                                        Forgot password?
                                    </a>
                                </p>

                                <p>
                                    Don't have an account?{" "}
                                    <a href="#!" className="link-info">
                                        Register here
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>

                    <div className="col-sm-6 px-0 d-none d-sm-block">
                        <img
                            src={loginImage}
                            alt="Login"
                            className="login-image"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Login;