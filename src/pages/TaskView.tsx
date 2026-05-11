import { type Task } from "@/lib/types";
import SingleTask from "./SingleTask";
interface Data {
  taskCount: number;
  tasksDone: number;
  inProgress: number;
  toDo: number;
  ids: string[];
  entities: Record<string, Task>;
}

interface TaskViewProps {
  data: Data;
  status: Task["status"];
}

const TaskView = ({ data, status }: TaskViewProps) => {
  const statusIds = data?.ids.filter(
    (id) => data.entities[id].status === status,
  );
  const tasks = statusIds.map((id) => data.entities[id]);
  return (
    <>
      <div>
        <div className="bg-[#172035] p-3 rounded-sm">
          <section className="flex items-center justify-between border-b border-b-[#292c33] pb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2  rounded-[50%] bg-[#6b7280]"></div>
              <p className="text-white text-sm uppercase">{status}</p>
            </div>
            <div className="text-xs text-[#8A93A8] w-4 h-4 rounded-full bg-[#FFFFFF14] flex items-center justify-center">
              <p>{statusIds.length}</p>
            </div>
          </section>
          <div className="grid grid-cols-1 gap-3 mt-2">
            {tasks.map((task) => (
              <SingleTask task={task} key={task._id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskView;
