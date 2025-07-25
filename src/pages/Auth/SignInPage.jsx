import { useState, useEffect } from "react";
import { useSignIn, useAuth } from "@clerk/clerk-react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import "./Auth.scss";

const SignInPage = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { isSignedIn } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirectUrl = searchParams.get("redirect_url");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Redirect if already signed in
  useEffect(() => {
    if (isSignedIn) {
      navigate(redirectUrl || "/");
    }
  }, [isSignedIn, navigate, redirectUrl]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm() || !isLoaded) return;

    setIsLoading(true);

    try {
      // Use the correct strategy for email/password sign in
      const result = await signIn.create({
        identifier: formData.email,
        password: formData.password,
        strategy: "password",
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Welcome back!");
        navigate(redirectUrl || "/");
      } else if (result.status === "needs_verification") {
        // Handle cases where verification is needed
        console.log("Verification needed:", result);
        toast.error("Account verification required. Please check your email.");
      } else {
        console.error("Sign in not complete:", result);
        toast.error("Sign in failed. Please try again.");
      }
    } catch (error) {
      console.error("Sign in error:", error);

      if (error.errors) {
        const newErrors = {};
        error.errors.forEach((err) => {
          if (err.code === "form_identifier_not_found") {
            newErrors.email = "No account found with this email";
          } else if (err.code === "form_password_incorrect") {
            newErrors.password = "Incorrect password";
          } else {
            toast.error(err.message || "Sign in failed");
          }
        });
        setErrors(newErrors);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      className="auth-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="auth-background">
        <div className="pattern-overlay"></div>
      </div>

      <div className="auth-container">
        <motion.div className="auth-card" variants={itemVariants}>
          <div className="auth-header">
            <motion.h1 variants={itemVariants}>Welcome Back</motion.h1>
            <motion.p variants={itemVariants}>
              Sign in to your account to continue shopping
            </motion.p>
          </div>

          <motion.form
            className="auth-form"
            onSubmit={handleSubmit}
            variants={itemVariants}
          >
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "error" : ""}
                  placeholder="Enter your email"
                  required
                />
              </div>
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? "error" : ""}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <motion.button
              type="submit"
              className="auth-button"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="button-text">
                {isLoading ? "Signing In..." : "Sign In"}
              </span>
              <ArrowRight className="button-icon" size={20} />
            </motion.button>
          </motion.form>

          <motion.div className="auth-footer" variants={itemVariants}>
            <p>
              Don't have an account?{" "}
              <Link to="/sign-up" className="auth-link">
                Sign up here
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SignInPage;
