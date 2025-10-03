import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().trim().min(1, { message: "O nome de usuário é obrigatório." }),
  password: z.string().min(1, { message: "A senha é obrigatória." }),
});

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      loginSchema.parse(formData);

      const response = await axios.post("http://localhost:8000/login/", formData);

      const { access, refresh } = response.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      navigate("/home");

    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors = err.flatten().fieldErrors;
        
        const finalErrors = {};
        for (const key in formattedErrors) {
          finalErrors[key] = formattedErrors[key][0];
        }
        setErrors(finalErrors);
        
      } else {
        if (err.response && err.response.status === 401) {
            setErrors({ api: "Nome de usuário ou senha incorretos." });
        } else {
            setErrors({ api: "Ocorreu um erro de conexão. Tente novamente." });
        }
      }
    }
  };

  return (
    <main className="bg-[#0f172b] min-h-screen text-white font-sans flex items-center justify-center p-4">
      <div className="bg-slate-800 w-full max-w-md p-8 rounded-xl border-2 border-[#5d6cff]">
        <h1 className="text-3xl font-bold text-center mb-6">
          Entre na sua Conta
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="username" className="text-sm font-semibold text-slate-300 mb-1 block">Nome de usuário</label>
            <input
              id="username"
              type="text"
              name="username" 
              placeholder="Digite seu nome de usuário"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-[#0f172b] border border-slate-700 rounded-md px-4 py-2 focus-outline-none focus:ring-2 focus:ring-[#5d6cff]"
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? "username-error" : undefined}
            />
            {errors.username && <p id="username-error" className="text-red-400 text-sm mt-1">{errors.username}</p>}
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-semibold text-slate-300 mb-1 block">Senha</label>
            <input
              id="password"
              type="password"
              name="password" 
              placeholder="Digite sua senha"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#0f172b] border border-slate-700 rounded-md px-4 py-2 focus-outline-none focus:ring-2 focus:ring-[#5d6cff]"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && <p id="password-error" className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>
          
          {errors.api && <p role="alert" className="text-red-400 text-center text-sm">{errors.api}</p>}

          <button
            type="submit"
            className="w-full bg-[#5d6cff] text-white font-bold py-2 rounded-full hover:bg-[#4b58d8] mt-4"
          >
            ENTRAR
          </button>
        </form>

        <footer className="mt-6 text-center">
          <Link to="/cadastro" className="text-sm text-slate-400 hover:text-[#5d6cff] hover:underline">
            Não possui uma conta? Cadastre-se aqui!
          </Link>
        </footer>
      </div>
    </main>
  );
}

export default Login;