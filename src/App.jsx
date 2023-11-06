import Navbar from "./components/general/Navbar";
import "./styles/main.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Suspense } from "react";

// !LOADER
import { PrimaryLoader } from "./components";
// !PAGES
import Listing from "./pages/Listing";
import Article from "./pages/Article";
import TermsCondition from "./pages/TermsCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route index element={<Listing />} />
        <Route
          path="/a/:blogUrl"
          element={
            <Suspense fallback={<PrimaryLoader />}>
              <Article />
            </Suspense>
          }
        />
        <Route
          path="/term-condition"
          element={
            <Suspense fallback={<PrimaryLoader />}>
              <TermsCondition />
            </Suspense>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <Suspense fallback={<PrimaryLoader />}>
              <PrivacyPolicy />
            </Suspense>
          }
        />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
