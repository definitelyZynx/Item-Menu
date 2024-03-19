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
import { useEffect, useState } from "react";
import useDesktopRange from "./hooks/useDesktopRange";
import NoPage from "./pages/NoPage/NoPage";
import { auth } from "./config/Firebase";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./components/ui/dialog";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { signInWithEmailPassword } from "./helper/DbFunctions";

function App() {
  const isDesktop = useDesktopRange();
  const [isOpen, setIsOpen] = useState(false);
  const [loginDetail, setLoginDetails] = useState({
    email: '',
    password: ''
  })

  const [isAuthenticated, setIsAuthenticated] = useState(auth.currentUser ? false : true);

  const toggleSideNavigation = () => {
    setIsOpen(!isOpen);
  }

  const signIn = async () => {
    try {
      await signInWithEmailPassword(loginDetail.email, loginDetail.password);
      console.log("User signed in successfully!");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  }

  useEffect(() => {
    setIsOpen(isDesktop ? true : false);
  }, [isDesktop])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      if(auth.currentUser){
        setIsAuthenticated(true);
      }
      else{
        setIsAuthenticated(false);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <Router>
      <Dialog open={!isAuthenticated}>
        <DialogContent className="max-w-[450px]">
          <DialogHeader>
            <DialogTitle>You are not authenticated.</DialogTitle>
            <DialogDescription>Please sign in to continue.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col w-full gap-1">
            <div className="w-full flex-col">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="utak_admin@utak.ph"
                value={loginDetail.email}
                onChange={(e) =>
                  setLoginDetails((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div className="w-full flex-col">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="admin_utak123."
                value={loginDetail.password}
                onChange={(e) =>
                  setLoginDetails((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter className="flex flex-col md:flex-row gap-2 md:gap-0">
            <Button type="button" onClick={() => signIn()}>Sign In</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="main w-full h-full">
        <section className="w-full h-full flex">
          <NavigationBar
            isOpen={isOpen}
            toggleSideNavigation={toggleSideNavigation}
          />
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
