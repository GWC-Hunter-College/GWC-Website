import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import NavbarLayout from './components/layouts/NavbarLayout';
import HeroLayout from './components/layouts/HeroLayout';

// Pages
import Home from "./pages/home/Home";
import Initiatives from './pages/initiatives/Initiatives';
import Events from './pages/events/Events';
import Membership from './pages/membership/Membership';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NavbarLayout />}>
        
          {/* Remember that anything you don't want to show the hero on should not be wrapped in HeroLayout */}
          <Route element={<HeroLayout />}>
            <Route index element={<Home />} />
            <Route path="/initiatives" element={<Initiatives />} />
            <Route path="/membership" element={<Membership />} />
          </Route>

          <Route path="/events" element={<Events />} />
        
        </Route>
      </Routes>
    </Router>
  );
}

export default App;