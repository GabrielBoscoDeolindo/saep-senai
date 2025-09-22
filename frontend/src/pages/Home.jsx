import { useState, useEffect } from "react";
import axios from "axios";
import { DndContext, closestCorners } from "@dnd-kit/core";
import Column from "../components/Column";
import NewTask from "../components/NewTask";

// --- API Config ---
const apiClient = axios.create({ baseURL: "http://127.0.0.1:8000/" });
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- API Calls ---
const getAtividades = () => apiClient.get("/atividades/");
const updateAtividade = (id, data) =>
  apiClient.patch(`/atividades/${id}/`, data);
const deleteAtividade = (id) => apiClient.delete(`/atividades/${id}/`);
const createAtividade = (data) => apiClient.post("/atividades/", data);

// --- Column Config ---
const colunas = {
  todo: { title: "A Fazer" },
  doing: { title: "Em Progresso" },
  done: { title: "Concluído" },
};

const Home = () => {
  const [tasks, setTasks] = useState({ todo: [], doing: [], done: [] });

  // --- Load tasks ---
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getAtividades();
      const organizedTasks = { todo: [], doing: [], done: [] };
      (response.data.results || response.data).forEach((task) => {
        if (organizedTasks[task.status]) organizedTasks[task.status].push(task);
      });
      setTasks(organizedTasks);
    };

    fetchTasks();
  }, []);

  // --- Handlers ---
  const handleDragEnd = async ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const sourceColumn = active.data.current.sourceColumn;
    const destColumn = over.id;
    if (sourceColumn === destColumn) return;

    const movedTask = tasks[sourceColumn].find((t) => t.id === active.id);

    setTasks((prev) => ({
      ...prev,
      [sourceColumn]: prev[sourceColumn].filter((t) => t.id !== active.id),
      [destColumn]: [...prev[destColumn], { ...movedTask, status: destColumn }],
    }));

    await updateAtividade(active.id, { status: destColumn });
  };

  const handleDeleteTask = async (task) => {
    await deleteAtividade(task.id);
    setTasks((prev) => ({
      ...prev,
      [task.status]: prev[task.status].filter((t) => t.id !== task.id),
    }));
  };

  const handleCreateTask = async (newTask) => {
    const response = await createAtividade(newTask);
    const task = response.data;

    setTasks((prev) => ({
      ...prev,
      [task.status]: [...prev[task.status], task],
    }));
  };

  const handleUpdateTask = async (id, updates) => {
    const response = await updateAtividade(id, updates);
    const updatedTask = response.data;

    setTasks((prev) => {
      const newTasks = { ...prev };
      const column = updatedTask.status;
      newTasks[column] = newTasks[column].map((t) =>
        t.id === id ? updatedTask : t
      );
      return newTasks;
    });
  };

  return (
    <main className="bg-[#0f172b] min-h-screen text-white p-6 font-sans">
      <header className="mb-8">
        <h1 className="text-[2rem] font-bold">Quadro Kanban</h1>
        <p className="pl-1">Gabriel Bosco Deolindo</p>
      </header>

      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <div className="flex justify-center gap-6">
          {Object.keys(colunas).map((columnId) => (
            <Column
              key={columnId}
              id={columnId}
              title={colunas[columnId].title}
              tasks={tasks[columnId]}
              onDelete={handleDeleteTask}
              onUpdate={handleUpdateTask}
            >
              <NewTask columnId={columnId} onCreate={handleCreateTask} />
            </Column>
          ))}
        </div>
      </DndContext>
    </main>
  );
};

export default Home;
