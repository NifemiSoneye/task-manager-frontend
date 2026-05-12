import { type Board } from "@/lib/types";
import { useGetTasksByBoardQuery } from "@/features/tasks/taskApiSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteBoardMutation } from "@/features/boards/boardApiSlice";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useUpdateBoardMutation } from "@/features/boards/boardApiSlice";
import { useNavigate } from "react-router-dom";
import getTimeAgo from "@/lib/getTimeAgo";
import { useToast } from "@/hooks/use-toast";
type Props = {
  board: Board;
  index: number;
};

import { LoaderCircle } from "lucide-react";

const boardGradients = [
  "linear-gradient(135deg, #1a3a5c, #0f2440)", // deep blue
  "linear-gradient(135deg, #312e81, #1e1b4b)", // indigo
  "linear-gradient(135deg, #064e3b, #022c22)", // emerald
  "linear-gradient(135deg, #78350f, #451a03)", // amber
  "linear-gradient(135deg, #4c1d95, #2e1065)", // violet
  "linear-gradient(135deg, #881337, #4c0519)", // rose
  "linear-gradient(135deg, #134e4a, #042f2e)", // teal
  "linear-gradient(135deg, #1e3a5f, #2d1b69)", // blue-violet
  "linear-gradient(135deg, #365314, #1a2e05)", // olive
  "linear-gradient(135deg, #7c2d12, #3b0d02)", // burnt orange
];

const BoardsList = ({ board, index }: Props) => {
  const { data } = useGetTasksByBoardQuery(board.id);
  const toDoArray = Array(data?.toDo ?? 0).fill(null);
  const inProgressArray = Array(data?.inProgress ?? 0).fill(null);
  const doneArray = Array(data?.tasksDone ?? 0).fill(null);

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setErrMsg("");
  }, [newTitle]);

  const { toast } = useToast();

  const [deleteBoard, { isLoading: isDeleteLoading }] =
    useDeleteBoardMutation();

  const [updateBoard, { isLoading: isUpdateLoading }] =
    useUpdateBoardMutation();
  const handleDelete = async () => {
    try {
      const response = await deleteBoard({ id: board.id }).unwrap();
      toast({
        variant: "default",
        title: "Success! 🎉",
        description: response.message,
      });
    } catch (err) {
      console.error("Failed to delete board:", err);
    }
  };
  const handleUpdate = async () => {
    try {
      const response = await updateBoard({
        id: board.id,
        title: newTitle,
      }).unwrap();
      setNewTitle("");
      setIsEditing(false);
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
      } else if (err.status === 403) {
        setErrMsg("Forbidden");
      } else if (err.status === 409) {
        setErrMsg("Duplicate Title");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef?.current?.focus();
    }
  };

  const navigate = useNavigate();
  const handleNavigateToBoard = () => {
    navigate(`/board/${board.id}`);
  };

  const getGradient = (index: number) =>
    boardGradients[index % boardGradients.length];
  return (
    <section>
      <div
        className="bg-[#132040]  rounded-md hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-shadow duration-300  group min-h-55 overflow-hidden"
        onClick={handleNavigateToBoard}
      >
        <div
          className="h-16 rounded-t-md flex items-end p-3 mb-3 relative justify-between"
          style={{ background: getGradient(index) }}
        >
          <p className="text-white font-semibold truncate flex-1 mr-2">
            {board.title}
          </p>

          <DropdownMenu>
            <DropdownMenuTrigger
              className=" top-2 right-2 text-white/60 hover:text-white px-1 lg:opacity-0 lg:group-hover:opacity-100 lg:transition-opacity lg:duration-200 cursor-pointer shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              ⋯
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[#132040] border-white/10"
            >
              <DropdownMenuItem
                className="text-white hover:text-red-300 cursor-pointer flex items-center text-nowrap "
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
              >
                {isUpdateLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "📝 Update"
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => {
                  // This stops the dropdown from closing
                  e.preventDefault();
                }}
                className="text-red-400 hover:text-red-300 cursor-pointer flex items-center "
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
              >
                {isDeleteLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "🗑 Delete"
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <section className="grid grid-cols-3 gap-2 border-b border-b-[#292c33] pb-4 p-4">
          <div>
            <p className="text-[0.55rem] text-[#8A93A8]">To Do</p>
            <section>
              {toDoArray.map((_, i) => (
                <div key={i} className="bg-[#C9A84C] h-1.25 rounded-md my-1" />
              ))}
            </section>
          </div>
          <div>
            <p className="text-[0.55rem] text-[#8A93A8]">In-Progress</p>
            <section>
              {inProgressArray.map((_, i) => (
                <div
                  key={i}
                  className="bg-[#FBBF2480] h-1.25 rounded-md my-1"
                />
              ))}
            </section>
          </div>
          <div>
            <p className="text-[0.55rem] text-[#8A93A8]">Done</p>
            <section>
              {doneArray.map((_, i) => (
                <div
                  key={i}
                  className="bg-[#22C55E80] h-1.25 rounded-md my-1"
                />
              ))}
            </section>
          </div>
        </section>
        <div className="flex items-center justify-between mt-2 p-4">
          <p className="text-xs text-white">
            <span className="font-semibold">{data?.taskCount}</span>{" "}
            <span className="text-[#8A93A8]">tasks</span>
          </p>
          <p className="text-[#8A93A8] text-[0.7rem]">
            {getTimeAgo(board.createdAt as string)}
          </p>
        </div>
        {isEditing && (
          <>
            {/* overlay */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(false);
              }}
            />

            {/* modal - bottom sheet on mobile, centered on desktop */}
            <div
              className="fixed z-50
              bottom-0 left-0 right-0 rounded-t-2xl
              md:bottom-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:w-105
              bg-[#132040] p-6 animate-in slide-in-from-bottom md:slide-in-from-bottom-0 duration-300"
              onClick={(e) => e.stopPropagation()}
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
                  Edit Board
                </h2>
                <button
                  onClick={() => setIsEditing(false)}
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
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />

              <div className="flex gap-3 mt-5">
                <Button
                  type="button"
                  variant="default"
                  title="Cancel"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 border border-white/10 text-[#8A93A8] rounded-md py-2 text-sm"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="default"
                  title="Create new board"
                  onClick={handleUpdate}
                  className="flex-1 bg-[#C9A84C] text-black font-semibold rounded-md py-2 text-sm"
                >
                  {isUpdateLoading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Update Board"
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BoardsList;
