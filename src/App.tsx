import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Header from "./components/Header/Header";
import Items from "./pages/Items/Items";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
    return (
        <>
            <BrowserRouter>
                <div className="main w-full h-full">
                    <section className="w-full h-full flex">
                        <NavigationBar />
                        <section className="content flex flex-col flex-1 h-full">
                            <Header />

                            {/* Main - Routes */}
                            <div className="flex-1 mt-[80px] md:ml-[270px]">
                              <Routes>
                                <Route path="/dashboard" element={<Dashboard />} />
                                  <Route path="/items" element={<Items />} />
                              </Routes>
                            </div>
                        </section>
                    </section>
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
