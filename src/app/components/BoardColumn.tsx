import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Column, Task } from "../types/shared";
import { tagColors } from "../utils/tagUtils";

type BoardColumnProps = Column & {
  onTaskClick?: (task: Task) => void;
};

const typeBorderColorMap: { [key: string]: string } = {
  Feature: "border-l-green-500",
  Bug: "border-l-red-500",
  UserStory: "border-l-yellow-500",
};

const BoardColumn: React.FC<BoardColumnProps> = ({
  columnId,
  title,
  tasks,
  onTaskClick,
}) => {
  return (
    <div className="bg-stone-100 rounded-md shadow-sm p-6">
      <h2 className="font-bold text-lg mb-4">{title}</h2>

      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2 min-h-[50px]"
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    className={`bg-white p-3 rounded shadow cursor-pointer border-l-4 ${
                      typeBorderColorMap[task.type] || "border-l-gray-300"
                    }`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => onTaskClick?.(task)}
                  >
                    <div>
                      <span className="text-sm font-bold text-indigo-700">
                        #{task.id}
                      </span>
                    </div>
                    <span className="text-sm"> {task.title}</span>
                    {task.assignee && (
                      <p className="text-xs text-gray-500">
                        Assigned to: {task.assignee.name}
                      </p>
                    )}
                    {(task.tags?.length ?? 0) > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {task.tags?.map((tag, idx) => {
                          const colorClass =
                            tagColors[tag] || tagColors.default;
                          return (
                            <span
                              key={idx}
                              className={`text-xs font-semibold px-2 py-0.5 rounded ${colorClass}`}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default BoardColumn;
