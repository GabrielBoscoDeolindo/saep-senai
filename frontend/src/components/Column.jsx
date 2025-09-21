import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

const Column = ({ id, title, tasks, onDelete, children }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 rounded-xl w-80 min-h-[500px] flex flex-col border-2 border-[#5d6cff]`}
    >
      <h3 className="text-center text-lg font-bold mb-4">
        {title}
      </h3>

      <div className="flex-grow space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              sourceColumn={id}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p className="text-sm italic text-center pt-4">
            Nenhuma tarefa aqui.
          </p>
        )}
      </div>
      {children}
    </div>
  );
};

export default Column;
