"use client";

import React from "react";
import { Task, User } from "../types/shared";

export default function DashboardPage() {
  // Current user (in a real app, this would come from authentication)
  const currentUser: User = { id: 1, name: "Despina Krstevska" };

  const stats = {
    total: 42,
    completed: 18,
    inProgress: 10,
    todo: 14,
  };

  // Sample tasks with assignees
  const allTasks: Task[] = [
    {
      id: 1,
      title: "Design mockups",
      description: "Create wireframes for the new dashboard",
      tags: ["design"],
      type: "Feature",
      assignee: { id: 1, name: "Despina Krstevska" },
    },
    {
      id: 2,
      title: "Write specs",
      description: "Document API specifications",
      tags: ["documentation"],
      type: "UserStory",
      assignee: { id: 2, name: "Bob Smith" },
    },
    {
      id: 3,
      title: "Develop login page",
      description: "Implement user authentication",
      tags: ["urgent"],
      type: "Bug",
      assignee: { id: 1, name: "Despina Krstevska" },
    },
    {
      id: 4,
      title: "Develop dashboard page",
      description: "Create the main dashboard interface",
      tags: ["frontend"],
      type: "Feature",
      assignee: { id: 1, name: "Despina Krstevska" },
    },
    {
      id: 5,
      title: "Fix navigation bug",
      description: "Resolve issue with mobile navigation",
      tags: ["bug", "mobile"],
      type: "Bug",
      assignee: { id: 3, name: "Charlie Lee" },
    },
  ];

  // Filter tasks assigned to current user
  const myTasks = allTasks.filter(task => task.assignee?.id === currentUser.id);

  const getStatusColor = (task: Task) => {
    // This is a simplified logic - in a real app, you'd have a status field
    if (task.id <= 2) return "bg-yellow-100 text-yellow-800";
    if (task.id === 3) return "bg-blue-100 text-blue-800";
    return "bg-green-100 text-green-800";
  };

  const getStatusText = (task: Task) => {
    if (task.id <= 2) return "In Progress";
    if (task.id === 3) return "Review";
    return "Completed";
  };

  const getTypeColor = (type: Task["type"]) => {
    switch (type) {
      case "Feature": return "bg-purple-100 text-purple-800";
      case "Bug": return "bg-red-100 text-red-800";
      case "UserStory": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
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
              {myTasks.length}
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
            {myTasks.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-6xl mb-4">📋</div>
                <p className="text-gray-500">No tasks assigned to you yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myTasks.map((task) => (
                  <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
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
      </div>
    </main>
  );
}
