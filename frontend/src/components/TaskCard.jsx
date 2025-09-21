import { useDraggable } from "@dnd-kit/core";
import { Trash2 } from "lucide-react";
import PriorityBadge from "./PriorityBadge";

const TaskCard = ({ task, sourceColumn, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { sourceColumn },
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-slate-800 rounded-[0.5rem] p-4 mb-3 cursor-grab active:cursor-grabbing relative border border-slate-700 hover:border-slate-600"
    >
      <button
        onClick={() => onDelete(task)}
        className="absolute top-3 right-3  hover:text-red-500 transition-colors"
      >
        <Trash2 size={16} />
      </button>

      <p className="font-semibold  mb-2">{task.desc}</p>
      <p className="text-sm  mb-3">
        Setor: {task.setor_responsavel}
      </p>

      <PriorityBadge level={task.prioridade} />
    </div>
  );
};

export default TaskCard;
