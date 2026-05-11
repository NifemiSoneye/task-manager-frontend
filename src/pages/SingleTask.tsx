import { type Task } from "@/lib/types";
interface SingleTaskProps {
  task: Task;
}

const SingleTask = ({ task }: SingleTaskProps) => {
  return (
    <div className="bg-[#132040] rounded-md p-3 mx-3">
      <p className="text-white text-[0.855rem] font-semibold">{task.title}</p>
      <p className="text-[0.74rem] text-xs text-[#8A93A8] mb-[0.7rem] font-light">
        {task.description}
      </p>

      <section>
        <div
          className={` flex justify-center mt-3 ${
            task.priority === "high"
              ? "bg-[#3e2424] text-[#f35e5e]"
              : task.priority === "medium"
                ? "bg-[#5a4623] text-[#f6b443]"
                : task.priority === "low"
                  ? "bg-[#072e16] text-[#22c55e]"
                  : ""
          }`}
        >
          {task.priority[0].toUpperCase()}
          {task.priority.slice(1)}
        </div>

        {task.dueDate ? (
          <div>
            <p>📅</p>
            <p>{task.dueDate}</p>
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default SingleTask;
