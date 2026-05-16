import { useGetAnalyticsQuery } from "@/features/analytics/analyticsApiSlice";
import { useGetAllBoardsQuery } from "@/features/boards/boardApiSlice";
import { useSelector } from "react-redux";
import BoardsList from "./BoardsList";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCreateBoardMutation } from "@/features/boards/boardApiSlice";
import { LoaderCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { selectSearch } from "@/features/ui/searchSlice";
import SearchBar from "@/components/common/SearchBar";
import DashNav from "@/components/common/DashNav";
import { useToast } from "@/hooks/use-toast";
const DashBoard = () => {
  const [createBoard, { isLoading: isBoardLoading }] = useCreateBoardMutation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [boardName, setBoardName] = useState<string>("");
  const [errMsg, setErrMsg] = useState("");
  const [page, setPage] = useState(1);
  const search = useSelector(selectSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(""); // debounced value — for everything else
  const { data: analytics, isLoading: analyticsLoading } = useGetAnalyticsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const { data, isLoading } = useGetAllBoardsQuery({
    page,
    search: debouncedSearch,
  }); //to ensure same timing for boarch changing
  const boards = data?.ids.map((id) => data.entities[id]) ?? [];

  const errRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);
  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    setErrMsg("");
  }, [boardName]);
  const handleCreate = async (boardName: string) => {
    try {
      const response = await createBoard({ title: boardName }).unwrap();
      setBoardName("");
      setIsOpen(false);
      toast({
        variant: "default",
        title: "Success! 🎉",
        description: response.message,
      });
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

  console.log(
    "totalPages:",
    data?.totalPages,
    "page:",
    page,
    "search:",
    search,
  );

  if (analyticsLoading || isLoading)
    return (
      <div className="fixed inset-0 z-50 bg-[#0B1628]">
        <div className="w-full h-dvh grid place-content-center">
          <LoaderCircle className="h-48 w-48 animate-spin text-white" />
        </div>
      </div>
    );

  return (
    <>
      <div className="p-5">
        <section className=" grid grid-cols-2 gap-2 mb-3 lg:grid-cols-4">
          <div className="bg-[#132040] p-4 rounded-md opacity-0 animate-fade-up delay-75">
            <div className="text-[1.1rem] mb-3">📁</div>
            <div className="text-white text-[1.5rem] font-['Playfair_Display_Variable'] font-bold">
              {analytics?.totalBoards}
            </div>
            <p className="text-xs text-[#8A93A8] uppercase text-nowrap font-semibold">
              Total Boards
            </p>
          </div>
          <div className="bg-[#132040] p-4 rounded-md opacity-0 animate-fade-up delay-150">
            <div className="text-[1.1rem] mb-3">✅</div>
            <div className="text-white text-[1.5rem] font-['Playfair_Display_Variable'] font-bold">
              {analytics?.tasksDone}
            </div>
            <p className="text-xs text-[#8A93A8] uppercase text-nowrap">
              Tasks Done
            </p>
          </div>
          <div className="bg-[#132040] p-4 rounded-md opacity-0 animate-fade-up delay-225">
            <div className="text-[1.1rem] mb-3">⌛</div>
            <div className="text-white text-[1.5rem] font-['Playfair_Display_Variable'] font-bold">
              {analytics?.inProgress}
            </div>
            <p className="text-xs text-[#8A93A8] uppercase text-nowrap font-semibold">
              In progress
            </p>
          </div>
          <div className="bg-[#132040] p-4 rounded-md opacity-0 animate-fade-up delay-300">
            <div className="text-[1.1rem] mb-3">📁</div>
            <div className="text-white text-[1.5rem] font-['Playfair_Display_Variable'] font-bold">
              {analytics?.toDo}
            </div>
            <p className="text-xs text-[#8A93A8] uppercase text-nowrap font-semibold">
              To Do
            </p>
          </div>
        </section>
        <div className="flex justify-between items-center">
          <h2 className="text-white my-5 font-['Playfair_Display_Variable'] ">
            All Boards
          </h2>
          {data?.totalPages ? (
            <div className="items-center justify-center gap-4 hidden lg:flex">
              <Button
                variant="default"
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                className="bg-transparent border border-white/10 text-[#8A93A8] rounded-md px-3 py-2 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <p className="text-[#8A93A8] text-sm">
                Page {page} of {data.totalPages}
              </p>
              <Button
                variant="default"
                onClick={() => setPage((p) => p + 1)}
                disabled={page === data.totalPages}
                className="bg-transparent border border-white/10 text-[#8A93A8] rounded-md px-3 py-2 disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          ) : null}
          <div className="lg:hidden">
            <SearchBar />
          </div>
        </div>

        <section className="grid grid-cols-1 gap-3 lg:grid-cols-4">
          {boards.length > 0 ? (
            boards.map((board, index) => (
              <BoardsList key={board!.id} board={board!} index={index} />
            ))
          ) : debouncedSearch ? (
            <p className="text-white my-5 font-['Playfair_Display_Variable']">
              No board found
            </p>
          ) : null}
          {debouncedSearch.length === 0 ? (
            <div className="bg-transparent border border-dashed hover:border-[#C9A84C] border-[#c9a84c40] rounded-md flex items-center justify-center  flex-col min-h-55 hover:bg-[#b1a27940]/20 group">
              <div className="bg-[#23252b] h-11 w-11 rounded-full flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-105">
                <Button
                  type="button"
                  variant="default"
                  title="Create new board"
                  onClick={() => setIsOpen(true)}
                  className="bg-transparent cursor-pointer"
                >
                  <span className="transition-transform duration-300 group-hover:scale-110 inline-block">
                    ➕
                  </span>
                </Button>
              </div>
              <p className="text-[#8A93A8] text-sm">Create new board</p>
            </div>
          ) : null}
        </section>

        {data?.totalPages ? (
          <div className="flex items-center justify-center gap-4 mt-6 lg:hidden">
            <Button
              variant="default"
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className="bg-transparent border border-white/10 text-[#8A93A8] rounded-md px-3 py-2 disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <p className="text-[#8A93A8] text-sm">
              Page {page} of {data.totalPages}
            </p>
            <Button
              variant="default"
              onClick={() => setPage((p) => p + 1)}
              disabled={page === data.totalPages}
              className="bg-transparent border border-white/10 text-[#8A93A8] rounded-md px-3 py-2 disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        ) : null}

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
    </>
  );
};

export default DashBoard;
