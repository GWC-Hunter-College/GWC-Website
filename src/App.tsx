import { BrowserRouter, Route, Routes } from "react-router-dom";
import SiteLayout from "./components/layouts/SiteLayout";
import Home from "./pages/home/Home";
import Initiatives from "./pages/initiatives/Initiatives";
import Events from "./pages/events/Events";
import Membership from "./pages/membership/Membership";
import NotFound from "./pages/not-found/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="initiatives" element={<Initiatives />} />
          <Route path="membership" element={<Membership />} />
          <Route path="events" element={<Events />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
