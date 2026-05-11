import { useGetAnalyticsQuery } from "@/features/analytics/analyticsApiSlice";
import { useGetAllBoardsQuery } from "@/features/boards/boardApiSlice";
import { useSelector } from "react-redux";
import { selectAllBoards } from "@/features/boards/boardApiSlice";
import BoardsList from "./BoardsList";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCreateBoardMutation } from "@/features/boards/boardApiSlice";
import { LoaderCircle } from "lucide-react";
import { selectSearch } from "@/features/ui/searchSlice";
import SearchBar from "@/components/common/SearchBar";
const DashBoard = () => {
  const [createBoard, { isLoading: isBoardLoading }] = useCreateBoardMutation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [boardName, setBoardName] = useState<string>("");
  const [errMsg, setErrMsg] = useState("");
  const { data: analytics, isLoading: analyticsLoading } =
    useGetAnalyticsQuery(undefined);
  const { isLoading, isError } = useGetAllBoardsQuery(undefined);
  const allBoards = useSelector(selectAllBoards);
  const search = useSelector(selectSearch);
  const errRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setErrMsg("");
  }, [boardName]);
  const handleCreate = async (boardName: string) => {
    try {
      await createBoard({ title: boardName }).unwrap();
      setBoardName("");
      setIsOpen(false);
    } catch (err: any) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("All fields are required");
      } else if (err.status === 409) {
        setErrMsg("Duplicate Title");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef?.current?.focus();
    }
  };
  const searchResults =
    allBoards?.filter((board) =>
      board.title.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];
  if (analyticsLoading || isLoading)
    return (
      <div className="fixed inset-0 z-50 bg-[#0B1628]">
        <div className="w-full h-dvh grid place-content-center">
          <LoaderCircle className="h-48 w-48 animate-spin text-white" />
        </div>
      </div>
    );

  return (
    <div className="p-5">
      <section className=" grid grid-cols-2 gap-2 mb-3 lg:grid-cols-4">
        <div className="bg-[#132040] p-4 rounded-md">
          <div className="text-[1.1rem] mb-3">📁</div>
          <div className="text-white text-[1.5rem]">
            {analytics?.totalBoards}
          </div>
          <p className="text-xs text-[#8A93A8] uppercase text-nowrap font-semibold">
            Total Boards
          </p>
        </div>
        <div className="bg-[#132040] p-4 rounded-md">
          <div className="text-[1.1rem] mb-3">✅</div>
          <div className="text-white text-[1.5rem]">{analytics?.tasksDone}</div>
          <p className="text-xs text-[#8A93A8] uppercase text-nowrap">
            Tasks Done
          </p>
        </div>
        <div className="bg-[#132040] p-4 rounded-md">
          <div className="text-[1.1rem] mb-3">⌛</div>
          <div className="text-white text-[1.5rem]">
            {analytics?.inProgress}
          </div>
          <p className="text-xs text-[#8A93A8] uppercase text-nowrap font-semibold">
            In progress
          </p>
        </div>
        <div className="bg-[#132040] p-4 rounded-md">
          <div className="text-[1.1rem] mb-3">📁</div>
          <div className="text-white text-[1.5rem]">{analytics?.toDo}</div>
          <p className="text-xs text-[#8A93A8] uppercase text-nowrap font-semibold">
            To Do
          </p>
        </div>
      </section>
      <div className="flex justify-between items-center">
        <h2 className="text-white my-5 ">All Boards</h2>
        <div className="lg:hidden">
          <SearchBar />
        </div>
      </div>

      <section className="grid grid-cols-1 gap-3 lg:grid-cols-4">
        {searchResults.length > 0 ? (
          searchResults.map((board, index) => (
            <BoardsList key={board.id} board={board} index={index} />
          ))
        ) : (
          <p className="text-white my-5">No board found</p>
        )}
        {search ? null : (
          <div className="bg-transparent border border-dashed border-[#C9A84C]  rounded-md flex items-center justify-center  flex-col min-h-55">
            <div className="bg-[#23252b] h-11 w-11 rounded-full flex items-center justify-center text-xl">
              <Button
                type="button"
                variant="default"
                title="Create new board"
                onClick={() => setIsOpen(true)}
                className="bg-transparent cursor-pointer"
              >
                ➕
              </Button>
            </div>
            <p className="text-[#8A93A8] text-sm">Create new board</p>
          </div>
        )}
      </section>

      {isOpen && (
        <>
          {/* overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* modal - bottom sheet on mobile, centered on desktop */}
          <div
            className="fixed z-50
      bottom-0 left-0 right-0 rounded-t-2xl
      md:bottom-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:w-105
      bg-[#132040] p-6 animate-in slide-in-from-bottom md:slide-in-from-bottom-0 duration-300"
          >
            <div
              className={
                errMsg
                  ? "bg-red-200 px-4 py-2 my-2 rounded-lg  text-red-500"
                  : "hidden"
              }
              ref={errRef}
            >
              🚨 {errMsg}
            </div>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-white font-['Playfair_Display_Variable'] font-semibold text-lg">
                Create Board
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#8A93A8] hover:text-white"
              >
                ✕
              </button>
            </div>
            <Label
              htmlFor="board-name"
              className="text-[#8A93A8] text-xs uppercase tracking-wider mb-2 block"
            >
              Board Name
            </Label>
            <Input
              className="w-full bg-[#0B1628] text-white border border-white/10 rounded-md p-5 focus:outline-none focus:border-[#C9A84C]"
              placeholder="e.g. Product Roadmap"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
            />

            <div className="flex gap-3 mt-5">
              <Button
                type="button"
                variant="default"
                title="Cancel"
                onClick={() => setIsOpen(false)}
                className="flex-1 border border-white/10 text-[#8A93A8] rounded-md py-2 text-sm"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="default"
                title="Create new board"
                onClick={() => handleCreate(boardName)}
                className="flex-1 bg-[#C9A84C] text-black font-semibold rounded-md py-2 text-sm"
              >
                {isBoardLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Create Board"
                )}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashBoard;
