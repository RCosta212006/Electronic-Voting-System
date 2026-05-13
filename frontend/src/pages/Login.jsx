import loginImage from "../images/Game_Awards_Login.jpg";
import logoImage from "../images/Logo.png";
import AuthForm from "../components/AuthForm";
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

                    <AuthForm mode="login" />

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