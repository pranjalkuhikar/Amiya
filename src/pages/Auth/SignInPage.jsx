import { SignIn } from "@clerk/clerk-react";
import { useSearchParams } from "react-router-dom";

const SignInPage = () => {
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
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        afterSignInUrl={redirectUrl || "/"}
      />
    </div>
  );
};

export default SignInPage;
