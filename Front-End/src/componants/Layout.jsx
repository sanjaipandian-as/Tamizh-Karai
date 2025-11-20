import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  const location = useLocation();

  const hideFooterPaths = ["/Login-page", "/Signup-page", "/API/Tamizhkarai/Admin-Dashboard", "/user-dashboard","/community-picks"];
  const hideFooter = hideFooterPaths.includes(location.pathname);
  const hideNavbarPaths = ["/API/Tamizhkarai/Admin-Dashboard", "/user-dashboard"];
  const hideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}   
      <main>{children}</main>
      {!hideFooter && <Footer />}   
    </>
  );
}
