import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser, registerUser } from "../services/authService";
import RoleRadioGroup from "./RoleRadioGroup";

function AuthForm({ mode }) {
    const navigate = useNavigate();

    const isRegister = mode === "register";
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("voter");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        if (isRegister && password !== confirmPassword) {
            setError("As palavras-passe nao coincidem.");
            return;
        }

        try {
            setLoading(true);

            if (isRegister) {
                await registerUser({ name, email, password, role });
                await loginUser({ email, password });
            } else {
                await loginUser({ email, password });
            }

            window.dispatchEvent(new Event("auth-changed"));
            navigate("/categories");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>

            <h1>
                {isRegister ? "Create account" : "Log in"}
            </h1>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {isRegister && (
                <div className="mb-4">
                    <label className="form-label" htmlFor="name">
                        Name
                    </label>

                    <input
                        type="text"
                        id="name"
                        className="form-control form-control-lg"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        minLength={3}
                        required
                    />
                </div>
            )}

            <div className="mb-4">
                <label className="form-label" htmlFor="email">
                    Email address
                </label>

                <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
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
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    minLength={6}
                    required
                />
            </div>

            {isRegister && (
                <>
                    <div className="mb-4">
                        <label
                            className="form-label"
                            htmlFor="confirmPassword"
                        >
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            id="confirmPassword"
                            className="form-control form-control-lg"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            minLength={6}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">
                            Account type
                        </label>
                        <RoleRadioGroup value={role} onChange={setRole} />
                    </div>
                </>
            )}

            <button
                className="btn btn-info btn-lg login-button"
                type="submit"
                disabled={loading}
            >
                {loading ? "A processar..." : isRegister ? "Create account" : "Login"}
            </button>

            {!isRegister && (
                <a className="forgot-link" href="#!">
                    Forgot password?
                </a>
            )}

            <p className="register-text">
                {isRegister
                    ? "Already have an account? "
                    : "Don't have an account? "}
                <Link to={isRegister ? "/login" : "/register"}>
                    {isRegister ? "Log in" : "Register here"}
                </Link>

            </p>

        </form>
    );
}

export default AuthForm;
