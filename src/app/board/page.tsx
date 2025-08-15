"use client";

import React, { useState } from "react";
import Board from "../components/Board";
import { Task } from "../types/shared";
import { TaskBlade } from "../components/TaskBlade";
import { toast } from "react-toastify";

export default function BoardPage() {
  const [bladeOpen, setBladeOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<{ [columnId: string]: Task[] }>({
    todo: [
      {
        id: 27504,
        title: "Design mockups",
        description: "",
        tags: ["design"],
        type: "Feature",
      },
      {
        id: 27505,
        title: "Write specs",
        description: "",
        tags: [],
        type: "UserStory",
      },
    ],
    inProgress: [
      {
        id: 27503,
        title: "Develop login page",
        description: "",
        tags: ["urgent"],
        type: "Bug",
      },
    ],
    done: [
      {
        id: 27502,
        title: "Develop dashboard page",
        description: "",
        tags: [],
        type: "Feature",
      },
    ],
  });

  const handleAddOrUpdateTask = (
    task: { title: string; description: string; tags?: string[]; type: string },
    id?: number
  ) => {
    if (id) {
      // Update
      setTasks((prevTasks) => {
        const updatedTasks: typeof prevTasks = {};
        for (const columnId in prevTasks) {
          updatedTasks[columnId] = prevTasks[columnId].map((t) =>
            t.id === id
              ? {
                  ...t,
                  ...task,
                  type: (["Feature", "Bug", "UserStory", ""].includes(task.type)
                    ? task.type
                    : t.type) as Task["type"], // fallback to old type if invalid
                }
              : t
          );
        }
        return updatedTasks;
      });
      toast.success("Task updated!");
    } else {
      // Add new task to 'todo'
      const newTask: Task = {
        id: Date.now(),
        ...task,
        tags: task.tags ?? [],
        type: "UserStory",
      };
      setTasks((prev) => ({
        ...prev,
        todo: [...prev.todo, newTask],
      }));
      toast.success("Task added!");
    }

    setTaskToEdit(null);
  };

  const handleTaskClick = (task: Task) => {
    setTaskToEdit(task);
    setBladeOpen(true);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-indigo-700">Board</h1>
          <button
            onClick={() => {
              setTaskToEdit(null);
              setBladeOpen(true);
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded shadow"
          >
            Add Task
          </button>
        </div>

        <Board
          tasks={tasks}
          setTasks={setTasks}
          onTaskClick={handleTaskClick}
        />

        <TaskBlade
          isOpen={bladeOpen}
          onClose={() => setBladeOpen(false)}
          onSave={handleAddOrUpdateTask}
          taskToEdit={taskToEdit}
        />
      </div>
    </main>
  );
}
