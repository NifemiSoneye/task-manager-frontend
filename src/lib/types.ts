export interface Board {
  id: string;
  _id: string;
  title: string;
  user: string;
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
  status: "todo" | "in-progress" | "done";
  order: number;
  board: string;
  createdAt?: string;
  updatedAt?: string;
}
