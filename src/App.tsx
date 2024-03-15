import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Header from "./components/Header/Header";
import Items from "./pages/Items/Items";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useState } from "react";
import useDesktopRange from "./hooks/useDesktopRange";

function App() {
  const isDesktop = useDesktopRange();
  const [isOpen, setIsOpen] = useState(isDesktop ? true : false);

  const toggleSideNavigation = () => {
    setIsOpen(!isOpen);
  }

  return (
    <Router>
      <div className="main w-full h-full">
        <section className="w-full h-full flex">
          <NavigationBar isOpen={isOpen} toggleSideNavigation={toggleSideNavigation} />
          <section className="content flex flex-col flex-1 h-full">
            <Header toggleSideNavigation={toggleSideNavigation} />

            {/* Main - Routes */}
            <div className="flex-1 overflow-y-auto">
              <Routes>
                {/* Navigate to Item List as Default */}
                <Route path="/" element={<Navigate to="/items" replace />} />

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/items" element={<Items />} />
              </Routes>
            </div>
          </section>
        </section>
      </div>
    </Router>
  );
}

export default App;
