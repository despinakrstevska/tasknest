export type Task = {
  id: number;
  title: string;
  description: string;
  tags?: string[];
  type: "Feature" | "Bug" | "UserStory" | "";
  assignee?: User;
};

export type Column = {
  columnId: string;
  title: string;
  tasks: Task[];
};

export type User = {
  id: number;
  name: string;
  avatarUrl?: string;
};
