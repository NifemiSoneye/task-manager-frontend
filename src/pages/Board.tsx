import { useParams } from "react-router-dom";
import { useGetTasksByBoardQuery } from "@/features/tasks/taskApiSlice";
import { useGetBoardQuery } from "@/features/boards/boardApiSlice";
import getTimeAgo from "@/lib/getTimeAgo";
import TaskView from "./TaskView";
import { LoaderCircle } from "lucide-react";

const Board = () => {
  const { id } = useParams();
  const { data, isLoading: isTasksLoading } = useGetTasksByBoardQuery(id);
  const { data: board } = useGetBoardQuery(id);

  if (isTasksLoading)
    return (
      <div className="fixed inset-0 z-50 bg-[#0B1628]">
        <div className="w-full h-dvh grid place-content-center">
          <LoaderCircle className="h-48 w-48 animate-spin text-white" />
        </div>
      </div>
    );
  return (
    <div className="">
      <p className="text-xs text-[#8A93A8] pb-3 border-b border-b-[#292c33] p-5">
        {data?.taskCount} tasks . Last Updated {getTimeAgo(board?.updatedAt)}
      </p>
      <div className="grid-cols-1 grid gap-4 m-3 ">
        {data && <TaskView data={data} status="todo" />}
        {data && <TaskView data={data} status="inprogress" />}
        {data && <TaskView data={data} status="done" />}
      </div>
    </div>
  );
};

export default Board;
