"use client";

import React, { useEffect, useState } from "react";
import Board from "../components/Board";
import { Task } from "../types/shared";
import { TaskBlade } from "../components/TaskBlade";
import { toast } from "react-toastify";
import { fetchBoardTasks } from "../services/tasks";

export default function BoardPage() {
  const [bladeOpen, setBladeOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<{ [columnId: string]: Task[] }>({
    todo: [],
    inProgress: [],
    done: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchBoardTasks();
        setTasks(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load tasks");
        toast.error("Failed to load tasks");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

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
        status: "Todo",
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

        {isLoading ? (
          <div className="text-gray-500">Loading tasks…</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <Board
            tasks={tasks}
            setTasks={setTasks}
            onTaskClick={handleTaskClick}
          />
        )}

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
