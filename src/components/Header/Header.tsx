import { LuMenu } from "react-icons/lu";
import { useLocation } from "react-router-dom";

interface IPageType {
  [key: string]: string;
}

const Header = () => {
  const location = useLocation();

  const pageTitles: IPageType = {
    '/': 'Dashboard',
    '/dashboard': 'Dashboard',
    '/items': 'Items'
  }

  const getCurrentPage = () =>{
    const path = location.pathname;

    return pageTitles[path];
  }
  
  return (
      <header className="fixed w-full md:ml-[270px] top-0 left-0 z-[30]">
          <section className="flex h-[80px] items-center justify-between py-3 px-4 bg-white border-b border-slate-200">
            <div className="flex gap-4">
              <button className="flex justify-center items-center">
                <LuMenu size={21} />
              </button>
              <h1 className="text-2xl font-bold">{getCurrentPage()}</h1>
            </div>
          </section>
      </header>
  );
};

export default Header;
