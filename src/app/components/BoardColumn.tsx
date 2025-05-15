import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Column, Task } from "../types/shared";

type BoardColumnProps = Column & {
  onTaskClick?: (task: Task) => void;
};

const BoardColumn: React.FC<BoardColumnProps> = ({ columnId, title, tasks, onTaskClick }) => {
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
                    className="bg-white p-3 rounded shadow cursor-pointer"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => onTaskClick?.(task)}
                  >
                    <p className="text-sm font-bold">{task.id}</p>
                    <p className="text-sm"> {task.title}</p>
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
