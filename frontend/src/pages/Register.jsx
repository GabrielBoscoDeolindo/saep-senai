import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const registerSchema = z.object({
  email: z.email({ message: "Por favor, insira um email válido." }).trim(),
  username: z.string().trim().min(1, { message: "O nome de usuário é obrigatório." }), 
  password: z.string().min(6, { message: "A senha precisa ter no mínimo 6 caracteres." }),
});

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    try {
      registerSchema.parse(formData);
      await axios.post("http://localhost:8000/register/", formData);

      setSuccessMessage("Cadastro realizado com sucesso! Redirecionando...");
      setTimeout(() => navigate("/"), 2000); 

    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors = {};
        err.errors.forEach((error) => {
          formattedErrors[error.path[0]] = error.message;
        });
        setErrors(formattedErrors);
      } else {
        const apiError = err.response?.data;
        const errorMessage = apiError ? Object.values(apiError).flat().join(' ') : "Ocorreu um erro. Tente novamente.";
        setErrors({ api: errorMessage });
      }
    }
  };

  return (
    <main className="bg-[#0f172b] min-h-screen text-white font-sans flex items-center justify-center p-4">
      <div className="bg-slate-800 w-full max-w-md p-8 rounded-xl border-2 border-[#5d6cff]">
        <h1 className="text-3xl font-bold text-center mb-6">Crie sua Conta</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-slate-300 mb-1 block">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="seu.email@exemplo.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#0f172b] border border-slate-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5d6cff]"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && <p id="email-error" className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="username" className="text-sm font-semibold text-slate-300 mb-1 block">Nome de usuário</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Escolha um nome de usuário"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-[#0f172b] border border-slate-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5d6cff]"
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? "reg-username-error" : undefined}
            />
            {errors.username && <p id="reg-username-error" className="text-red-400 text-sm mt-1">{errors.username}</p>}
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-semibold text-slate-300 mb-1 block">Senha</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Mínimo de 6 caracteres"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#0f172b] border border-slate-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5d6cff]"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "reg-password-error" : undefined}
            />
            {errors.password && <p id="reg-password-error" className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          {errors.api && <p role="alert" className="text-red-400 text-center text-sm">{errors.api}</p>}
          {successMessage && <p role="alert" className="text-green-400 text-center text-sm">{successMessage}</p>}

          <button type="submit" className="w-full bg-[#5d6cff] text-white font-bold py-2 rounded-full hover:bg-[#4b58d8] mt-4">
            CADASTRAR
          </button>
        </form>

        <footer className="mt-6 text-center">
          <Link to="/" className="text-sm text-slate-400 hover:text-[#5d6cff] hover:underline">
            Já possui uma conta? Entre aqui
          </Link>
        </footer>
      </div>
    </main>
  );
}

export default Register;

