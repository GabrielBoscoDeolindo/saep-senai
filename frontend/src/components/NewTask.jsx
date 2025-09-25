import { useState } from "react";
import { z } from "zod";

const taskSchema = z.object({
  desc: z.string().trim().min(3, { message: "A descrição deve ter no mínimo 3 caracteres." }),
  setor_responsavel: z.string().trim().min(2, { message: "O setor é obrigatório." }).regex(/^[a-zA-Z\s]+$/, { message: "O setor não deve conter números." }),
  prioridade: z.enum(['low', 'mid', 'high']),
});

const NewTask = ({ columnId, onCreate }) => {
  const [showModal, setShowModal] = useState(false);
  
  const [formData, setFormData] = useState({
    desc: "",
    setor_responsavel: "",
    prioridade: "low",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOpenModal = () => {
    setFormData({ desc: "", setor_responsavel: "", prioridade: "low" });
    setErrors({});
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = taskSchema.parse(formData);
      await onCreate({
        ...validatedData,
        status: columnId,
      });
      setShowModal(false); 
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
    <>
      <button
        onClick={handleOpenModal}
        className="mt-4 w-full flex items-center justify-center gap-1 text-sm px-3 py-2 rounded-lg bg-[#5d6cff] hover:bg-[#4b58d8] transition-colors cursor-pointer"
      >
        Nova Tarefa
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div
            className="bg-slate-800 p-6 rounded-lg w-96 border border-slate-700"
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-task-title"
          >
            <h2 id="new-task-title" className="text-lg font-bold mb-4 text-white">
              Nova Tarefa
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="new-desc" className="text-sm font-semibold text-slate-300 mb-1 block">Descrição</label>
                  <input
                    id="new-desc"
                    name="desc"
                    type="text"
                    placeholder="Descrição da nova tarefa"
                    value={formData.desc}
                    onChange={handleChange}
                    className="w-full p-2 text-sm bg-slate-900 border border-slate-700 rounded placeholder-slate-400 focus:ring-2 focus:ring-[#5d6cff] focus:outline-none"
                    aria-invalid={!!errors.desc}
                    aria-describedby={errors.desc ? "new-desc-error" : undefined}
                  />
                  {errors.desc && <p id="new-desc-error" className="text-red-400 text-xs mt-1">{errors.desc}</p>}
                </div>
                <div>
                  <label htmlFor="new-setor" className="text-sm font-semibold text-slate-300 mb-1 block">Setor Responsável</label>
                  <input
                    id="new-setor"
                    name="setor_responsavel"
                    type="text"
                    placeholder="Setor responsável"
                    value={formData.setor_responsavel}
                    onChange={handleChange}
                    className="w-full p-2 text-sm bg-slate-900 border border-slate-700 rounded placeholder-slate-400 focus:ring-2 focus:ring-[#5d6cff] focus:outline-none"
                    aria-invalid={!!errors.setor_responsavel}
                    aria-describedby={errors.setor_responsavel ? "new-setor-error" : undefined}
                  />
                  {errors.setor_responsavel && <p id="new-setor-error" className="text-red-400 text-xs mt-1">{errors.setor_responsavel}</p>}
                </div>
                <div>
                  <label htmlFor="new-prioridade" className="text-sm font-semibold text-slate-300 mb-1 block">Prioridade</label>
                  <select
                    id="new-prioridade"
                    name="prioridade"
                    value={formData.prioridade}
                    onChange={handleChange}
                    className="w-full p-2 text-sm bg-slate-900 border border-slate-700 rounded focus:ring-2 focus:ring-[#5d6cff] focus:outline-none"
                    aria-invalid={!!errors.prioridade}
                    aria-describedby={errors.prioridade ? "new-prioridade-error" : undefined}
                  >
                    <option value="low">Baixa</option>
                    <option value="mid">Média</option>
                    <option value="high">Alta</option>
                  </select>
                  {errors.prioridade && <p id="new-prioridade-error" className="text-red-400 text-xs mt-1">{errors.prioridade}</p>}
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-sm px-4 py-2 rounded-md bg-slate-600 hover:bg-slate-500 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="text-sm px-4 py-2 rounded-md bg-[#5d6cff] text-white hover:bg-[#4b58d8] transition-colors"
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

