"use client";

import React from "react";

export default function DashboardPage() {
  const stats = {
    total: 42,
    completed: 18,
    inProgress: 10,
    todo: 14,
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-indigo-700">Dashboard</h1>
        </div>

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-stone-100 rounded-md shadow-sm p-6">
            <h2 className="text-sm text-gray-500">Total Tasks</h2>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-stone-100 rounded-md shadow-sm p-6">
            <h2 className="text-sm text-gray-500">Completed</h2>
            <p className="text-2xl font-bold text-green-600">
              {stats.completed}
            </p>
          </div>
          <div className="bg-stone-100 rounded-md shadow-sm p-6">
            <h2 className="text-sm text-gray-500">In Progress</h2>
            <p className="text-2xl font-bold text-yellow-500">
              {stats.inProgress}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
