function AuthForm({ mode }) {

    const isRegister = mode === "register";

    return (
        <form className="login-form">

            <h1>
                {isRegister ? "Create account" : "Log in"}
            </h1>

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

            {isRegister && (
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
                    />
                </div>
            )}

            <button
                className="btn btn-info btn-lg login-button"
                type="button"
            >
                {isRegister ? "Create account" : "Login"}
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

                <a href="#!" className="link-info">
                    {isRegister ? "Log in" : "Register here"}
                </a>
            </p>

        </form>
    );
}

export default AuthForm;