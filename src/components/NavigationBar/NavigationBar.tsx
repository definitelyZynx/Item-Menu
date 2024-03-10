import React from "react";
import { CgNotes } from "react-icons/cg";
import { GrCircleQuestion } from "react-icons/gr";
import {
  LuBarChartBig,
  LuLayoutDashboard,
  LuLayoutList,
  LuPackage2,
  LuSettings,
  LuUsers,
} from "react-icons/lu";
import { TbMoneybag } from "react-icons/tb";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <section className="fixed px-5 h-full hidden md:min-w-[270px] md:w-[270px] justify-between text-white border-r bg-[#101727] border-slate-200 md:flex md:flex-col">
      <div className="h-[80px] flex items-center gap-3 py-3">
        <img src="/utak_logo.svg" className="h-[48px]" />
        <div className="flex items-end">
          <p className="text-3xl font-semibold">UTAK</p>
          <p className="text-xl font-semibold">POS</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between pt-4 xl:pt-6 pb-4">
        <div className="flex flex-col gap-7 ">
          <div className="flex flex-col gap-2">
            <p className="m-0 text-xs font-bold ">ANALYTICS</p>

            <Link
              to={"/dashboard"}
              className="flex gap-3 w-full items-center px-3 py-2 rounded-sm hover:bg-white/10"
            >
              <LuLayoutDashboard className="" size={22} />
              <p className="font-medium text-[15px]">Dashboard</p>
            </Link>

            <button className="flex gap-3 w-full items-center px-3 py-2 rounded-sm hover:bg-white/10">
              <LuBarChartBig className="" size={22} />
              <p className="font-medium text-[15px]">Reports</p>
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <p className="m-0 text-xs font-bold ">RESOURCE</p>

            <Link
              to={"/items"}
              className="flex gap-3 w-full items-center px-3 py-2 rounded-sm hover:bg-white/10 active:bg-white/10"
            >
              <LuLayoutList className="" size={22} />
              <p className="font-medium text-[15px]">Items</p>
            </Link>

            <button className="flex gap-3 w-full items-center px-3 py-2 rounded-sm hover:bg-white/10">
              <LuPackage2 className="" size={22} />
              <p className="font-medium text-[15px]">Inventory</p>
            </button>

            <button className="flex gap-3 w-full items-center px-3 py-2 rounded-sm hover:bg-white/10">
              <LuUsers className="" size={22} />
              <p className="font-medium text-[15px]">Staff</p>
            </button>

            <button className="flex gap-3 w-full items-center px-3 py-2 rounded-sm hover:bg-white/10">
              <GrCircleQuestion className="" size={22} />
              <p className="font-medium text-[15px]">Help</p>
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <p className="m-0 text-xs font-bold ">FINANCE</p>

            <button className="flex gap-3 w-full items-center px-3 py-2 rounded-sm hover:bg-white/10">
              <CgNotes className="" size={21} />
              <p className="font-medium text-[15px]">Transactions</p>
            </button>

            <button className="flex gap-3 w-full items-center px-3 py-2 rounded-sm hover:bg-white/10">
              <TbMoneybag className="" size={22} />
              <p className="font-medium text-[15px]">Cash Drawer</p>
            </button>
          </div>
        </div>

        <button className="flex gap-3 w-full items-center px-3 py-2 rounded-sm hover:bg-white/10">
          <LuSettings className="" size={22} />
          <p className="font-medium text-[15px]">Settings</p>
        </button>
      </div>

      <div className="h-[90px] flex">
        <div className="border-t border-slate-700 flex flex-1 gap-2 py-2 items-center">
          <img
            src="/img/avatar.png"
            className="aspect-square object-cover h-[50px] rounded-full"
          />
          <div className="h-full flex-1 flex flex-col justify-center">
            <p className="font-semibold text-sm">Jhoemer Muyco</p>
            <p className="text-[11px] truncate max-w-[170px]">
              muyco.jhoemer1@gmail.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavigationBar;
