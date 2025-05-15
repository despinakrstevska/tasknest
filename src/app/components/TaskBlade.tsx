import React, { useEffect, useState } from "react";

type TaskBladeProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: { title: string; description: string }, id?: number) => void;
  taskToEdit?: { id: number; title: string; description: string } | null;
};

export const TaskBlade = ({
  isOpen,
  onClose,
  onSave,
  taskToEdit,
}: TaskBladeProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [taskToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({ title, description }, taskToEdit?.id);
    onClose();
  };

 return (
    <div
      className={`fixed inset-0 z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Blade Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">New Task</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>
        {/* Task Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows={3}
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
              placeholder="Details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          >
             {taskToEdit ? "Update Task" : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
};
