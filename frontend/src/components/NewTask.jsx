import { useState } from "react";

const NewTask = ({ columnId, onCreate }) => {
  const [showModal, setShowModal] = useState(false);
  const [desc, setDesc] = useState("");
  const [setor, setSetor] = useState("");
  const [prioridade, setPrioridade] = useState("low");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onCreate({
      desc: desc || "",
      setor_responsavel: setor || "",
      prioridade: prioridade || "low",
      status: columnId,
    });
    setDesc("");
    setSetor("");
    setPrioridade("low");
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="mt-4 w-full flex items-center justify-center gap-1 text-sm px-3 py-2 rounded-lg bg-[#8743fd] hover:bg-[#5b0edf] cursor-pointer"
      >
        Nova Tarefa
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-slate-800 p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4 text-white">Nova Tarefa</h2>
            <form
              onSubmit={handleSubmit}
              className="bg-slate-700/80 rounded-md p-3 border border-slate-600"
            >
              <input
                type="text"
                placeholder="Descrição da nova tarefa"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full mb-2 p-2 text-sm bg-slate-800 border border-slate-600 rounded placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Setor responsável"
                value={setor}
                onChange={(e) => setSetor(e.target.value)}
                className="w-full mb-2 p-2 text-sm bg-slate-800 border border-slate-600 rounded placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <select
                value={prioridade}
                onChange={(e) => setPrioridade(e.target.value)}
                className="w-full mb-2 p-2 text-sm bg-slate-800 border border-slate-600 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="low">Baixa</option>
                <option value="mid">Média</option>
                <option value="high">Alta</option>
              </select>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-sm px-3 py-1 rounded bg-slate-600 hover:bg-slate-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Criar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewTask;
