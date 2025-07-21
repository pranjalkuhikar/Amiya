import { useState } from "react";
import Loader from "../components/Loader";
import AppRouter from "../router/AppRouter";

export default function MainLayout() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      {!isLoading && <AppRouter />}
    </>
  );
}
