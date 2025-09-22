import { useState } from "react";

const EditTask = ({ task, onClose, onUpdate }) => {
  const [desc, setDesc] = useState(task.desc);
  const [setor, setSetor] = useState(task.setor_responsavel);
  const [prioridade, setPrioridade] = useState(task.prioridade);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdate(task.id, {
      desc,
      setor_responsavel: setor,
      prioridade,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-slate-800 p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4 text-white">Editar Tarefa</h2>
        <form
          onSubmit={handleSubmit}
          onPointerDown={(e) => e.stopPropagation()}
          className="bg-slate-700/80 rounded-md p-3 border border-slate-600"
        >
          <input
            type="text"
            placeholder="Descrição"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full mb-2 p-2 text-sm bg-slate-800 border border-slate-600 rounded text-slate-200"
          />
          <input
            type="text"
            placeholder="Setor responsável"
            value={setor}
            onChange={(e) => setSetor(e.target.value)}
            className="w-full mb-2 p-2 text-sm bg-slate-800 border border-slate-600 rounded text-slate-200"
          />
          <select
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)}
            className="w-full mb-2 p-2 text-sm bg-slate-800 border border-slate-600 rounded text-slate-200"
          >
            <option value="low">Baixa</option>
            <option value="mid">Média</option>
            <option value="high">Alta</option>
          </select>
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-sm px-3 py-1 rounded bg-slate-600 hover:bg-slate-500 text-slate-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
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
