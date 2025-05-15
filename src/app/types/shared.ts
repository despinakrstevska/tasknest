export type Task = {
  id: number;
  title: string;
  description: string;
};

export type Column = {
  columnId: string;
  title: string;
  tasks: Task[];
};