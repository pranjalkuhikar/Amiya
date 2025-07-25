import { useState, useEffect } from "react";
import { useSignUp, useAuth } from "@clerk/clerk-react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import "./Auth.scss";

const SignUpPage = () => {
  const { signUp, setActive, isLoaded } = useSignUp();
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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
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
            newErrors.email = "An account with this email already exists";
          } else if (err.code === "form_password_pwned") {
            newErrors.password =
              "This password has been compromised. Please choose a different one.";
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
      toast.error("Invalid verification code. Please try again.");
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
