import { useEffect } from "react";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SSOCallback = () => {
  const { handleRedirectCallback } = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await handleRedirectCallback();
        navigate("/");
      } catch (error) {
        console.error("SSO callback error:", error);
        navigate("/sign-in");
      }
    };

    handleCallback();
  }, [handleRedirectCallback, navigate]);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "18px",
      fontFamily: "PPR, sans-serif"
    }}>
      <div>Processing authentication...</div>
    </div>
  );
};

export default SSOCallback;
