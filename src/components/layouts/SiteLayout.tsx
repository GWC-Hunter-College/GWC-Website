import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import RouteMetadata from "../seo/RouteMetadata";

const SiteLayout = () => {
  return (
    <div>
      <RouteMetadata />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
