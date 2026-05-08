import { useSelector, useDispatch } from "react-redux";
import {
  selectSidebarOpen,
  toggleSidebar,
  closeSidebar,
} from "@/features/ui/uiSlice";
import { useGetAllBoardsQuery } from "@/features/boards/boardApiSlice";

import { selectAllBoards } from "@/features/boards/boardApiSlice";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
// read state

const getInitials = (fullName: string): string => {
  // Trim leading/trailing spaces and split the string by one or more spaces
  const namesArray = fullName.trim().split(/\s+/);

  if (namesArray.length === 0) {
    return "";
  }

  // Get the first initial
  let initials = namesArray[0].charAt(0).toUpperCase();

  // If there is more than one name, get the last initial
  if (namesArray.length > 1) {
    initials += namesArray[namesArray.length - 1].charAt(0).toUpperCase();
  }

  return initials;
};

const dotColors = [
  "#C9A84C", // gold
  "#6366f1", // indigo
  "#22c55e", // green
  "#f59e0b", // amber
  "#ec4899", // pink
  "#14b8a6", // teal
  "#8b5cf6", // violet
  "#f97316", // orange
  "#06b6d4", // cyan
  "#ef4444", // red
];

const getDotColor = (index: number) => dotColors[index % dotColors.length];

const SideBar = () => {
  const { username } = useAuth();
  const isOpen = useSelector(selectSidebarOpen);
  const dispatch = useDispatch();

  const { isLoading, isError } = useGetAllBoardsQuery(undefined);
  const allBoards = useSelector(selectAllBoards);

  const navigate = useNavigate();

  return (
    <>
      {/* overlay - mobile only, outside the aside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => dispatch(closeSidebar())}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 h-full w-55 bg-[#132040] z-50
          transition-transform duration-300 min-h-screen flex flex-col justify-between overflow-hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:z-auto lg:sticky lg:top-0 lg:h-screen
        `}
      >
        <div>
          <div className="p-6 border-b border-b-[#292c33]">
            <p className="text-white text-2xl font-['Playfair_Display_Variable']">
              <span className="text-[#C9A84C]">Task</span>Flow
            </p>
          </div>

          <section className="text-xs text-[#8A93A8] p-6  font-semibold mb-5">
            <p className="uppercase">Menu</p>

            <section>
              <div className="flex items-center gap-3 text-[0.875rem] font-semibold cursor-pointer mb-0.5 py-[0.6rem] px-3 ">
                <div className="text-[1rem] w-5">⊞</div>
                <p>Dashboard</p>
              </div>
              <div className="flex items-center gap-3 text-[0.875rem] font-semibold cursor-pointer mb-0.5 py-[0.6rem] px-3">
                <div className="text-[1rem] w-5">★</div>
                <p>Favourites</p>
              </div>
            </section>
          </section>

          <section className="text-xs text-[#8A93A8] p-6  font-semibold mb-5">
            <p className="uppercase">Recent Boards</p>
            <section className="grid grid-cols-1 gap-3 mt-5 ">
              {allBoards.map((board, index) => (
                <section>
                  <div
                    className="flex items-center gap-2 hover:bg-background/10 rounded-md p-1 cursor-pointer group"
                    onClick={() => navigate(`/boards/${board.id}`)}
                  >
                    <div
                      className="w-2 h-2 rounded-[50%]"
                      style={{ background: getDotColor(index) }}
                    ></div>
                    <p className="group-hover:text-white">{board.title}</p>
                  </div>
                </section>
              ))}
            </section>
          </section>
        </div>
        <div className="p-6 border-t border-t-[#292c33] text-white uppercase text-sm font-semibold flex items-center gap-3  ">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#C9A84C,#1E3160)] text-black shrink-0">
            {getInitials(username as string)}
          </div>
          <p>{username}</p>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
