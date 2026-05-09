import loginImage from "../images/Game_Awards_Login.jpg";
import logoImage from "../images/Logo.png";
import "../css/Login.css";

function Login() {
    return (
        <section className="login-page">
            <div className="login-card">
                <div className="login-left">
                    <img
                        src={logoImage}
                        alt="Game DSA Awards"
                        className="login-logo"
                    />

                    <form className="login-form">
                        <h1>Log in</h1>

                        <div className="mb-4">
                            <label className="form-label" htmlFor="email">
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="form-control form-control-lg"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="form-control form-control-lg"
                            />
                        </div>

                        <button className="btn btn-info btn-lg login-button" type="button">
                            Login
                        </button>

                        <a className="forgot-link" href="#!">
                            Forgot password?
                        </a>

                        <p className="register-text">
                            Don't have an account?{" "}
                            <a href="#!" className="link-info">
                                Register here
                            </a>
                        </p>
                    </form>
                </div>

                <div className="login-right">
                    <img
                        src={loginImage}
                        alt="Game Awards"
                        className="login-image"
                    />
                </div>
            </div>
        </section>
    );
}

export default Login;