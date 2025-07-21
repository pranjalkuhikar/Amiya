import AppRouter from "../router/AppRouter";
import Menu from "../components/Menu";

export default function MainLayout() {
  return (
    <>
      <>
        <Menu />
        <AppRouter />
      </>
    </>
  );
}
