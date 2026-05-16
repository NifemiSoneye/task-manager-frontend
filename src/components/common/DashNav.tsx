import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { selectSidebarOpen, toggleSidebar } from "@/features/ui/uiSlice";
import useAuth from "@/hooks/useAuth";
import SearchBar from "./SearchBar";
import { useParams } from "react-router-dom";
import { useGetBoardQuery } from "@/features/boards/boardApiSlice";
import { useSendLogoutMutation } from "@/features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
const DashNav = () => {
  const isOpen = useSelector(selectSidebarOpen);
  const { username } = useAuth();
  // dispatch actions
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data: board } = useGetBoardQuery(id!, {
    skip: !id,
  });
  const [sendLogout, { isLoading }] = useSendLogoutMutation();

  const flipSideBar = () => {
    dispatch(toggleSidebar());
  };

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await sendLogout(undefined).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const menuIcon = new URL("../../assets/icon-hamburger.svg", import.meta.url)
    .href;
  return (
    <div
      className={`bg-[#0B1628]/60 flex justify-between py-2 lg:px-5 px-3 border-b border-b-[#292c33]   ${
        id ? "bg-[#132040] border-l border-l-[#292c33]" : ""
      }`}
    >
      <div className="flex items-center">
        <Button
          type="button"
          variant="default"
          title="Sidebar"
          className="bg-transparent lg:hidden"
          onClick={flipSideBar}
        >
          <img
            src={menuIcon}
            alt="hamburger icon"
            className="cursor-pointer h-4 w-4"
          />
        </Button>
        <div>
          {id ? (
            <p className="text-white text-lg font-['Playfair_Display_Variable']">
              {board?.title}
            </p>
          ) : (
            <>
              <p className="text-white font-['Playfair_Display_Variable']">
                My Boards
              </p>
              <p className="text-[0.8rem] mt-[0.15rem] text-[#8A93A8] hidden lg:block">
                Welcome back, {username}
              </p>{" "}
            </>
          )}
        </div>
      </div>
      <div className="flex items-center mr-6">
        <div className={`hidden lg:block ${id ? "lg:hidden" : null}`}>
          <SearchBar />
        </div>

        {isLoading ? (
          <LoaderCircle className="animate-spin text-white" />
        ) : (
          <Button
            type="button"
            variant="default"
            title="Sidebar"
            className="bg-[#C9A84C] text-black lg:m-3 lg:p-5 rounded-sm transition-all duration-300 sm:max-w-[10vw] px-5  hover:border-[#E2C47A] hover:bg-[#E2C47A] hover:shadow-[0_0_10px_rgba(226,196,122,1.0)] transform hover:-translate-y-px"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default DashNav;
