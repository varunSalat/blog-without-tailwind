import { Outlet } from "react-router-dom";
import { Footer, ScrollToTopBtn } from "..";

const Navbar = () => {
  return (
    <>
      <div>Navbar</div>
      <ScrollToTopBtn />
      <Outlet />
      <Footer />
    </>
  );
};

export default Navbar;
