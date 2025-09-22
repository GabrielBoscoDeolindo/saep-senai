import { useDraggable } from "@dnd-kit/core";
import { Trash2, Pencil } from "lucide-react";
import PriorityBadge from "./PriorityBadge";
import EditTask from "./EditTask";
import { useState } from "react";

const TaskCard = ({ task, sourceColumn, onDelete, onUpdate }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { sourceColumn },
  });

  const [editing, setEditing] = useState(false);

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  const formattedDate = task.data
    ? new Date(task.data).toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      })
    : "";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-slate-800 rounded-[0.5rem] p-4 mb-3 cursor-grab active:cursor-grabbing relative border border-slate-700 hover:border-slate-600"
    >
      {/* Botões de ação */}
      <div className="absolute top-3 right-3 flex gap-2">
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => setEditing(true)}
          className="hover:text-blue-500"
        >
          <Pencil size={16} />
        </button>
        <button
          onPointerDown={(e) => e.stopPropagation()} 
          onClick={() => onDelete(task)}
          className="hover:text-red-500"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Conteúdo */}
      <p className="font-semibold mb-2">{task.desc}</p>
      <p className="text-sm mb-2">Setor: {task.setor_responsavel}</p>
      <PriorityBadge level={task.prioridade} />
      {formattedDate && (
        <p className="text-xs text-slate-400 mt-2">
          Criado em: {formattedDate}
        </p>
      )}

      {/* Modal de edição */}
      {editing && (
        <EditTask
          task={task}
          onClose={() => setEditing(false)}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

export default TaskCard;
