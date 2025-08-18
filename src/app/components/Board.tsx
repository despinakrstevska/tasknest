"use client";

import React, { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import BoardColumn from "./BoardColumn";
import { Task } from "../types/shared";

const columns = [
  { id: "todo", title: "To Do" },
  { id: "inProgress", title: "In Progress" },
  { id: "done", title: "Done" },
];

type BoardProps = {
  tasks: { [columnId: string]: Task[] };
  setTasks: React.Dispatch<
    React.SetStateAction<{ [columnId: string]: Task[] }>
  >;
  onTaskClick?: (task: Task) => void;
};

const Board = ({ tasks, setTasks, onTaskClick  }: BoardProps) => {
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceTasks = [...tasks[source.droppableId]];
    const [moved] = sourceTasks.splice(source.index, 1);
    const destTasks = [...tasks[destination.droppableId]];
    const movedWithStatus = {
      ...moved,
      status:
        destination.droppableId === "todo"
          ? "Todo"
          : destination.droppableId === "inProgress"
          ? "InProgress"
          : "Done",
    } as Task;
    destTasks.splice(destination.index, 0, movedWithStatus);

    setTasks((prev) => ({
      ...prev,
      [source.droppableId]: sourceTasks,
      [destination.droppableId]: destTasks,
    }));
  };



  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {columns.map((col) => (
          <BoardColumn
            key={col.id}
            columnId={col.id}
            title={col.title}
            tasks={tasks[col.id]}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
