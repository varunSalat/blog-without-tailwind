import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { Footer, ScrollToTopBtn } from "..";
import { logo } from "../../assets";
import SearchIcon from "@mui/icons-material/Search";
import { useCallback, useEffect, useState } from "react";
import qs from "query-string";
const Navbar = () => {
  const [search, setSearch] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const router = useNavigate();

  const handleSearch = useCallback(
    (e) => {
      setNavOpen(false);
      e.preventDefault();
      let q = {};

      if (searchParams) {
        q = qs.parse(searchParams.toString());
      }

      const updatedQuery = {
        ...q,
        s: search,
      };

      if (searchParams?.get("s") == "") {
        delete updatedQuery.s;
      }
      const url = qs.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        { skipNull: true }
      );

      router(url);
    },
    [router, search, searchParams]
  );

  useEffect(() => {
    navOpen
      ? (document.querySelector("body").style.overflowY = "hidden")
      : (document.querySelector("body").style.overflowY = "scroll");
  }, [navOpen]);

  const handleNavOpen = () => {
    window.history.pushState(
      {
        id: 1,
      },
      null,
      null
    );
    setNavOpen(true);
  };
  window.addEventListener("popstate", () => {
    setNavOpen(false);
    document.querySelector("body").style.overflowY = "scroll";
  });

  return (
    <>
      <header className="header flex">
        <Link to={"/"} className="logo_link">
          <img src={logo} alt="scholarwithtech" />
        </Link>
        <nav className={navOpen ? "nav flex active" : "nav flex"}>
          <div className="nav_search_container flex">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                className="nav_search_input"
                placeholder="Search you're favorite article!"
                onChange={(v) => setSearch(v.target.value)}
                value={search}
              />
            </form>
            <SearchIcon className="search_icon" onClick={handleSearch} />
          </div>
          <div>
            <h3 className="hot_topic_text">Hot Topic</h3>
            <div className="filter_btn_container flex">
              <button className="filter_btn">Finance</button>
              <button className="filter_btn">Education</button>
              <button className="filter_btn">Tech</button>
              <button className="filter_btn">Other</button>
            </div>
          </div>
        </nav>
        <div
          className={navOpen ? "burger_container active" : "burger_container"}
          onClick={() => setNavOpen(!navOpen)}
        >
          <i></i>
          <i></i>
          <i></i>
        </div>
      </header>
      <ScrollToTopBtn />
      <Outlet />
      <Footer />
    </>
  );
};

export default Navbar;
