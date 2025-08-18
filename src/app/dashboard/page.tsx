"use client";

import React, { useEffect, useState } from "react";
import { Task, User } from "../types/shared";
import { fetchBoardTasks } from "../services/tasks";
import { TaskBlade } from "../components/TaskBlade";
import { toast } from "react-toastify";

export default function DashboardPage() {
  // Current user (in a real app, this would come from authentication)
  const currentUser: User = { id: 1, name: "Despina Krstevska" };

  const [todo, setTodo] = useState<Task[]>([]);
  const [inProgress, setInProgress] = useState<Task[]>([]);
  const [done, setDone] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [bladeOpen, setBladeOpen] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchBoardTasks();
        setTodo(data.todo ?? []);
        setInProgress(data.inProgress ?? []);
        setDone(data.done ?? []);
      } catch (e) {
        setError("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const allTasks: Task[] = [...todo, ...inProgress, ...done];

  const stats = {
    total: allTasks.length,
    completed: done.length,
    inProgress: inProgress.length,
    todo: todo.length,
  };

  const getStatusColor = (task: Task) => {
    switch (task.status) {
      case "Todo":
        return "bg-gray-100 text-gray-800";
      case "InProgress":
        return "bg-yellow-100 text-yellow-800";
      case "Done":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (task: Task) => {
    switch (task.status) {
      case "Todo":
        return "To Do";
      case "InProgress":
        return "In Progress";
      case "Done":
        return "Completed";
      default:
        return "Unknown";
    }
  };

  const getTypeColor = (type: Task["type"]) => {
    switch (type) {
      case "Feature": return "bg-purple-100 text-purple-800";
      case "Bug": return "bg-red-100 text-red-800";
      case "UserStory": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddOrUpdateTask = (
    task: { title: string; description: string; tags?: string[]; type: string; assignee?: User },
    id?: number
  ) => {
    if (id) {
      // Update existing task across columns
      const updateTaskInList = (list: Task[]) =>
        list.map((t) =>
          t.id === id
            ? {
                ...t,
                ...task,
                tags: task.tags ?? [],
                type: (["Feature", "Bug", "UserStory", ""].includes(task.type)
                  ? task.type
                  : t.type) as Task["type"],
              }
            : t
        );

      setTodo((prev) => updateTaskInList(prev));
      setInProgress((prev) => updateTaskInList(prev));
      setDone((prev) => updateTaskInList(prev));
      toast.success("Task updated!");
    } else {
      // Create new task defaults to Todo
      const newTask: Task = {
        id: Date.now(),
        title: task.title,
        description: task.description,
        tags: task.tags ?? [],
        type: (["Feature", "Bug", "UserStory", ""].includes(task.type)
          ? task.type
          : "UserStory") as Task["type"],
        status: "Todo",
        assignee: task.assignee,
      };
      setTodo((prev) => [...prev, newTask]);
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
        {/* Dashboard Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-indigo-700">Dashboard</h1>
        </div>

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-sm text-gray-500">Total Tasks</h2>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-sm text-gray-500">Completed</h2>
            <p className="text-2xl font-bold text-green-600">
              {stats.completed}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-sm text-gray-500">In Progress</h2>
            <p className="text-2xl font-bold text-yellow-500">
              {stats.inProgress}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-sm text-gray-500">My Tasks</h2>
            <p className="text-2xl font-bold text-indigo-600">
              {allTasks.filter(t => t.assignee?.id === currentUser.id).length}
            </p>
          </div>
        </div>

        {/* My Tasks Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">My Tasks</h2>
            <p className="text-sm text-gray-600 mt-1">Tasks assigned to you</p>
          </div>
          
          <div className="p-6">
            {allTasks.filter(t => t.assignee?.id === currentUser.id).length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-6xl mb-4">📋</div>
                <p className="text-gray-500">No tasks assigned to you yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {allTasks.filter(t => t.assignee?.id === currentUser.id).map((task) => (
                  <div
                    key={task.id}
                    onClick={() => handleTaskClick(task)}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium text-gray-900">{task.title}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(task.type)}`}>
                            {task.type}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task)}`}>
                            {getStatusText(task)}
                          </span>
                        </div>
                        {task.description && (
                          <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                        )}
                        {task.tags && task.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {task.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
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
