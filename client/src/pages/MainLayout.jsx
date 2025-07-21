import { useState } from "react";
import Loader from "../components/Loader";
import AppRouter from "../router/AppRouter";
import Menu from "../components/Menu";

export default function MainLayout() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      {!isLoading && (
        <>
          <Menu />
          <AppRouter />
        </>
      )}
    </>
  );
}
