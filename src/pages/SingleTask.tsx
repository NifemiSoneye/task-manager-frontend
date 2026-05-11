import { type Task } from "@/lib/types";
import formatDueDate from "@/lib/formatDate";
interface SingleTaskProps {
  task: Task;
  onSelect: (task: Task) => void;
}

const SingleTask = ({ task, onSelect }: SingleTaskProps) => {
  return (
    <div
      className="bg-[#132040] rounded-md p-3 mx-3 border border-[#FFFFFF12]"
      onClick={() => onSelect(task)}
    >
      <p className="text-white text-[0.855rem] font-semibold mb-[0.55rem]">
        {task.title}
      </p>
      <p className="text-xs text-[#8A93A8] mb-[0.7rem] font-light">
        {task.description}
      </p>

      <section className="flex justify-between">
        <div
          className={`flex items-center  text-[0.63rem] justify-center gap-1 rounded-sm px-2 py-1 ${
            task.priority === "high"
              ? "bg-[#3e2424] text-[#f35e5e]"
              : task.priority === "medium"
                ? "bg-[#5a4623] text-[#f6b443]"
                : task.priority === "low"
                  ? "bg-[#072e16] text-[#22c55e]"
                  : ""
          }`}
        >
          <div
            className={`w-1 h-1  rounded-[50%] ${
              task.priority === "high"
                ? "bg-[#f35e5e]"
                : task.priority === "medium"
                  ? "bg-[#f6b443]"
                  : task.priority === "low"
                    ? "bg-[#22c55e]"
                    : ""
            }`}
          ></div>
          <p className="uppercase">
            {task.priority[0].toUpperCase()}
            {task.priority.slice(1)}{" "}
          </p>
        </div>
        {task.dueDate ? (
          <div className="text-xs text-[#8A93A8] flex items-center gap-1">
            <p>📅</p>
            <p>{formatDueDate(task.dueDate)}</p>
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default SingleTask;
