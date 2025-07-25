import { SignUp } from "@clerk/clerk-react";
import { useSearchParams } from "react-router-dom";

const SignUpPage = () => {
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        margin: "3.5em 0",
      }}
    >
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        afterSignUpUrl={redirectUrl || "/"}
      />
    </div>
  );
};

export default SignUpPage;
