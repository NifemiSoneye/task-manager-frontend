import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSidebarOpen,
  toggleSidebar,
  closeSidebar,
} from "@/features/ui/uiSlice";
import useAuth from "@/hooks/useAuth";
const DashNav = () => {
  const isOpen = useSelector(selectSidebarOpen);
  const { username } = useAuth();
  // dispatch actions
  const dispatch = useDispatch();

  const openSideBar = () => {
    dispatch(toggleSidebar());
  };

  const menuIcon = new URL("../../assets/icon-hamburger.svg", import.meta.url)
    .href;
  return (
    <div className="bg-[#0B1628]/60 flex justify-between p-3 border-b border-b-[#292c33] ">
      <div className="flex items-center">
        <Button
          type="button"
          variant="default"
          title="Sidebar"
          className="bg-transparent"
          onClick={openSideBar}
        >
          <img
            src={menuIcon}
            alt="hamburger icon"
            className="lg:hidden cursor-pointer h-4 w-4"
          />
        </Button>
        <div>
          <p className="text-white">My Boards</p>
          <p className="text-[0.8rem] mt-[0.15rem] text-[#8A93A8] hidden lg:block">
            Welcome back, {username}
          </p>
        </div>
      </div>
      <Button
        type="button"
        variant="default"
        title="Sidebar"
        className="bg-transparent"
      >
        <FontAwesomeIcon icon={faRightFromBracket} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default DashNav;
