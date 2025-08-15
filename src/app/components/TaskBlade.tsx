import React, { useEffect, useState } from "react";
import { Task, User } from "../types/shared";
import { tagColors } from "../utils/tagUtils";
import { toast } from "react-toastify";
import { users } from "../data/users";

type TaskBladeProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    task: { title: string; description: string; tags?: string[]; type: string; assignee?: User },
    id?: number
  ) => void;
  taskToEdit?: Task | null;
};

export const TaskBlade = ({
  isOpen,
  onClose,
  onSave,
  taskToEdit,
}: TaskBladeProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [taskType, setTaskType] = useState("");
  const [assignee, setAssignee] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setTags(taskToEdit.tags || []);
      setTaskType(taskToEdit.type || "");
      setAssignee(taskToEdit.assignee);
    } else {
      setTitle("");
      setDescription("");
      setTags([]);
      setTaskType("");
      setAssignee(undefined);
    }
  }, [taskToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!taskType) {
      toast.error("Please select a task type");
      return;
    }

    onSave({ title, description, tags, type: taskType, assignee }, taskToEdit?.id);
    setTitle("");
    setDescription("");
    setTags([]);
    setTaskType("");
    setAssignee(undefined);
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Task Type
            </label>
            <select
              value={taskType}
              onChange={(e) => setTaskType(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select type</option>
              <option value="Bug">Bug</option>
              <option value="Feature">Feature</option>
              <option value="UserStory">User Story</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mt-4">
              Assignee
            </label>
            <select
              value={assignee?.id || ""}
              onChange={(e) => {
                const selectedUser = users.find(
                  (u) => u.id === Number(e.target.value)
                );
                setAssignee(selectedUser);
              }}
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Unassigned</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && tagInput.trim()) {
                    e.preventDefault();
                    if (!tags.includes(tagInput.trim())) {
                      setTags([...tags, tagInput.trim()]);
                      setTagInput("");
                    }
                  }
                }}
                placeholder="Type tag and press Enter"
                className="flex-1 border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, idx) => {
                const colorClass = tagColors[tag] || tagColors.default;
                return (
                  <span
                    key={idx}
                    className={`text-sm font-semibold px-2 py-1 rounded flex items-center ${colorClass}`}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() =>
                        setTags((prev) => prev.filter((_, i) => i !== idx))
                      }
                      className="ml-2 text-xs text-gray-700 hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
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
