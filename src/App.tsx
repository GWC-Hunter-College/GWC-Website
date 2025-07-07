import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Initiatives from './pages/initiatives/Initiatives';
import Events from './pages/events/Events';
import Membership from './pages/membership/Membership';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/initiatives" element={<Initiatives />} />
        <Route path="/events" element={<Events />} />
        <Route path="/membership" element={<Membership />} />
      </Routes>
    </Router>
  );
}

export default App;