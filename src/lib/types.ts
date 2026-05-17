export interface Board {
  id: string;
  _id: string;
  title: string;
  user: string;
  favourite: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Task {
  id: string;
  _id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  status: "todo" | "inprogress" | "done";
  order: number;
  board: string;
  createdAt?: string;
  updatedAt?: string;
}
