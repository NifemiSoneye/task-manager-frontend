import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const DashNav = () => {
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
        >
          <img
            src={menuIcon}
            alt="hamburger icon"
            className="lg:hidden cursor-pointer h-4 w-4"
          />
        </Button>
        <p className="text-white">My Boards</p>
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
