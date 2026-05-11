import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetTasksByBoardQuery } from "@/features/tasks/taskApiSlice";
import { useGetBoardQuery } from "@/features/boards/boardApiSlice";
import getTimeAgo from "@/lib/getTimeAgo";
import TaskView from "./TaskView";
import { LoaderCircle } from "lucide-react";
import { type Task } from "@/lib/types";

const Board = () => {
  const { id } = useParams();
  const { data, isLoading: isTasksLoading } = useGetTasksByBoardQuery(id);
  const { data: board } = useGetBoardQuery(id);
  const [activeTab, setActiveTab] = useState<Task["status"]>("todo");

  const tabs: { label: string; status: Task["status"]; count: number }[] = [
    { label: "To Do", status: "todo", count: data?.toDo ?? 0 },
    {
      label: "In Progress",
      status: "inprogress",
      count: data?.inProgress ?? 0,
    },
    { label: "Done", status: "done", count: data?.tasksDone ?? 0 },
  ];



  if (isTasksLoading)
    return (
      <div className="fixed inset-0 z-50 bg-[#0B1628]">
        <div className="w-full h-dvh grid place-content-center">
          <LoaderCircle className="h-48 w-48 animate-spin text-white" />
        </div>
      </div>
    );

  return (
    <div>
      <p className="text-xs text-[#8A93A8] pb-3 border-b border-b-[#292c33] p-5">
        {data?.taskCount} tasks . Last Updated {getTimeAgo(board?.updatedAt)}
      </p>

      {/* Mobile tab bar */}
      <div className="flex md:hidden border-b border-[#292c33]">
        {tabs.map((tab) => (
          <button
            key={tab.status}
            onClick={() => setActiveTab(tab.status)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-[0.78rem] font-medium border-b-2 transition-colors
              ${
                activeTab === tab.status
                  ? "text-white border-[#C9A84C]"
                  : "text-[#8A93A8] border-transparent"
              }`}
          >
            <div
              className={`w-2 h-2  rounded-[50%] ${tab.status === "todo" ? "bg-[#6b7280]" : tab.status === "inprogress" ? "bg-[#f6b443]" : tab.status === "done" ? "bg-[#22c55e]" : ""}`}
            ></div>
            {tab.label}
            <span
              className={`text-[0.65rem] px-1.5 py-0.5 rounded-full
              ${
                activeTab === tab.status
                  ? "bg-[#C9A84C26] text-[#C9A84C]"
                  : "bg-[#FFFFFF14] text-[#8A93A8]"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Mobile: single active column */}
      {data && (
        <div className="block md:hidden m-3">
          <TaskView data={data} status={activeTab}  />
        </div>
      )}

      {/* Desktop: all 3 columns */}
      {data && (
        <div className="hidden md:grid grid-cols-3 gap-4 m-3">
          <TaskView data={data} status="todo"  />
          <TaskView data={data} status="inprogress" />
          <TaskView data={data} status="done"  />
        </div>
      )}
    </div>
  );
};

export default Board;
