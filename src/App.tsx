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
import { useState } from "react";
import useDesktopRange from "./hooks/useDesktopRange";
import NoPage from "./pages/NoPage/NoPage";

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

                <Route path="/dashboard" element={<NoPage />} />
                <Route path="/reports" element={<NoPage />} />

                <Route path="/items" element={<Items />} />
                <Route path="/inventory" element={<NoPage />} />
                <Route path="/staff" element={<NoPage />} />
                <Route path="/help" element={<NoPage />} />

                <Route path="/transactions" element={<NoPage />} />
                <Route path="/cashdrawer" element={<NoPage />} />

                <Route path="/settings" element={<NoPage />} />
              </Routes>
            </div>
          </section>
        </section>
      </div>
    </Router>
  );
}

export default App;
