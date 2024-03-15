import { getCurrentPage } from "@/helper/NavigationFunctions";
import { LuMenu } from "react-icons/lu";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  toggleSideNavigation: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSideNavigation }) => {
  const location = useLocation();
  
  return (
      <header className="sticky w-full top-0 left-0 z-[30]">
          <section className="flex h-[80px] items-center justify-between py-3 px-4 bg-white border-b border-slate-200">
            <div className="flex gap-4">
              <button className="flex justify-center items-center" onClick={() => toggleSideNavigation()}>
                <LuMenu size={21} />
              </button>
              <h1 className="text-2xl font-bold">{getCurrentPage(location)}</h1>
            </div>
          </section>
      </header>
  );
};

export default Header;
