import { type Board } from "@/lib/types";
import { useGetTasksByBoardQuery } from "@/features/tasks/taskApiSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteBoardMutation } from "@/features/boards/boardApiSlice";
type Props = {
  board: Board;
  index: number;
};

import { LoaderCircle } from "lucide-react";
const BoardsList = ({ board, index }: Props) => {
  const { data } = useGetTasksByBoardQuery(board.id);
  const toDoArray = Array(data?.toDo ?? 0).fill(null);
  const inProgressArray = Array(data?.inProgress ?? 0).fill(null);
  const doneArray = Array(data?.tasksDone ?? 0).fill(null);

  const [deleteBoard, { isLoading: isDeleteLoading }] =
    useDeleteBoardMutation();

  const handleDelete = async () => {
    await deleteBoard({ id: board.id });
  };
  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60)
      return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24)
      return `${diffInHours} ${diffInHours === 1 ? "hr" : "hrs"} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7)
      return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4)
      return `${diffInWeeks} ${diffInWeeks === 1 ? "week" : "weeks"} ago`;

    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
  };

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

  const getGradient = (index: number) =>
    boardGradients[index % boardGradients.length];
  return (
    <section>
      <div className="bg-[#132040]  rounded-md hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-shadow duration-300  group min-h-55">
        <div
          className="h-16 rounded-t-md flex items-end p-3 mb-3 relative justify-between"
          style={{ background: getGradient(index) }}
        >
          <p className="text-white font-semibold">{board.title}</p>

          <DropdownMenu>
            <DropdownMenuTrigger className=" top-2 right-2 text-white/60 hover:text-white px-1 lg:opacity-0 lg:group-hover:opacity-100 lg:transition-opacity lg:duration-200">
              ⋯
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[#132040] border-white/10"
            >
              <DropdownMenuItem
                onSelect={(e) => {
                  // This stops the dropdown from closing
                  e.preventDefault();
                }}
                className="text-red-400 hover:text-red-300 cursor-pointer flex items-center "
                onClick={handleDelete}
              >
                {isDeleteLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "🗑 Delete board"
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
      </div>
    </section>
  );
};

export default BoardsList;
