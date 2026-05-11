import { type Task } from "@/lib/types";
import SingleTask from "./SingleTask";
import { Button } from "@/components/ui/button";

import { useRef, useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTaskMutation } from "@/features/tasks/taskApiSlice";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
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
  header: string;
}

const TaskView = ({ data, status, header }: TaskViewProps) => {
  const { id } = useParams();
  const [createTask, { isLoading: isTaskLoading }] = useCreateTaskMutation();
  const [isCreating, setIsCreating] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef<HTMLDivElement>(null);
  const statusIds = data?.ids.filter(
    (id) => data.entities[id].status === status,
  );
  const tasks = statusIds.map((id) => data.entities[id]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // form fields — initialised when a task is selected
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [FormStatus, setFormStatus] = useState<Task["status"]>("todo");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const [dueDate, setDueDate] = useState("");

  const [taskName, setTaskName] = useState("");
  useEffect(() => {
    setErrMsg("");
  }, [taskName]);
  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
    setTitle(task.title);
    setDescription(task.description ?? "");
    setFormStatus(task.status);
    setPriority(task.priority);
    setDueDate(task.dueDate ?? "");
  };
  const handleCreate = async (taskName: string) => {
    try {
      await createTask({
        boardId: id,
        title: taskName,
        status: status,
      }).unwrap();
      setTaskName("");
      setIsCreating(false);
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
  return (
    <>
      <div>
        <div className="bg-[#172035] p-3 rounded-sm  flex flex-col min-h-[40vh]">
          <section className="flex items-center justify-between border-b border-b-[#292c33] pb-4">
            <div className="flex items-center gap-2">
              <p className="text-white text-sm uppercase">{header}</p>
            </div>
            <div className="text-xs text-[#8A93A8] w-4 h-4 rounded-full bg-[#FFFFFF14] flex items-center justify-center">
              <p>{statusIds.length}</p>
            </div>
          </section>
          <div className="flex flex-col flex-1">
            <div className="grid grid-cols-1 gap-3 mt-2">
              {tasks.map((task) => (
                <SingleTask
                  task={task}
                  key={task._id}
                  onSelect={setSelectedTask}
                />
              ))}
            </div>

            <section className="mt-auto pt-4 m-3">
              {isCreating ? (
                <>
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
                  <Textarea
                    id="New task"
                    className={`w-full mt-3 rounded-sm text-white  bg-[#FFFFFF0D] p-[0.6rem] text-sm focus:outline-none font-sans`}
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Add new task"
                  />

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="default"
                      title="Get started"
                      className="bg-[#C9A84C] text-black  mt-5 rounded-sm p-5"
                      onClick={() => handleCreate(taskName)}
                    >
                      {isTaskLoading ? (
                        <LoaderCircle className="animate-spin" />
                      ) : (
                        "Create Task"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="default"
                      title="Get started"
                      className="bg-transparent text-[#8A93A8] mt-5 rounded-sm p-5 border border-[#8A93A8]"
                      onClick={() => {
                        setIsCreating(false);
                        setTaskName("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <div
                  className="bg-transparent border border-dashed border-[#C9A84C] rounded-md flex items-center justify-center flex-col p-3"
                  onClick={() => setIsCreating(true)}
                >
                  <p className="text-[#8A93A8] text-sm">Create new Task</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskView;
