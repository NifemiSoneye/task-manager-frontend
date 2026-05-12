import { type Task } from "@/lib/types";
import SingleTask from "./SingleTask";
import { Button } from "@/components/ui/button";

import { useRef, useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTaskMutation } from "@/features/tasks/taskApiSlice";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { useUpdateTaskMutation } from "@/features/tasks/taskApiSlice";
import { Input } from "@/components/ui/input";
import { useDeleteTaskMutation } from "@/features/tasks/taskApiSlice";
import { useToast } from "@/hooks/use-toast";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

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
  const header =
    status === "todo"
      ? "To Do"
      : status === "inprogress"
        ? "In Progress"
        : status === "done"
          ? "Done"
          : null;
  const { id } = useParams();
  const [createTask, { isLoading: isTaskLoading }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdateLoading }] = useUpdateTaskMutation();
  const [deleteTask, { isLoading: isDeleteLoading }] = useDeleteTaskMutation();
  const [isCreating, setIsCreating] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [modalErrMsg, setModalErrMsg] = useState("");
  const errRef = useRef<HTMLDivElement>(null);
  const modalErrRef = useRef<HTMLDivElement>(null);
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
  const { toast } = useToast();

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
    setDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
  };
  const handleCreate = async (taskName: string) => {
    try {
      const response = await createTask({
        boardId: id,
        title: taskName,
        status: status,
      }).unwrap();
      toast({
        variant: "default",
        title: "Success! 🎉",
        description: response.message,
      });
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
  const handleUpdate = async () => {
    try {
      const response = await updateTask({
        id: selectedTask?.id,
        title,
        description,
        status: FormStatus,
        priority,
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      }).unwrap();
      toast({
        variant: "default",
        title: "Success! 🎉",
        description: response.message,
      });
      handleClose();
    } catch (err: any) {
      if (!err.status) {
        setModalErrMsg("No Server Response");
      } else if (err.status === 400) {
        setModalErrMsg("All fields are required");
      } else if (err.status === 409) {
        setModalErrMsg("Duplicate Title");
      } else {
        setModalErrMsg(err.data?.message);
      }
      modalErrRef?.current?.focus();
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteTask({ id: selectedTask?.id }).unwrap();
      toast({
        variant: "default",
        title: "Success! 🎉",
        description: response.message,
      });
      setSelectedTask(null);
    } catch (err) {
      console.error("Failed to delete board:", err);
    }
  };
  const handleClose = () => {
    setSelectedTask(null);
    setModalErrMsg("");
  };
  const { setNodeRef: setDroppableRef } = useDroppable({
    id: status, // "todo", "inprogress", or "done"
  });
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
            <SortableContext
              items={tasks.map((task) => task.id)}
              strategy={verticalListSortingStrategy}
            >
              <div
                ref={setDroppableRef}
                className="grid grid-cols-1 gap-3 mt-2 min-h-12.5"
              >
                {tasks.map((task) => (
                  <SingleTask
                    task={task}
                    key={task._id}
                    onSelect={handleSelectTask}
                  />
                ))}
              </div>
            </SortableContext>

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
                        setErrMsg("");
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
          {selectedTask && (
            <>
              {/* overlay */}
              <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
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
                    modalErrMsg
                      ? "bg-red-200 px-4 py-2 my-2 rounded-lg  text-red-500"
                      : "hidden"
                  }
                  ref={modalErrRef}
                >
                  🚨 {modalErrMsg}
                </div>
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-white font-['Playfair_Display_Variable'] font-semibold text-lg">
                    {selectedTask.title}
                  </h2>
                </div>
                <Label
                  htmlFor="Title"
                  className="text-[#8A93A8] text-xs uppercase tracking-wider mb-2 block"
                >
                  Title
                </Label>
                <Input
                  className={`w-full mb-3 rounded-sm text-white  bg-[#FFFFFF0D] p-[0.6rem] text-sm focus:outline-none font-sans`}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Label
                  htmlFor="Description"
                  className="text-[#8A93A8] text-xs uppercase tracking-wider mb-2 block"
                >
                  Description
                </Label>

                <Textarea
                  className={`w-full mt-3 rounded-sm text-white  bg-[#FFFFFF0D] p-[0.6rem] text-sm focus:outline-none font-sans`}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <Label
                  htmlFor="Status"
                  className="text-[#8A93A8] text-xs uppercase tracking-wider my-4 block"
                >
                  Status
                </Label>

                <div className="flex justify-between gap-1">
                  <Button
                    type="button"
                    variant="default"
                    title="To Do"
                    className={`flex-1 border border-white/10 text-[#8A93A8] rounded-md py-2 text-sm bg-transparent ${
                      FormStatus === "todo" ? "bg-[#5a4623] text-[#f6b443]" : ""
                    }`}
                    onClick={() => setFormStatus("todo")}
                  >
                    To Do
                  </Button>
                  <Button
                    type="button"
                    variant="default"
                    title="In Progress"
                    className={`flex-1 border border-white/10 text-[#8A93A8] rounded-md py-2 text-sm bg-transparent ${
                      FormStatus === "inprogress"
                        ? "bg-[#5a4623] text-[#f6b443]"
                        : ""
                    }`}
                    onClick={() => setFormStatus("inprogress")}
                  >
                    IN PROGRESS
                  </Button>
                  <Button
                    type="button"
                    variant="default"
                    title="Done"
                    className={`flex-1 border border-white/10 text-[#8A93A8] rounded-md py-2 text-sm bg-transparent ${
                      FormStatus === "done" ? "bg-[#5a4623] text-[#f6b443]" : ""
                    }`}
                    onClick={() => setFormStatus("done")}
                  >
                    Done
                  </Button>
                </div>
                <Label
                  htmlFor="Description"
                  className="text-[#8A93A8] text-xs uppercase tracking-wider my-4 block"
                >
                  Priority
                </Label>

                <div className="flex justify-between gap-1">
                  <Button
                    type="button"
                    variant="default"
                    title="High"
                    className={`flex-1 border border-white/10 text-[#8A93A8] rounded-md py-2 text-sm bg-transparent ${
                      priority === "high" ? "bg-[#5a4623] text-[#f6b443]" : ""
                    }`}
                    onClick={() => setPriority("high")}
                  >
                    High
                  </Button>
                  <Button
                    type="button"
                    variant="default"
                    title="Medium"
                    className={`flex-1 border border-white/10 text-[#8A93A8] rounded-md py-2 text-sm bg-transparent ${
                      priority === "medium" ? "bg-[#5a4623] text-[#f6b443]" : ""
                    }`}
                    onClick={() => setPriority("medium")}
                  >
                    Medium
                  </Button>
                  <Button
                    type="button"
                    variant="default"
                    title="Low"
                    className={`flex-1 border border-white/10 text-[#8A93A8] rounded-md py-2 text-sm bg-transparent ${
                      priority === "low" ? "bg-[#5a4623] text-[#f6b443]" : ""
                    }`}
                    onClick={() => setPriority("low")}
                  >
                    Low
                  </Button>
                </div>

                <Label className="text-[#8A93A8] text-xs uppercase tracking-wider my-4 block">
                  Due Date
                </Label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-[#FFFFFF0D] border border-white/10 rounded-md p-2 text-white text-sm"
                  style={{ colorScheme: "dark" }}
                />

                <div className="flex gap-3 mt-5 border-t border-t-[#292c33] pt-5">
                  <Button
                    type="button"
                    variant="default"
                    title="Cancel"
                    className="flex-1 border  text-red-400 rounded-md py-2 text-sm bg-transparent border-red-400"
                    onClick={handleDelete}
                  >
                    {isDeleteLoading ? (
                      <LoaderCircle className="animate-spin text-red-400" />
                    ) : (
                      "🗑 Delete"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="default"
                    title="Cancel"
                    className="flex-1 border border-white/10 text-[#8A93A8] rounded-md py-2 text-sm"
                    onClick={() => handleClose()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="default"
                    title="Create new board"
                    className="flex-1 bg-[#C9A84C] text-black font-semibold rounded-md py-2 text-sm"
                    onClick={handleUpdate}
                  >
                    {isUpdateLoading ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      "Update Task"
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskView;
