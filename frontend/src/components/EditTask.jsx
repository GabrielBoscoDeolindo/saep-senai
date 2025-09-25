import { useState } from "react";
import { z } from "zod";

const taskSchema = z.object({
  desc: z.string().trim().min(3, { message: "A descrição deve ter no mínimo 3 caracteres." }),
  setor_responsavel: z.string().trim().min(2, { message: "O setor é obrigatório." }).regex(/^[a-zA-Z\s]+$/, { message: "O setor não deve conter números." }),
  prioridade: z.enum(['low', 'mid', 'high']),
});

const EditTask = ({ task, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    desc: task.desc,
    setor_responsavel: task.setor_responsavel,
    prioridade: task.prioridade,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = taskSchema.parse(formData);
      await onUpdate(task.id, validatedData);
      onClose();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors = {};
        err.errors.forEach((error) => {
          formattedErrors[error.path[0]] = error.message;
        });
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div
        className="bg-slate-800 p-6 rounded-lg w-96 border border-slate-700"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-task-title"
      >
        <h2 id="edit-task-title" className="text-lg font-bold mb-4 text-white">
          Editar Tarefa
        </h2>
        <form
          onSubmit={handleSubmit}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="desc" className="text-sm font-semibold text-slate-300 mb-1 block">Descrição</label>
              <input
                id="desc"
                name="desc"
                type="text"
                value={formData.desc}
                onChange={handleChange}
                className="w-full p-2 text-sm bg-slate-900 border border-slate-700 rounded placeholder-slate-400 focus:ring-2 focus:ring-[#5d6cff] focus:outline-none"
                aria-invalid={!!errors.desc}
                aria-describedby={errors.desc ? "desc-error" : undefined}
              />
              {errors.desc && <p id="desc-error" className="text-red-400 text-xs mt-1">{errors.desc}</p>}
            </div>
            <div>
              <label htmlFor="setor_responsavel" className="text-sm font-semibold text-slate-300 mb-1 block">Setor Responsável</label>
              <input
                id="setor_responsavel"
                name="setor_responsavel"
                type="text"
                value={formData.setor_responsavel}
                onChange={handleChange}
                className="w-full p-2 text-sm bg-slate-900 border border-slate-700 rounded placeholder-slate-400 focus:ring-2 focus:ring-[#5d6cff] focus:outline-none"
                aria-invalid={!!errors.setor_responsavel}
                aria-describedby={errors.setor_responsavel ? "setor-error" : undefined}
              />
              {errors.setor_responsavel && <p id="setor-error" className="text-red-400 text-xs mt-1">{errors.setor_responsavel}</p>}
            </div>
            <div>
              <label htmlFor="prioridade" className="text-sm font-semibold text-slate-300 mb-1 block">Prioridade</label>
              <select
                id="prioridade"
                name="prioridade"
                value={formData.prioridade}
                onChange={handleChange}
                className="w-full p-2 text-sm bg-slate-900 border border-slate-700 rounded focus:ring-2 focus:ring-[#5d6cff] focus:outline-none"
                aria-invalid={!!errors.prioridade}
                aria-describedby={errors.prioridade ? "prioridade-error" : undefined}
              >
                <option value="low">Baixa</option>
                <option value="mid">Média</option>
                <option value="high">Alta</option>
              </select>
              {errors.prioridade && <p id="prioridade-error" className="text-red-400 text-xs mt-1">{errors.prioridade}</p>}
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-sm px-4 py-2 rounded-md bg-slate-600 hover:bg-slate-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="text-sm px-4 py-2 rounded-md bg-[#5d6cff] text-white hover:bg-[#4b58d8]"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;