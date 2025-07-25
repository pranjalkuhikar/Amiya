import { useState, useEffect } from "react";
import { useSignUp, useAuth } from "@clerk/clerk-react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User } from "lucide-react";
import { toast } from "react-toastify";
import "./Auth.scss";

const SignUpPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { isSignedIn } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirectUrl = searchParams.get("redirect_url");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

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

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm() || !isLoaded) return;

    setIsLoading(true);

    try {
      await signUp.create({
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailAddress: formData.email,
        password: formData.password,
      });

      // Send email verification
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
      toast.success("Verification code sent to your email!");
    } catch (error) {
      console.error("Sign up error:", error);

      if (error.errors) {
        const newErrors = {};
        error.errors.forEach((err) => {
          if (err.code === "form_identifier_exists") {
            newErrors.email =
              "An account with this email already exists. Please sign in instead.";
          } else if (err.code === "form_password_pwned") {
            newErrors.password =
              "This password has been compromised. Please choose a different one.";
          } else if (err.code === "form_password_length_too_short") {
            newErrors.password = "Password must be at least 8 characters long.";
          } else if (err.code === "form_param_format_invalid") {
            if (err.meta?.paramName === "email_address") {
              newErrors.email = "Please enter a valid email address.";
            } else {
              toast.error(err.message || "Invalid input format");
            }
          } else {
            toast.error(err.message || "Sign up failed");
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

  const handleVerification = async (e) => {
    e.preventDefault();

    if (!verificationCode.trim()) {
      toast.error("Please enter the verification code");
      return;
    }

    setIsLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        toast.success("Account created successfully! Welcome to Amiya!");
        navigate(redirectUrl || "/");
      } else {
        console.error("Verification not complete:", completeSignUp);
        toast.error("Verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Verification error:", error);

      if (error.errors) {
        error.errors.forEach((err) => {
          if (err.code === "form_code_incorrect") {
            toast.error(
              "Invalid verification code. Please check your email and try again."
            );
          } else if (err.code === "verification_expired") {
            toast.error(
              "Verification code has expired. Please request a new one."
            );
          } else {
            toast.error(err.message || "Verification failed");
          }
        });
      } else {
        toast.error("Invalid verification code. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Social login handler
  const handleSocialLogin = async (strategy) => {
    if (!isLoaded) return;

    setSocialLoading(strategy);

    try {
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: redirectUrl || "/",
      });
    } catch (error) {
      console.error(`${strategy} login error:`, error);

      if (error.errors) {
        error.errors.forEach((err) => {
          toast.error(err.message || `${strategy} login failed`);
        });
      } else {
        toast.error(`${strategy} login failed. Please try again.`);
      }
    } finally {
      setSocialLoading("");
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

  if (pendingVerification) {
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
              <motion.h1 variants={itemVariants}>Verify Your Email</motion.h1>
              <motion.p variants={itemVariants}>
                We've sent a verification code to {formData.email}
              </motion.p>
            </div>

            <motion.form
              className="auth-form"
              onSubmit={handleVerification}
              variants={itemVariants}
            >
              <div className="form-group">
                <label htmlFor="verificationCode">Verification Code</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={20} />
                  <input
                    type="text"
                    id="verificationCode"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    required
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                className="auth-button"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="button-text">
                  {isLoading ? "Verifying..." : "Verify Email"}
                </span>
                <ArrowRight className="button-icon" size={20} />
              </motion.button>
            </motion.form>

            <motion.div className="auth-footer" variants={itemVariants}>
              <p>
                Already have an account?{" "}
                <Link to="/sign-in" className="auth-link">
                  Sign in here
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

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
            <motion.h1 variants={itemVariants}>Create Account</motion.h1>
            <motion.p variants={itemVariants}>
              Join Amiya and start your fashion journey
            </motion.p>
          </div>

          <motion.form
            className="auth-form"
            onSubmit={handleSubmit}
            variants={itemVariants}
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <div className="input-wrapper">
                  <User className="input-icon" size={20} />
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={errors.firstName ? "error" : ""}
                    placeholder="First name"
                    required
                  />
                </div>
                {errors.firstName && (
                  <span className="error-message">{errors.firstName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <div className="input-wrapper">
                  <User className="input-icon" size={20} />
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? "error" : ""}
                    placeholder="Last name"
                    required
                  />
                </div>
                {errors.lastName && (
                  <span className="error-message">{errors.lastName}</span>
                )}
              </div>
            </div>

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
                  placeholder="Create a password"
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
                {isLoading ? "Creating Account..." : "Create Account"}
              </span>
              <ArrowRight className="button-icon" size={20} />
            </motion.button>
          </motion.form>

          {/* Social Login Section */}
          <motion.div className="social-login-section" variants={itemVariants}>
            <div className="divider">
              <span>or continue with</span>
            </div>

            <div className="social-buttons">
              <motion.button
                type="button"
                className={`social-button google ${
                  socialLoading === "oauth_google" ? "loading" : ""
                }`}
                onClick={() => handleSocialLogin("oauth_google")}
                disabled={socialLoading !== ""}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  className="social-icon"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>
                  {socialLoading === "oauth_google"
                    ? "Connecting..."
                    : "Google"}
                </span>
              </motion.button>

              <motion.button
                type="button"
                className={`social-button facebook ${
                  socialLoading === "oauth_facebook" ? "loading" : ""
                }`}
                onClick={() => handleSocialLogin("oauth_facebook")}
                disabled={socialLoading !== ""}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  className="social-icon"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path
                    fill="#1877F2"
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
                <span>
                  {socialLoading === "oauth_facebook"
                    ? "Connecting..."
                    : "Facebook"}
                </span>
              </motion.button>
            </div>
          </motion.div>

          <motion.div className="auth-footer" variants={itemVariants}>
            <p>
              Already have an account?{" "}
              <Link to="/sign-in" className="auth-link">
                Sign in here
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
