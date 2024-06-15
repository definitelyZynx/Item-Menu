import { getCurrentPage } from "@/helper/NavigationFunctions";
import useDesktopRange from "@/hooks/useDesktopRange";
import { CgNotes } from "react-icons/cg";
import { GrCircleQuestion } from "react-icons/gr";
import {
  LuBarChartBig,
  LuLayoutDashboard,
  LuLayoutList,
  LuMenu,
  LuPackage2,
  LuSettings,
  LuUsers,
} from "react-icons/lu";
import { TbMoneybag } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";

interface NavProps {
  isOpen: boolean;
  toggleSideNavigation: () => void;
}

const NavigationBar: React.FC<NavProps> = ({
  isOpen,
  toggleSideNavigation,
}) => {
  const location = useLocation();
  const isDesktop = useDesktopRange();
  return (
    <section
      className={`z-50 fixed md:sticky px-5 h-full transition-all ${
        isOpen
          ? `left-0 w-full md:min-w-[270px] md:w-[270px] flex flex-col`
          : `left-[-200px] md:left-0 md:min-w-[100px] md:w-[110px] md:flex md:flex-col`
      } justify-between text-white border-r bg-[#101727] border-slate-200 `}
    >
      <div
        className={`h-[80px] flex items-center justify-between gap-3 py-3 transition-all ${
          !isOpen && `ml-2`
        }`}
      >
        <div className="flex items-center gap-3">
          <img src="/logo.svg" className="h-[48px]" />
          {isOpen && (
            <div className="flex items-end">
              <p className="text-3xl font-semibold">Jumpstart</p>
              {/* <p className="text-xl font-semibold">POS</p> */}
            </div>
          )}
        </div>
        {!isDesktop && (
          <button
            className="flex justify-center items-center"
            onClick={() => toggleSideNavigation()}
          >
            <LuMenu size={21} />
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between pt-4 xl:pt-6 pb-4">
        <div className="flex flex-col gap-2 md:gap-7">
          <div className={`flex flex-col gap-2`}>
            <p className="m-0 text-xs font-bold w-fit">ANALYTICS</p>

            <Link
              to={"/dashboard"}
              className={`flex gap-3 transition-all ${
                isOpen ? `w-full` : `w-fit ml-2`
              } items-center px-3 py-2 rounded-sm hover:bg-white/10 ${
                getCurrentPage(location) === "Dashboard" && `bg-white/10`
              }`}
              onClick={!isDesktop ? () => toggleSideNavigation() : undefined}
            >
              <div>
                <LuLayoutDashboard className="" size={22} />
              </div>
              {isOpen && (
                <p className="font-medium text-[15px] transition-all">
                  Dashboard
                </p>
              )}
            </Link>

            <Link
              to={"/reports"}
              className={`flex gap-3 transition-all ${
                isOpen ? `w-full` : `w-fit ml-2`
              } items-center px-3 py-2 rounded-sm hover:bg-white/10 ${
                getCurrentPage(location) === "Reports" && `bg-white/10`
              }`}
              onClick={!isDesktop ? () => toggleSideNavigation() : undefined}
            >
              <div>
                <LuBarChartBig className="" size={22} />
              </div>
              {isOpen && (
                <p className="font-medium text-[15px] transition-all">
                  Reports
                </p>
              )}
            </Link>
          </div>

          <div className={`flex flex-col gap-2`}>
            <p className="m-0 text-xs font-bold w-fit">RESOURCE</p>

            <Link
              to={"/items"}
              className={`flex gap-3 transition-all ${
                isOpen ? `w-full` : `w-fit ml-2`
              } items-center px-3 py-2 rounded-sm hover:bg-white/10 ${
                getCurrentPage(location) === "Items" && `bg-white/10`
              }`}
              onClick={!isDesktop ? () => toggleSideNavigation() : undefined}
            >
              <div>
                <LuLayoutList className="" size={22} />
              </div>
              {isOpen && (
                <p className="font-medium text-[15px] transition-all">Items</p>
              )}
            </Link>

            <Link
              to={"/inventory"}
              className={`flex gap-3 transition-all ${
                isOpen ? `w-full` : `w-fit ml-2`
              } items-center px-3 py-2 rounded-sm hover:bg-white/10 ${
                getCurrentPage(location) === "Inventory" && `bg-white/10`
              }`}
              onClick={!isDesktop ? () => toggleSideNavigation() : undefined}
            >
              <div>
                <LuPackage2 className="" size={22} />
              </div>
              {isOpen && (
                <p className="font-medium text-[15px] transition-all">
                  Inventory
                </p>
              )}
            </Link>

            <Link
              to={"/staff"}
              className={`flex gap-3 transition-all ${
                isOpen ? `w-full` : `w-fit ml-2`
              } items-center px-3 py-2 rounded-sm hover:bg-white/10 ${
                getCurrentPage(location) === "Staff" && `bg-white/10`
              }`}
              onClick={!isDesktop ? () => toggleSideNavigation() : undefined}
            >
              <div>
                <LuUsers className="" size={22} />
              </div>
              {isOpen && (
                <p className="font-medium text-[15px] transition-all">Staff</p>
              )}
            </Link>

            <Link
              to={"/help"}
              className={`flex gap-3 transition-all ${
                isOpen ? `w-full` : `w-fit ml-2`
              } items-center px-3 py-2 rounded-sm hover:bg-white/10 ${
                getCurrentPage(location) === "Help" && `bg-white/10`
              }`}
              onClick={!isDesktop ? () => toggleSideNavigation() : undefined}
            >
              <div>
                <GrCircleQuestion className="" size={22} />
              </div>
              {isOpen && (
                <p className="font-medium text-[15px] transition-all">Help</p>
              )}
            </Link>
          </div>

          <div className={`flex flex-col gap-2`}>
            <p
              className={`m-0 text-xs font-bold w-fit transition-all ${
                !isOpen && `pl-1`
              }`}
            >
              FINANCE
            </p>

            <Link
              to={"/transactions"}
              className={`flex gap-3 transition-all ${
                isOpen ? `w-full` : `w-fit ml-2`
              } items-center px-3 py-2 rounded-sm hover:bg-white/10 ${
                getCurrentPage(location) === "Transactions" && `bg-white/10`
              }`}
              onClick={!isDesktop ? () => toggleSideNavigation() : undefined}
            >
              <div>
                <CgNotes className="" size={21} />
              </div>
              {isOpen && (
                <p className="font-medium text-[15px] transition-all">
                  Transactions
                </p>
              )}
            </Link>

            <Link
              to={"/cashdrawer"}
              className={`flex gap-3 transition-all ${
                isOpen ? `w-full` : `w-fit ml-2`
              } items-center px-3 py-2 rounded-sm hover:bg-white/10 ${
                getCurrentPage(location) === "Cash Drawer" && `bg-white/10`
              }`}
              onClick={!isDesktop ? () => toggleSideNavigation() : undefined}
            >
              <div>
                <TbMoneybag className="" size={21} />
              </div>
              {isOpen && (
                <p className="font-medium text-[15px] transition-all truncate">
                  Cash Drawer
                </p>
              )}
            </Link>
          </div>
        </div>

        <Link
          to={"/settings"}
          className={`flex gap-3 transition-all ${
            isOpen ? `w-full` : `w-fit ml-2`
          } items-center px-3 py-2 rounded-sm hover:bg-white/10 ${
            getCurrentPage(location) === "Settings" && `bg-white/10`
          }`}
          onClick={!isDesktop ? () => toggleSideNavigation() : undefined}
        >
          <div>
            <LuSettings className="" size={22} />
          </div>
          {isOpen && (
            <p className="font-medium text-[15px] transition-all">Settings</p>
          )}
        </Link>
      </div>

      <div className="h-[90px] flex">
        <div className="border-t border-slate-700 flex flex-1 gap-2 py-2 items-center">
          <img
            src="/img/avatar.png"
            className={`aspect-square object-cover h-[50px] rounded-full transition-all ${
              !isOpen && `ml-2`
            }`}
          />
          {isOpen && (
            <div className="h-full flex-1 flex flex-col justify-center">
              <p className="font-semibold text-sm">Jhoemer Muyco</p>
              <p className="text-[11px] truncate max-w-[170px]">
                muyco.jhoemer1@gmail.com
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NavigationBar;
