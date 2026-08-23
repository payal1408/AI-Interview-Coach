import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const { loading, handleLogin } = useAuth()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", remember: false, });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   await handleLogin({
  //     email: formData.email,
  //     password: formData.password,
  //   });
  // };
  // --------------
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Login Data:", formData);
  //   // Add your login API here
  //   handleLogin({ email, password })
  //   navigate('/')
  //   if (loading) {
  //     return (<main><h1>Loading</h1></main>)
  //   }
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    console.log("Login Data:", formData);

    const response = await handleLogin({
      email: formData.email,
      password: formData.password,
    });

    console.log("Login Response:", response);

    navigate("/");
  } catch (error) {
    console.error("Login failed:", error);
  }
};

  return (
    <div className="login-page">

      {/* =====================================
          BACKGROUND
      ====================================== */}

      <div className="background-circle circle-one"></div>
      <div className="background-circle circle-two"></div>


      {/* =====================================
          MAIN CONTAINER
      ====================================== */}

      <div className="login-container">


        {/* =====================================
            LEFT SECTION
        ====================================== */}

        <div className="login-left">

          {/* Brand */}

          <div className="brand">

            <div className="brand-icon">
              ✦
            </div>

            <span>AI Creator</span>

          </div>


          {/* Hero */}

          <div className="hero-content">

            <span className="eyebrow">
              WELCOME BACK
            </span>

            <h1>
              Create.
              <br />

              <span>Inspire.</span>

              <br />

              Repeat.
            </h1>

            <p>
              Turn your ideas into engaging content with
              the power of AI. Create amazing posts in
              seconds.
            </p>


            {/* Benefits */}

            <div className="benefits">

              <div className="benefit">

                <span className="check">
                  ✓
                </span>

                <span>
                  Create content faster
                </span>

              </div>


              <div className="benefit">

                <span className="check">
                  ✓
                </span>

                <span>
                  AI-powered suggestions
                </span>

              </div>


              <div className="benefit">

                <span className="check">
                  ✓
                </span>

                <span>
                  Grow your online presence
                </span>

              </div>

            </div>

          </div>


          {/* Footer */}

          <div className="left-footer">

            <span>
              © 2026 AI Creator
            </span>

            <span>
              Create with AI
            </span>

          </div>

        </div>



        {/* =====================================
            RIGHT SECTION
        ====================================== */}

        <div className="login-right">

          <div className="login-card">


            {/* Header */}

            <div className="login-header">

              <h2>
                Welcome back
              </h2>

              <p>
                Enter your details to access your account.
              </p>

            </div>



            {/* =================================
                FORM
            ================================== */}

            <form className="login-form" onSubmit={handleSubmit}>


              {/* Email */}

              <div className="form-group">

                <label htmlFor="email">Email address</label>

                <div className="input-wrapper"><span>✉</span>

                  <input type="email" id="email" name="email" placeholder="Enter your email"
                    value={formData.email} onChange={handleChange} required />

                </div>

              </div>



              {/* Password */}

              <div className="form-group">

                <div className="password-label">

                  <label htmlFor="password">
                    Password
                  </label>

                  <Link to="/forgot-password">
                    Forgot password?
                  </Link>

                </div>


                <div className="input-wrapper">

                  <span>
                    🔒
                  </span>

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />


                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? "◉" : "◌"}
                  </button>

                </div>

              </div>



              {/* Remember */}

              <label className="remember">

                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />

                <span>
                  Remember me
                </span>

              </label>



              {/* Submit */}

              <button
                type="submit"
                className="submit-btn"
              >

                <span>
                  →
                </span>

                Sign in

              </button>

            </form>



            {/* Divider */}

            <div className="divider">
              <span>OR CONTINUE WITH</span>
            </div>



            {/* Google */}

            <button
              type="button"
              className="google-btn"
              onClick={() => {
                console.log("Google Login");
              }}
            >

              <strong>
                G
              </strong>

              Continue with Google

            </button>



            {/* Register */}

            <p className="bottom-text">

              Don't have an account?

              <Link to="/register">
                Create account
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;