// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import "./Register.scss";

// const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//  const [formData, setFormData] = useState({
//   name: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
//   terms: false,
// });
//   const { loading, handleRegister } = useAuth()
//   const navigate = useNavigate()


//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit =  async(e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     if (!formData.terms) {
//       alert("Please accept the terms and conditions");
//       return;
//     }

//     console.log("Register Data:", formData);

//     // Add your register API here
//     await handleRegister({ name, email, password })
//     navigate('/')
//     if (loading) {
//       return (<main><h1>Loading.....</h1></main>)
//     }
//   };

//   return (
//     <div className="register-page">

//       {/* =====================================
//           BACKGROUND
//       ====================================== */}

//       <div className="background-circle circle-one"></div>
//       <div className="background-circle circle-two"></div>


//       {/* =====================================
//           MAIN CONTAINER
//       ====================================== */}

//       <div className="register-container">


//         {/* =====================================
//             LEFT SECTION
//         ====================================== */}

//         <div className="register-left">

//           {/* Brand */}

//           <div className="brand">

//             <div className="brand-icon">
//               ✦
//             </div>

//             <span>
//               AI Creator
//             </span>

//           </div>


//           {/* Hero */}

//           <div className="hero-content">

//             <span className="eyebrow">
//               JOIN THE COMMUNITY
//             </span>

//             <h1>
//               Build.
//               <br />

//               <span>Create.</span>

//               <br />

//               Grow.
//             </h1>

//             <p>
//               Join thousands of creators using AI to
//               transform their ideas into powerful,
//               engaging content.
//             </p>


//             {/* Benefits */}

//             <div className="benefits">

//               <div className="benefit">

//                 <span className="check">
//                   ✓
//                 </span>

//                 <span>
//                   Generate content with AI
//                 </span>

//               </div>


//               <div className="benefit">

//                 <span className="check">
//                   ✓
//                 </span>

//                 <span>
//                   Save time and effort
//                 </span>

//               </div>


//               <div className="benefit">

//                 <span className="check">
//                   ✓
//                 </span>

//                 <span>
//                   Take your content further
//                 </span>

//               </div>

//             </div>

//           </div>


//           {/* Footer */}

//           <div className="left-footer">

//             <span>
//               © 2026 AI Creator
//             </span>

//             <span>
//               Create with AI
//             </span>

//           </div>

//         </div>



//         {/* =====================================
//             RIGHT SECTION
//         ====================================== */}

//         <div className="register-right">

//           <div className="register-card">


//             {/* Header */}

//             <div className="register-header">

//               <h2>
//                 Create an account
//               </h2>

//               <p>
//                 Start creating amazing content with AI.
//               </p>

//             </div>



//             {/* =================================
//                 FORM
//             ================================== */}

//             <form
//               className="register-form"
//               onSubmit={handleSubmit}
//             >


//               {/* Name */}

//               <div className="form-group">

//                 <label htmlFor="name">
//                   Full name
//                 </label>

//                 <div className="input-wrapper">

//                   <span>
//                     ◉
//                   </span>

//                   <input type="text" id="name" name="name" placeholder="Enter your full name" value={formData.username} onChange={handleChange} required />
//                 </div>
//               </div>

//               {/* Email */}

//               <div className="form-group">

//                 <label htmlFor="email">
//                   Email address
//                 </label>

//                 <div className="input-wrapper">

//                   <span>
//                     ✉
//                   </span>

//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     placeholder="Enter your email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />

//                 </div>

//               </div>



//               {/* Password */}

//               <div className="form-group">

//                 <label htmlFor="password">
//                   Password
//                 </label>

//                 <div className="input-wrapper">

//                   <span>
//                     🔒
//                   </span>

//                   <input
//                     type={
//                       showPassword
//                         ? "text"
//                         : "password"
//                     }
//                     id="password"
//                     name="password"
//                     placeholder="Create a password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     minLength={6}
//                   />

//                   <button
//                     type="button"
//                     className="password-toggle"
//                     onClick={() =>
//                       setShowPassword((prev) => !prev)
//                     }
//                     aria-label={
//                       showPassword
//                         ? "Hide password"
//                         : "Show password"
//                     }
//                   >
//                     {showPassword ? "◉" : "◌"}
//                   </button>

//                 </div>

//               </div>



//               {/* Confirm Password */}

//               <div className="form-group">

//                 <label htmlFor="confirmPassword">
//                   Confirm password
//                 </label>

//                 <div className="input-wrapper">

//                   <span>
//                     🔒
//                   </span>

//                   <input
//                     type={
//                       showConfirmPassword
//                         ? "text"
//                         : "password"
//                     }
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     placeholder="Confirm your password"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     required
//                     minLength={6}
//                   />

//                   <button
//                     type="button"
//                     className="password-toggle"
//                     onClick={() =>
//                       setShowConfirmPassword(
//                         (prev) => !prev
//                       )
//                     }
//                     aria-label={
//                       showConfirmPassword
//                         ? "Hide password"
//                         : "Show password"
//                     }
//                   >
//                     {showConfirmPassword
//                       ? "◉"
//                       : "◌"}
//                   </button>

//                 </div>

//               </div>



//               {/* Terms */}

//               <label className="terms">

//                 <input
//                   type="checkbox"
//                   name="terms"
//                   checked={formData.terms}
//                   onChange={handleChange}
//                 />

//                 <span>
//                   I agree to the{" "}
//                   <Link to="/terms">
//                     Terms of Service
//                   </Link>{" "}
//                   and{" "}
//                   <Link to="/privacy">
//                     Privacy Policy
//                   </Link>
//                   .
//                 </span>

//               </label>



//               {/* Submit */}

//               <button
//                 type="submit"
//                 className="submit-btn"
//               >

//                 <span>
//                   →
//                 </span>

//                 Create account

//               </button>

//             </form>



//             {/* Divider */}

//             <div className="divider">
//               <span>OR CONTINUE WITH</span>
//             </div>



//             {/* Google */}

//             <button
//               type="button"
//               className="google-btn"
//               onClick={() => {
//                 console.log("Google Register");
//               }}
//             >

//               <strong>
//                 G
//               </strong>

//               Continue with Google

//             </button>



//             {/* Login */}

//             <p className="bottom-text">

//               Already have an account?

//               <Link to="/login">
//                 Sign in
//               </Link>

//             </p>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default Register;


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./Register.scss";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!formData.terms) {
      alert("Please accept the terms and conditions");
      return;
    }

    try {
      console.log("Register Data:", formData);

      const response = await handleRegister({
        username: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log("Register Response:", response);

      navigate("/");
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
    }
  };

  if (loading) {
    return (
      <main>
        <h1>Loading.....</h1>
      </main>
    );
  }

  return (
    <div className="register-page">
      {/* BACKGROUND */}
      <div className="background-circle circle-one"></div>
      <div className="background-circle circle-two"></div>

      {/* MAIN CONTAINER */}
      <div className="register-container">

        {/* LEFT SECTION */}
        <div className="register-left">

          {/* Brand */}
          <div className="brand">
            <div className="brand-icon">
              ✦
            </div>

            <span>
              AI Creator
            </span>
          </div>

          {/* Hero */}
          <div className="hero-content">

            <span className="eyebrow">
              JOIN THE COMMUNITY
            </span>

            <h1>
              Build.
              <br />

              <span>Create.</span>

              <br />

              Grow.
            </h1>

            <p>
              Join thousands of creators using AI to
              transform their ideas into powerful,
              engaging content.
            </p>

            {/* Benefits */}
            <div className="benefits">

              <div className="benefit">
                <span className="check">
                  ✓
                </span>

                <span>
                  Generate content with AI
                </span>
              </div>

              <div className="benefit">
                <span className="check">
                  ✓
                </span>

                <span>
                  Save time and effort
                </span>
              </div>

              <div className="benefit">
                <span className="check">
                  ✓
                </span>

                <span>
                  Take your content further
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

        {/* RIGHT SECTION */}
        <div className="register-right">

          <div className="register-card">

            {/* Header */}
            <div className="register-header">
              <h2>
                Create an account
              </h2>

              <p>
                Start creating amazing content with AI.
              </p>
            </div>

            {/* FORM */}
            <form
              className="register-form"
              onSubmit={handleSubmit}
            >

              {/* Full Name */}
              <div className="form-group">

                <label htmlFor="name">
                  Full name
                </label>

                <div className="input-wrapper">

                  <span>
                    ◉
                  </span>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>
              </div>

              {/* Email */}
              <div className="form-group">

                <label htmlFor="email">
                  Email address
                </label>

                <div className="input-wrapper">

                  <span>
                    ✉
                  </span>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>
              </div>

              {/* Password */}
              <div className="form-group">

                <label htmlFor="password">
                  Password
                </label>

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
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
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

              {/* Confirm Password */}
              <div className="form-group">

                <label htmlFor="confirmPassword">
                  Confirm password
                </label>

                <div className="input-wrapper">

                  <span>
                    🔒
                  </span>

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        (prev) => !prev
                      )
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword
                      ? "◉"
                      : "◌"}
                  </button>

                </div>
              </div>

              {/* Terms */}
              <label className="terms">

                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                />

                <span>
                  I agree to the{" "}
                  <Link to="/terms">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy">
                    Privacy Policy
                  </Link>
                  .
                </span>

              </label>

              {/* Submit */}
              <button
                type="submit"
                className="submit-btn"
                disabled={loading}
              >
                <span>
                  →
                </span>

                {loading
                  ? "Creating account..."
                  : "Create account"}
              </button>

            </form>

            {/* Divider */}
            <div className="divider">
              <span>
                OR CONTINUE WITH
              </span>
            </div>

            {/* Google */}
            <button
              type="button"
              className="google-btn"
              onClick={() => {
                console.log("Google Register");
              }}
            >
              <strong>
                G
              </strong>

              Continue with Google
            </button>

            {/* Login */}
            <p className="bottom-text">
              Already have an account?

              <Link to="/login">
                Sign in
              </Link>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Register;