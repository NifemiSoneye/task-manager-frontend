import { Outlet } from "react-router-dom";
import DashNav from "@/components/common/DashNav";
import SideBar from "./SideBar";

const DashBoardLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#0B1628]">
      <SideBar />
      <div className="flex-1 ">
        <DashNav />
        <Outlet /> {/* or children */}
      </div>
    </div>
  );
};

export default DashBoardLayout;
