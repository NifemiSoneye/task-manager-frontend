import { useSelector, useDispatch } from "react-redux";
import {
  selectSidebarOpen,
  toggleSidebar,
  closeSidebar,
} from "@/features/ui/uiSlice";
import { useGetAllBoardsQuery } from "@/features/boards/boardApiSlice";

import { selectAllBoards } from "@/features/boards/boardApiSlice";

// read state

const SideBar = () => {
  const isOpen = useSelector(selectSidebarOpen);
  const dispatch = useDispatch();

  const { isLoading, isError } = useGetAllBoardsQuery(undefined);
  const allBoards = useSelector(selectAllBoards);
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
          fixed left-0 top-0 h-full w-60 bg-[#132040] z-50
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        <div className="p-6 border-b border-b-[#292c33]">
          <p className="text-white text-2xl font-['Playfair_Display_Variable']">
            <span className="text-[#C9A84C]">Task</span>Flow
          </p>
        </div>

        <section className="text-xs text-[#8A93A8] p-6 uppercase font-semibold mb-5">
          <p>Menu</p>

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

        <section className="text-xs text-[#8A93A8] p-6 uppercase font-semibold mb-5">
          Recent Boards
        </section>
      </aside>
    </>
  );
};

export default SideBar;
